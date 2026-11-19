# Winter Arc app

Your winter training plan as an app for your iPhone and laptop. It installs from a link, opens full screen with its own icon, and works with no internet. With Supabase set up, your progress syncs between devices.

Setup takes about 15 minutes, once.

## 1. Put it online with GitHub Pages (free)

1. Sign in at github.com and create a new repository called `winter-arc`. It can be **Public** or **Private**, but free GitHub accounts can only use Pages on public repositories. Public is fine: the code holds no personal data, and your progress lives in Supabase.
2. On the empty repository page, click **uploading an existing file**. Drag in **everything inside this folder** (index.html, sw.js, config.js, manifest.webmanifest, schema.sql, README.md and the `fonts`, `icons` and `vendor` folders). Click **Commit changes**.
3. Go to **Settings > Pages**. Under *Build and deployment*, set Source to **Deploy from a branch**, Branch to **main**, folder **/ (root)**, and click **Save**.
4. After a minute or two, the page shows your address, something like `https://YOUR-NAME.github.io/winter-arc/`.

The app works at this point, saving progress on each device separately.

## 2. Turn on sync with Supabase (free)

1. Go to supabase.com, sign up, and create a **New project**. Any name; pick the **Mumbai (ap-south-1)** region; save the database password somewhere (the app does not need it).
2. When it finishes, open **SQL Editor > New query**. Paste the whole of `schema.sql` and click **Run**. You should see "Success. No rows returned."
3. Open **Project Settings > API** (also called *Data API*). Copy the **Project URL** and the **anon public** key.
4. On GitHub, open `config.js` in your repository, click the pencil icon, paste the two values between the quotes, and **Commit changes**:

   ```js
   window.WA_CONFIG = {
     url: "https://abcdefgh.supabase.co",
     key: "eyJhbGciOi..."
   };
   ```

   Use the **anon** key only, never the `service_role` key. The anon key is meant to be public; the rules in `schema.sql` mean each account can only read and write its own row.
5. Wait a minute for GitHub Pages to update.

## 3. Install it

**iPhone:** open your address in **Safari** (it must be Safari). Tap **Share > Add to Home Screen > Add**. Open it from the new icon.

**Laptop:** open the address in **Chrome or Edge**. Click the install icon at the right end of the address bar (a monitor with an arrow), then **Install**.

## 4. Sign in on each device

Open the app, go to **Capsule**, and use **Create account** once with your email and a password. Supabase sends a confirmation email: tap the link (it opens Safari, which is fine), then come back to the app and **Sign in**. On the second device, just **Sign in**.

From then on, every tick saves on the device at once and syncs within a second when you are online. Offline ticks sync the next time you open the app with internet.

## Good to know

- **Two devices at once:** if both changed while one was offline, the app merges them, keeping ticks from both. One thing it cannot tell apart: if you untick something on one device while the other is offline, the other device's copy can bring it back. Rare, and easy to untick again.
- **Backup code** (Capsule > Backup code): copies all your progress as one block of text. Paste it into another device to restore. Useful before resetting a phone.
- **Updating the app:** when Claude changes the plan, upload the new files to the same repository. The app picks them up the next time it opens with internet, and shows them the time after that.
- **Progress from the claude.ai version** does not move over by itself. The plan starts on 25 Nov, so there should be nothing to move; if there is, ask Claude to add a backup-code button to that version.
- **iPhone storage:** iOS can clear website data for sites you have not visited in weeks, but home-screen apps are exempt. Sync keeps a copy in Supabase either way.
- **Free tier:** Supabase pauses free projects after a week with no activity. Opening the app counts as activity. If it does pause, sign in at supabase.com and click **Restore**; nothing is lost.

## What's inside

| File | What it is |
|---|---|
| `index.html` | The whole app |
| `config.js` | Your Supabase URL and anon key |
| `sw.js` | Offline cache |
| `manifest.webmanifest` | Name, icon and full-screen settings for installing |
| `schema.sql` | The one table and its access rules, for Supabase |
| `vendor/supabase-2.117.3.js` | Supabase's client library (MIT licence), kept local so the app works offline |
| `fonts/` | Dela Gothic One, M PLUS 1p, Chakra Petch (SIL Open Font Licence), cut down to the characters the app uses |
| `icons/` | App icons |
