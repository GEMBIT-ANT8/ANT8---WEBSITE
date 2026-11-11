# Microsoft 365 setup for the website forms

**Goal:** let the website send the contact and assessment emails *from* `website@ant8.eu` *to* `info@ant8.eu`, without any password stored on the website.

**How it works:** you give the website its own Microsoft identity (an "app registration"). Then you tell Exchange that this identity may send mail **only** as `website@ant8.eu`, and nothing else: it can't read mail, and it can't send as anyone else.

You need: Microsoft 365 admin rights. It takes about 15 minutes.

---

## Step 1 — Create the sending mailbox (shared mailbox, free)

1. Go to **admin.microsoft.com** → **Teams & groups** → **Shared mailboxes** → **+ Add a shared mailbox**.
2. Name: `ANT8 website`, email: `website@ant8.eu`. Save.
3. (Optional) Add yourself as a member, so you can see the "Sent items" of everything the website sends.

## Step 2 — Register the website as an app

1. Go to **entra.microsoft.com** → **Applications** → **App registrations** → **+ New registration**.
2. Name: `ANT8 website`. Supported account types: **Accounts in this organizational directory only**. Leave "Redirect URI" empty. Click **Register**.
3. On the overview page, copy these two values somewhere safe:
   - **Application (client) ID** → goes into `m365_client_id`
   - **Directory (tenant) ID** → goes into `m365_tenant_id`
4. Left menu → **Certificates & secrets** → **+ New client secret**. Description `website`, expiry **24 months** → **Add**.
   Copy the **Value** right away (it's shown only once) → goes into `m365_client_secret`.
   ⚠️ Put a reminder in your calendar 23 months from now to create a new secret.

**Do NOT add "Mail.Send" under API permissions.** That would let the app send as *every* mailbox in the company. Step 3 gives it permission for one mailbox only.

## Step 3 — Allow the app to send only as website@ant8.eu

1. In **entra.microsoft.com** → **Applications** → **Enterprise applications** → open **ANT8 website** → copy its **Object ID**. (This is a different number from the one in step 2.)
2. Open **Windows PowerShell** and run these lines one by one. Replace the `<...>` parts. The first line is needed only once per PC.

```powershell
Install-Module ExchangeOnlineManagement -Scope CurrentUser
Connect-ExchangeOnline
New-ServicePrincipal -AppId <Application-client-ID> -ObjectId <Enterprise-app-Object-ID> -DisplayName "ANT8 website"
New-ManagementScope -Name "ANT8 website mailbox" -RecipientRestrictionFilter "PrimarySmtpAddress -eq 'website@ant8.eu'"
New-ManagementRoleAssignment -App <Application-client-ID> -Role "Application Mail.Send" -CustomResourceScope "ANT8 website mailbox"
```

3. Check it (should say `InScope: True` for Application Mail.Send):

```powershell
Test-ServicePrincipalAuthorization -Identity <Application-client-ID> -Resource website@ant8.eu
```

Changes can take up to an hour to become active.

## Step 4 — Put the values on the server

1. GoDaddy → cPanel → **File Manager**. Go to your **home folder** (the folder that *contains* `public_html`).
2. Create a folder **`ant8-private`** there. It must be next to `public_html`, **not inside it**.
3. Upload `config.php` and `.htaccess` from `ant8-private.example/` in the repository into it.
4. Edit `config.php` in File Manager and fill in the three IDs/secret from step 2. Keep `'mail_mode' => 'graph'`.

## Step 5 — Test

Send a message via the contact page. It should arrive at `info@ant8.eu` within a minute, with **Reply** going to the visitor's address.

If it doesn't arrive, the website shows the "email app" fallback. Check cPanel → **Errors** / `error_log` for a line starting with `ANT8 mail:`:
- `token request answered HTTP 400/401` → tenant ID, client ID or secret is wrong (or the secret expired).
- `Graph sendMail answered HTTP 403` → step 3 isn't active yet (wait an hour) or the mailbox address doesn't match.
