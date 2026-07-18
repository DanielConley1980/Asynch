/**
 * Asynch training programme — Google Apps Script backend.
 *
 * Acts as the server for the static GitHub Pages site: registration,
 * email confirmation, login, password reset, and per-user progress
 * storage, all held in a bound Google Sheet.
 *
 * ── DEPLOY ────────────────────────────────────────────────────────────
 * See backend/DEPLOY.md for full step-by-step instructions. In short:
 *   1. Create a Google Sheet in the account that should own this data.
 *   2. Extensions → Apps Script, paste this file in as Code.gs.
 *   3. Set the CONFIG values below.
 *   4. Deploy → New deployment → Web app,
 *        "Execute as: Me", "Who has access: Anyone".
 *   5. Copy the /exec web-app URL into BACKEND_URL in auth.js on the site.
 *
 * SECURITY NOTE: passwords are stored only as a salted, iterated SHA-256
 * hash — never in plain text. This hand-built auth is adequate for a small
 * staff cohort but is not a substitute for a dedicated auth provider.
 */

// ── CONFIG — set these before deploying ─────────────────────────────────
const CONFIG = {
  // Restrict who can register. '' = any email. e.g. 'yourschool.org'
  // (only addresses ending @yourschool.org may register).
  ALLOWED_DOMAIN: 'coopacademies.co.uk',

  // Data retention: accounts untouched for this many days are eligible for
  // deletion by purgeOldUsers_() (run it on a time trigger — see DEPLOY.md).
  RETENTION_DAYS: 730,

  // The public URL of the site, used to build links inside emails.
  // Must end with a trailing slash.
  SITE_URL: 'https://danielconley1980.github.io/Asynch/',

  // Friendly name shown as the sender of confirmation / reset emails.
  EMAIL_SENDER_NAME: 'The Neurosequential Approach',

  // Confirmation and password-reset links expire after this many minutes.
  TOKEN_TTL_MIN: 60,

  // A login session stays valid for this many days before re-login.
  SESSION_TTL_DAYS: 30,

  // Password hashing work factor (more = slower to brute-force).
  HASH_ITERATIONS: 12000,

  // Tab name inside the spreadsheet.
  SHEET_NAME: 'Users'
};

const HEADERS = [
  'email', 'name', 'passwordHash', 'salt', 'emailConfirmed',
  'confirmToken', 'confirmExpiry', 'resetToken', 'resetExpiry',
  'sessionToken', 'sessionExpiry', 'progress',
  'consent', 'createdAt', 'updatedAt'
];

// ── HTTP entry points ───────────────────────────────────────────────────

function doGet() {
  return HtmlService.createHtmlOutput(
    '<p style="font-family:sans-serif">The Asynch training backend is running.</p>'
  );
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
  } catch (err) {
    return jsonOut_({ ok: false, error: 'Server busy, please try again.' });
  }
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var action = String(body.action || '');
    switch (action) {
      case 'register':      return handleRegister_(body);
      case 'confirmEmail':  return handleConfirmEmail_(body);
      case 'login':         return handleLogin_(body);
      case 'requestReset':  return handleRequestReset_(body);
      case 'resetPassword': return handleResetPassword_(body);
      case 'saveProgress':  return handleSaveProgress_(body);
      case 'loadProgress':  return handleLoadProgress_(body);
      case 'logout':        return handleLogout_(body);
      default:              return jsonOut_({ ok: false, error: 'Unknown action.' });
    }
  } catch (err) {
    return jsonOut_({ ok: false, error: 'Server error: ' + err.message });
  } finally {
    lock.releaseLock();
  }
}

// ── Handlers ──────────────────────────────────────────────────────────────

function handleRegister_(b) {
  var email = normEmail_(b.email);
  var name = String(b.name || '').trim();
  var password = String(b.password || '');

  if (!isValidEmail_(email)) return jsonOut_({ ok: false, error: 'Please enter a valid email address.' });
  if (CONFIG.ALLOWED_DOMAIN && !endsWithDomain_(email, CONFIG.ALLOWED_DOMAIN))
    return jsonOut_({ ok: false, error: 'Please register with your @' + CONFIG.ALLOWED_DOMAIN + ' work email.' });
  if (!name) return jsonOut_({ ok: false, error: 'Please enter your name.' });
  if (password.length < 8) return jsonOut_({ ok: false, error: 'Password must be at least 8 characters.' });
  if (!b.consent) return jsonOut_({ ok: false, error: 'Please tick the consent box to register.' });

  var existing = findUser_(email);
  if (existing) return jsonOut_({ ok: false, error: 'An account with this email already exists. Try logging in.' });

  var salt = randHex_(16);
  var confirmToken = randHex_(24);
  var row = {};
  HEADERS.forEach(function (h) { row[h] = ''; });
  row.email = email;
  row.name = name;
  row.passwordHash = hashPassword_(password, salt);
  row.salt = salt;
  row.emailConfirmed = false;
  row.confirmToken = confirmToken;
  row.confirmExpiry = Date.now() + CONFIG.TOKEN_TTL_MIN * 60000;
  row.progress = '{}';
  row.consent = 'yes @ ' + new Date().toISOString();
  row.createdAt = new Date().toISOString();
  row.updatedAt = new Date().toISOString();
  appendUser_(row);

  sendConfirmEmail_(email, name, confirmToken);
  return jsonOut_({ ok: true, message: 'Registered. Check your email to confirm your account.' });
}

function handleConfirmEmail_(b) {
  var token = String(b.token || '');
  if (!token) return jsonOut_({ ok: false, error: 'Missing confirmation token.' });
  var u = findUserByField_('confirmToken', token);
  if (!u) return jsonOut_({ ok: false, error: 'This confirmation link is invalid or has already been used.' });
  if (Number(u.data.confirmExpiry) < Date.now())
    return jsonOut_({ ok: false, error: 'This confirmation link has expired. Please register again.' });

  u.data.emailConfirmed = true;
  u.data.confirmToken = '';
  u.data.confirmExpiry = '';
  u.data.updatedAt = new Date().toISOString();
  writeUser_(u.row, u.data);
  return jsonOut_({ ok: true, message: 'Email confirmed. You can now log in.' });
}

function handleLogin_(b) {
  var email = normEmail_(b.email);
  var password = String(b.password || '');
  var u = findUser_(email);
  if (!u || u.data.passwordHash !== hashPassword_(password, u.data.salt))
    return jsonOut_({ ok: false, error: 'Email or password is incorrect.' });
  if (String(u.data.emailConfirmed) !== 'true' && u.data.emailConfirmed !== true)
    return jsonOut_({ ok: false, error: 'Please confirm your email first — check your inbox.' });

  var session = randHex_(32);
  u.data.sessionToken = session;
  u.data.sessionExpiry = Date.now() + CONFIG.SESSION_TTL_DAYS * 86400000;
  u.data.updatedAt = new Date().toISOString();
  writeUser_(u.row, u.data);

  return jsonOut_({
    ok: true,
    email: email,
    name: u.data.name,
    sessionToken: session,
    progress: safeParse_(u.data.progress)
  });
}

function handleRequestReset_(b) {
  var email = normEmail_(b.email);
  // Always report success so the form can't be used to probe which emails exist.
  var u = findUser_(email);
  if (u) {
    var token = randHex_(24);
    u.data.resetToken = token;
    u.data.resetExpiry = Date.now() + CONFIG.TOKEN_TTL_MIN * 60000;
    u.data.updatedAt = new Date().toISOString();
    writeUser_(u.row, u.data);
    sendResetEmail_(email, u.data.name, token);
  }
  return jsonOut_({ ok: true, message: 'If that email is registered, a reset link is on its way.' });
}

function handleResetPassword_(b) {
  var token = String(b.token || '');
  var password = String(b.newPassword || '');
  if (password.length < 8) return jsonOut_({ ok: false, error: 'Password must be at least 8 characters.' });
  var u = findUserByField_('resetToken', token);
  if (!u || !token) return jsonOut_({ ok: false, error: 'This reset link is invalid or has already been used.' });
  if (Number(u.data.resetExpiry) < Date.now())
    return jsonOut_({ ok: false, error: 'This reset link has expired. Please request a new one.' });

  var salt = randHex_(16);
  u.data.salt = salt;
  u.data.passwordHash = hashPassword_(password, salt);
  u.data.resetToken = '';
  u.data.resetExpiry = '';
  u.data.sessionToken = '';   // force re-login everywhere
  u.data.sessionExpiry = '';
  u.data.emailConfirmed = true; // a successful reset also proves email ownership
  u.data.updatedAt = new Date().toISOString();
  writeUser_(u.row, u.data);
  return jsonOut_({ ok: true, message: 'Password updated. You can now log in.' });
}

function handleSaveProgress_(b) {
  var u = authed_(b);
  if (!u) return jsonOut_({ ok: false, error: 'Your session has expired. Please log in again.' });
  u.data.progress = JSON.stringify(b.progress || {});
  u.data.updatedAt = new Date().toISOString();
  writeUser_(u.row, u.data);
  return jsonOut_({ ok: true });
}

function handleLoadProgress_(b) {
  var u = authed_(b);
  if (!u) return jsonOut_({ ok: false, error: 'Your session has expired. Please log in again.' });
  return jsonOut_({ ok: true, name: u.data.name, progress: safeParse_(u.data.progress) });
}

function handleLogout_(b) {
  var u = authed_(b);
  if (u) {
    u.data.sessionToken = '';
    u.data.sessionExpiry = '';
    writeUser_(u.row, u.data);
  }
  return jsonOut_({ ok: true });
}

// ── Auth / session helper ───────────────────────────────────────────────

function authed_(b) {
  var email = normEmail_(b.email);
  var token = String(b.sessionToken || '');
  if (!email || !token) return null;
  var u = findUser_(email);
  if (!u || u.data.sessionToken !== token) return null;
  if (Number(u.data.sessionExpiry) < Date.now()) return null;
  return u;
}

// ── Sheet access ─────────────────────────────────────────────────────────

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(CONFIG.SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
  }
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
  }
  return sh;
}

function findUser_(email) {
  return findUserByField_('email', email);
}

function findUserByField_(field, value) {
  if (!value) return null;
  var sh = getSheet_();
  var col = HEADERS.indexOf(field);
  if (col < 0) return null;
  var last = sh.getLastRow();
  if (last < 2) return null;
  var values = sh.getRange(2, 1, last - 1, HEADERS.length).getValues();
  for (var i = 0; i < values.length; i++) {
    if (String(values[i][col]) === String(value)) {
      return { row: i + 2, data: rowToObj_(values[i]) };
    }
  }
  return null;
}

function rowToObj_(arr) {
  var o = {};
  HEADERS.forEach(function (h, i) { o[h] = arr[i]; });
  return o;
}

function appendUser_(obj) {
  var sh = getSheet_();
  sh.appendRow(HEADERS.map(function (h) { return obj[h]; }));
}

function writeUser_(row, obj) {
  var sh = getSheet_();
  sh.getRange(row, 1, 1, HEADERS.length).setValues([HEADERS.map(function (h) { return obj[h]; })]);
}

// ── Email ────────────────────────────────────────────────────────────────

function sendConfirmEmail_(email, name, token) {
  var link = CONFIG.SITE_URL + '?confirm=' + encodeURIComponent(token);
  MailApp.sendEmail({
    to: email,
    name: CONFIG.EMAIL_SENDER_NAME,
    subject: 'Confirm your account',
    htmlBody:
      '<p>Hi ' + escapeHtml_(name) + ',</p>' +
      '<p>Thanks for registering for the training programme. Please confirm your email by clicking the link below:</p>' +
      '<p><a href="' + link + '">Confirm my account</a></p>' +
      '<p>This link expires in ' + CONFIG.TOKEN_TTL_MIN + ' minutes. If you did not register, you can ignore this email.</p>'
  });
}

function sendResetEmail_(email, name, token) {
  var link = CONFIG.SITE_URL + '?reset=' + encodeURIComponent(token);
  MailApp.sendEmail({
    to: email,
    name: CONFIG.EMAIL_SENDER_NAME,
    subject: 'Reset your password',
    htmlBody:
      '<p>Hi ' + escapeHtml_(name) + ',</p>' +
      '<p>We received a request to reset your password. Click the link below to choose a new one:</p>' +
      '<p><a href="' + link + '">Reset my password</a></p>' +
      '<p>This link expires in ' + CONFIG.TOKEN_TTL_MIN + ' minutes. If you did not request this, you can ignore this email.</p>'
  });
}

// ── Retention ────────────────────────────────────────────────────────────
// Deletes users whose row has not been updated within RETENTION_DAYS.
// Set this to run on a monthly time-driven trigger (see DEPLOY.md), or run
// it by hand from the Apps Script editor when you want to purge old accounts.
function purgeOldUsers_() {
  var sh = getSheet_();
  var last = sh.getLastRow();
  if (last < 2) return;
  var cutoff = Date.now() - CONFIG.RETENTION_DAYS * 86400000;
  var updatedCol = HEADERS.indexOf('updatedAt');
  var values = sh.getRange(2, 1, last - 1, HEADERS.length).getValues();
  // Delete from the bottom up so row indices stay valid.
  for (var i = values.length - 1; i >= 0; i--) {
    var updated = new Date(values[i][updatedCol]).getTime();
    if (isFinite(updated) && updated < cutoff) {
      sh.deleteRow(i + 2);
    }
  }
}

// ── Utilities ────────────────────────────────────────────────────────────

function hashPassword_(password, salt) {
  var h = salt + '|' + password;
  for (var i = 0; i < CONFIG.HASH_ITERATIONS; i++) {
    h = bytesToHex_(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, h + salt));
  }
  return h;
}

function randHex_(nBytes) {
  var bytes = [];
  for (var i = 0; i < nBytes; i++) bytes.push(Math.floor(Math.random() * 256));
  // Mix in a UUID for extra entropy.
  return bytesToHex_(Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    Utilities.getUuid() + bytes.join(',') + Date.now()
  )).slice(0, nBytes * 2);
}

function bytesToHex_(bytes) {
  var s = '';
  for (var i = 0; i < bytes.length; i++) {
    var v = (bytes[i] + 256) % 256;
    s += (v < 16 ? '0' : '') + v.toString(16);
  }
  return s;
}

function normEmail_(v) { return String(v || '').trim().toLowerCase(); }

function isValidEmail_(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

function endsWithDomain_(email, domain) {
  return email.slice(-(domain.length + 1)).toLowerCase() === ('@' + domain).toLowerCase();
}

function safeParse_(s) {
  try { return JSON.parse(s || '{}'); } catch (e) { return {}; }
}

function escapeHtml_(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
