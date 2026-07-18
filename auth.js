/**
 * Asynch — client-side authentication + progress sync.
 *
 * Talks to the Google Apps Script backend (see backend/Code.gs). Presents a
 * login / register / reset overlay and, once signed in, hydrates the app's
 * progress from the account and pushes changes back up.
 *
 * ── TO ENABLE ─────────────────────────────────────────────────────────────
 * Paste your deployed web-app /exec URL into BACKEND_URL below. While it is
 * empty, the site behaves exactly as before (local-only, no login).
 */
(function () {
  'use strict';

  // ▼▼▼ DEPLOYED APPS SCRIPT WEB-APP URL ▼▼▼
  var BACKEND_URL = 'https://script.google.com/macros/s/AKfycbwv2XEg43Hhq7PXPR3EvYwy80kw03yshWgAKaRYuFFt9lUdtOw74XOKYYPiWwHpw63h/exec';
  // ▲▲▲ e.g. 'https://script.google.com/macros/s/AKfy.../exec' ▲▲▲

  if (!BACKEND_URL) return; // dormant until configured — site works as-is.

  var SESSION_KEY = 'asynch-auth';

  // ── API client ──────────────────────────────────────────────────────────
  // Uses a text/plain body so the browser treats it as a "simple" request and
  // skips the CORS preflight the Apps Script endpoint can't answer.
  function api(action, payload) {
    return fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(Object.assign({ action: action }, payload || {}))
    }).then(function (r) { return r.json(); });
  }

  // ── Session storage ─────────────────────────────────────────────────────
  function getSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; }
    catch (e) { return null; }
  }
  function setSession(s) { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); }
  function clearSession() { localStorage.removeItem(SESSION_KEY); }

  // ── Overlay UI ──────────────────────────────────────────────────────────
  var overlay, msgEl, currentTab = 'login';

  function styleTag() {
    var css = '' +
      '#auth-overlay{position:fixed;inset:0;z-index:9999;background:#08111f;' +
      'display:flex;align-items:center;justify-content:center;padding:20px;' +
      'font-family:Manrope,system-ui,sans-serif;overflow:auto;}' +
      '#auth-card{width:100%;max-width:420px;background:#0f2238;border:1px solid rgba(128,162,204,.22);' +
      'border-radius:16px;padding:28px 26px;box-shadow:0 20px 60px rgba(0,0,0,.45);}' +
      '#auth-card h2{color:#eaf1fb;font-size:21px;margin:0 0 4px;font-weight:800;}' +
      '#auth-sub{color:#8fa6c4;font-size:13.5px;margin:0 0 18px;line-height:1.5;}' +
      '.auth-tabs{display:flex;gap:6px;margin-bottom:18px;}' +
      '.auth-tab{flex:1;padding:9px;border-radius:9px;border:0;cursor:pointer;font-size:13.5px;font-weight:700;' +
      'background:rgba(128,162,204,.10);color:#8fa6c4;font-family:inherit;}' +
      '.auth-tab.on{background:#2E7D32;color:#fff;}' +
      '.auth-field{margin-bottom:12px;}' +
      '.auth-field label{display:block;color:#b8c8de;font-size:12.5px;margin-bottom:5px;}' +
      '.auth-field input{width:100%;box-sizing:border-box;padding:11px 12px;border-radius:9px;' +
      'border:1px solid rgba(128,162,204,.3);background:#0b1a2c;color:#eaf1fb;font-size:14px;font-family:inherit;}' +
      '.auth-consent{display:flex;gap:9px;align-items:flex-start;margin:4px 0 14px;color:#8fa6c4;font-size:12px;line-height:1.5;}' +
      '.auth-consent input{margin-top:2px;flex:0 0 auto;}' +
      '.auth-btn{width:100%;padding:12px;border:0;border-radius:10px;background:#2E7D32;color:#fff;' +
      'font-size:14.5px;font-weight:800;cursor:pointer;font-family:inherit;}' +
      '.auth-btn:disabled{opacity:.6;cursor:default;}' +
      '.auth-alt{margin-top:14px;text-align:center;}' +
      '.auth-link{background:0;border:0;color:#7fb2ff;cursor:pointer;font-size:12.5px;font-family:inherit;text-decoration:underline;}' +
      '#auth-msg{margin-top:14px;font-size:13px;line-height:1.5;border-radius:9px;padding:0;}' +
      '#auth-msg.show{padding:10px 12px;}' +
      '#auth-msg.err{background:rgba(244,67,54,.14);color:#ff9c93;}' +
      '#auth-msg.ok{background:rgba(76,175,80,.16);color:#a5e0a8;}';
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
  }

  function show(msg, kind) {
    msgEl.textContent = msg || '';
    msgEl.className = msg ? ('show ' + (kind || 'err')) : '';
  }

  function field(id, label, type) {
    return '<div class="auth-field"><label for="' + id + '">' + label + '</label>' +
      '<input id="' + id + '" type="' + type + '" autocomplete="' +
      (type === 'password' ? 'current-password' : 'email') + '"></div>';
  }

  function render(tab) {
    currentTab = tab;
    var body = '';
    if (tab === 'login') {
      body =
        '<h2>Welcome back</h2>' +
        '<p id="auth-sub">Log in to continue where you left off.</p>' +
        field('a-email', 'Work email', 'email') +
        field('a-pass', 'Password', 'password') +
        '<button class="auth-btn" id="a-go">Log in</button>' +
        '<div class="auth-alt"><button class="auth-link" data-go="forgot">Forgot password?</button></div>';
    } else if (tab === 'register') {
      body =
        '<h2>Create your account</h2>' +
        '<p id="auth-sub">Register with your Co-op Academies work email. We\'ll send a link to confirm it.</p>' +
        field('a-name', 'Your name', 'text') +
        field('a-email', 'Work email', 'email') +
        field('a-pass', 'Password (8+ characters)', 'password') +
        '<label class="auth-consent"><input type="checkbox" id="a-consent">' +
        '<span>I agree to my name, email and course progress being stored to run this training, ' +
        'kept for up to 2 years, in line with the staff privacy notice.</span></label>' +
        '<button class="auth-btn" id="a-go">Create account</button>';
    } else if (tab === 'forgot') {
      body =
        '<h2>Reset your password</h2>' +
        '<p id="auth-sub">Enter your work email and we\'ll send you a reset link.</p>' +
        field('a-email', 'Work email', 'email') +
        '<button class="auth-btn" id="a-go">Send reset link</button>' +
        '<div class="auth-alt"><button class="auth-link" data-go="login">Back to login</button></div>';
    } else if (tab === 'reset') {
      body =
        '<h2>Choose a new password</h2>' +
        '<p id="auth-sub">Enter a new password for your account.</p>' +
        field('a-pass', 'New password (8+ characters)', 'password') +
        '<button class="auth-btn" id="a-go">Update password</button>';
    }

    var tabs = (tab === 'reset') ? '' :
      '<div class="auth-tabs">' +
      '<button class="auth-tab ' + (tab === 'login' ? 'on' : '') + '" data-go="login">Log in</button>' +
      '<button class="auth-tab ' + (tab === 'register' ? 'on' : '') + '" data-go="register">Register</button>' +
      '</div>';

    document.getElementById('auth-card').innerHTML = tabs + body + '<div id="auth-msg"></div>';
    msgEl = document.getElementById('auth-msg');
    wire();
  }

  function wire() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-go]'), function (b) {
      b.onclick = function () { render(b.getAttribute('data-go')); };
    });
    var go = document.getElementById('a-go');
    if (go) go.onclick = submit;
    // Enter key submits.
    Array.prototype.forEach.call(document.querySelectorAll('#auth-card input'), function (inp) {
      inp.onkeydown = function (e) { if (e.key === 'Enter') submit(); };
    });
  }

  function val(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }

  function submit() {
    var go = document.getElementById('a-go');
    var busy = function (on) { if (go) { go.disabled = on; go.textContent = on ? 'Please wait…' : go.textContent; } };

    if (currentTab === 'login') {
      var email = val('a-email'), pass = document.getElementById('a-pass').value;
      if (!email || !pass) return show('Enter your email and password.');
      busy(true);
      api('login', { email: email, password: pass }).then(function (r) {
        if (!r.ok) { busy(false); render('login'); return show(r.error); }
        onSignedIn({ email: r.email, name: r.name, sessionToken: r.sessionToken }, r.progress);
      }).catch(netErr(busy));
    } else if (currentTab === 'register') {
      var payload = {
        name: val('a-name'), email: val('a-email'),
        password: document.getElementById('a-pass').value,
        consent: document.getElementById('a-consent').checked
      };
      if (!payload.consent) return show('Please tick the consent box to register.');
      busy(true);
      api('register', payload).then(function (r) {
        busy(false); render('login');
        show(r.ok ? r.message : r.error, r.ok ? 'ok' : 'err');
      }).catch(netErr(busy));
    } else if (currentTab === 'forgot') {
      var em = val('a-email');
      if (!em) return show('Enter your email.');
      busy(true);
      api('requestReset', { email: em }).then(function (r) {
        busy(false); render('login');
        show(r.message || 'If that email is registered, a reset link is on its way.', 'ok');
      }).catch(netErr(busy));
    } else if (currentTab === 'reset') {
      var np = document.getElementById('a-pass').value;
      if (np.length < 8) return show('Password must be at least 8 characters.');
      busy(true);
      api('resetPassword', { token: window.__asynchResetToken, newPassword: np }).then(function (r) {
        busy(false);
        if (r.ok) { stripParam('reset'); render('login'); show(r.message, 'ok'); }
        else show(r.error);
      }).catch(netErr(busy));
    }
  }

  function netErr(busy) {
    return function () { busy(false); show('Could not reach the server. Check your connection and try again.'); };
  }

  function openOverlay(tab) {
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'auth-overlay';
      overlay.innerHTML = '<div id="auth-card"></div>';
      document.body.appendChild(overlay);
    }
    overlay.style.display = 'flex';
    render(tab || 'login');
  }
  function closeOverlay() { if (overlay) overlay.style.display = 'none'; }

  // ── Signed-in flow ────────────────────────────────────────────────────────
  function onSignedIn(session, progress) {
    setSession(session);
    closeOverlay();
    // Merge any local-only (pre-login) progress on first sign-in.
    var local = readLocalAnon();
    var merged = mergeProgress(progress || {}, local);
    if (window.__asynchSetUser) window.__asynchSetUser(session.email, session.name);
    if (window.__asynchHydrate) window.__asynchHydrate(merged);
    if (Object.keys(local).length && JSON.stringify(merged) !== JSON.stringify(progress || {})) {
      pushProgress(merged); // save the merged result back up
    }
    installAccountBar(session);
  }

  function readLocalAnon() {
    try { return JSON.parse(localStorage.getItem('ib-training-v1')) || {}; }
    catch (e) { return {}; }
  }

  // Union of two progress maps, preferring "completed" and more attempts.
  function mergeProgress(a, b) {
    var out = {}, k;
    for (k in a) out[k] = a[k];
    for (k in b) {
      if (!out[k]) { out[k] = b[k]; continue; }
      out[k] = {
        completed: !!(out[k].completed || b[k].completed),
        attempts: (out[k].attempts || []).length >= (b[k].attempts || []).length ? out[k].attempts : b[k].attempts,
        reflectionAnswer: out[k].reflectionAnswer || b[k].reflectionAnswer || ''
      };
    }
    return out;
  }

  // ── Progress push (debounced), wired into the app's Store.save() ──────────
  var pushTimer = null, pendingProgress = null;
  function pushProgress(data) {
    var s = getSession();
    if (!s) return;
    api('saveProgress', { email: s.email, sessionToken: s.sessionToken, progress: data })
      .then(function (r) {
        if (r && r.ok === false && /expired/i.test(r.error || '')) handleExpired();
      })
      .catch(function () { /* keep local copy; retry on next change */ });
  }
  window.__asynchProgressChanged = function (data) {
    pendingProgress = data;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(function () { pushProgress(pendingProgress); }, 900);
  };

  function handleExpired() {
    clearSession();
    if (window.__asynchClearUser) window.__asynchClearUser();
    openOverlay('login');
    show('Your session expired — please log in again.', 'err');
  }

  // ── Account bar (name + log out) ─────────────────────────────────────────
  function installAccountBar(session) {
    var bar = document.getElementById('asynch-account');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'asynch-account';
      bar.style.cssText = 'position:fixed;top:10px;right:12px;z-index:900;display:flex;gap:10px;' +
        'align-items:center;background:rgba(15,34,56,.92);border:1px solid rgba(128,162,204,.25);' +
        'border-radius:999px;padding:5px 6px 5px 14px;font-family:Manrope,sans-serif;font-size:12.5px;color:#cfe0f5;';
      document.body.appendChild(bar);
    }
    bar.innerHTML = '<span>' + escapeHtml(session.name || session.email) + '</span>' +
      '<button id="asynch-logout" style="border:0;border-radius:999px;padding:6px 12px;cursor:pointer;' +
      'background:rgba(128,162,204,.16);color:#eaf1fb;font-weight:700;font-family:inherit;font-size:12px;">Log out</button>';
    document.getElementById('asynch-logout').onclick = function () {
      var s = getSession();
      if (s) api('logout', { email: s.email, sessionToken: s.sessionToken });
      clearSession();
      bar.remove();
      if (window.__asynchClearUser) window.__asynchClearUser();
      openOverlay('login');
    };
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // ── URL param helpers (confirm / reset links land back on the site) ───────
  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }
  function stripParam(name) {
    var u = new URL(window.location.href);
    u.searchParams.delete(name);
    window.history.replaceState({}, '', u.toString());
  }

  // ── Boot ──────────────────────────────────────────────────────────────────
  function boot() {
    // Replace the demo-only sign-in overlay with the real auth flow.
    var demo = document.getElementById('login-overlay');
    if (demo) demo.remove();

    styleTag();

    var confirmToken = getParam('confirm');
    var resetToken = getParam('reset');

    if (resetToken) {
      window.__asynchResetToken = resetToken;
      openOverlay('reset');
      return;
    }

    if (confirmToken) {
      openOverlay('login');
      show('Confirming your email…', 'ok');
      api('confirmEmail', { token: confirmToken }).then(function (r) {
        stripParam('confirm');
        show(r.ok ? r.message : r.error, r.ok ? 'ok' : 'err');
      }).catch(function () { show('Could not confirm right now — please try the link again shortly.'); });
      return;
    }

    var s = getSession();
    if (!s) { openOverlay('login'); return; }

    // Resume: verify the session by loading progress from the account.
    api('loadProgress', { email: s.email, sessionToken: s.sessionToken }).then(function (r) {
      if (!r.ok) { clearSession(); openOverlay('login'); if (r.error) show(r.error); return; }
      if (window.__asynchSetUser) window.__asynchSetUser(s.email, r.name || s.name);
      if (window.__asynchHydrate) window.__asynchHydrate(r.progress || {});
      installAccountBar(s);
    }).catch(function () {
      // Offline: let them in with the local cache rather than locking them out.
      if (window.__asynchSetUser) window.__asynchSetUser(s.email, s.name);
      installAccountBar(s);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
