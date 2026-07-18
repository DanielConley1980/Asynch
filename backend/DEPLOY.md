# Registration, login & progress — deployment guide

The site is static (GitHub Pages), so accounts, emails and progress are handled
by a small **Google Apps Script** backend that stores everything in a Google
Sheet you own. Until you paste the deployed URL into `auth.js`, the site keeps
working exactly as before (local-only, no login) — so it's safe to have this
merged before you finish setup.

## Locked-in configuration
- **Owner account:** your Google account (demo).
- **Allowed domain:** only `@coopacademies.co.uk` addresses may register.
- **Retention:** accounts untouched for **2 years** can be purged (see step 6).
- **Consent:** a required tick-box appears on the registration form.

---

## 1. Create the Sheet
1. Go to <https://sheets.google.com> and create a blank spreadsheet.
2. Name it something like **Asynch Training – Accounts**.
   (You don't need to add any tabs or headers — the script creates a `Users`
   tab with the right columns on first use.)

## 2. Add the script
1. In the Sheet: **Extensions → Apps Script**.
2. Delete anything in the editor, then paste the entire contents of
   [`backend/Code.gs`](./Code.gs).
3. The config at the top is already set for Co-op Academies. Only change
   `SITE_URL` if the site ever moves from
   `https://danielconley1980.github.io/Asynch/` (keep the trailing slash).
4. Save (💾).

## 3. Deploy as a web app
1. **Deploy → New deployment**.
2. Gear icon → **Web app**.
3. Set **Execute as: Me** and **Who has access: Anyone**.
   (“Anyone” means the site can reach it; it does **not** make your Sheet
   public — only the script can read it, and only via the actions it defines.)
4. **Deploy**, then **Authorize access** and accept the permission prompts
   (needed so the script can use your Sheet and send email as you).
5. Copy the **Web app URL** — it ends in `/exec`.

## 4. Point the site at it
1. Open [`auth.js`](../auth.js) at the top.
2. Paste your `/exec` URL into `BACKEND_URL`:
   ```js
   var BACKEND_URL = 'https://script.google.com/macros/s/AKfy.../exec';
   ```
3. Commit and push. Login is now live.

## 5. Test the flow
1. Open the site — you should see the login/register card.
2. Register with a real `@coopacademies.co.uk` address.
3. You'll get a **confirmation email** (from your Google account). Click the
   link — it returns to the site and confirms.
4. Log in. Complete a quiz, then log in from another browser/device to confirm
   the progress follows the account.
5. Try **Forgot password** to check the reset email + reset form.

> **Re-deploying after edits:** when you change `Code.gs`, do
> **Deploy → Manage deployments → Edit → Version: New version → Deploy**.
> The `/exec` URL stays the same.

## 6. Retention (2-year purge)
`Code.gs` includes `purgeOldUsers_()`, which deletes accounts not updated for
`RETENTION_DAYS` (730). To run it automatically:
1. In the Apps Script editor, open **Triggers** (clock icon, left).
2. **Add Trigger** → choose `purgeOldUsers_`, event source **Time-driven**,
   **Month timer**.
You can also run it by hand from the editor at any time. To delete a specific
person on request (right to erasure), just delete their row in the Sheet.

---

## Notes & limits
- **Passwords** are stored only as a salted, iterated SHA-256 hash — never in
  plain text. Nobody (including you) can read a user's password; reset is the
  only recovery path.
- **Emails** are sent from the owning Google account. A consumer Gmail account
  can send roughly 100 emails/day; a Workspace account far more. Fine for a
  small cohort.
- This hand-built auth suits a small staff group. If it ever needs to scale or
  carry heavier security expectations, moving to a dedicated auth provider
  (e.g. Google Sign-In or Supabase) would be the next step.
- **What's stored per user:** email, name, salted password hash, email-confirmed
  flag, temporary confirm/reset tokens, a login-session token, course progress
  (completed sessions, quiz attempts/scores), a consent timestamp, and
  created/updated dates.
