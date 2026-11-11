<?php
/* ANT8 private settings — TEMPLATE.
   On GoDaddy: create the folder "ant8-private" NEXT TO public_html (not inside it),
   copy this file and the .htaccess into it, and fill in the real values.
   On your own PC (for testing): the folder C:\Code\ant8\ant8-private\ is used; Git ignores it.
   Never put the real file in Git: it contains a password-like secret. */
return [
  // "graph" = really send through Microsoft 365.  "file" = test mode: emails are saved in ant8-private/outbox/.
  'mail_mode' => 'graph',

  // Who receives the form emails, and from which Microsoft 365 mailbox they are sent.
  'mail_to'     => 'info@ant8.eu',
  'mail_sender' => 'website@ant8.eu',
  'subject_prefix' => '[ant8.be]',

  // Microsoft 365 app registration "ANT8 website" (Entra admin centre → App registrations).
  'm365_tenant_id'     => 'PASTE-DIRECTORY-TENANT-ID',
  'm365_client_id'     => 'PASTE-APPLICATION-CLIENT-ID',
  'm365_client_secret' => 'PASTE-CLIENT-SECRET-VALUE',
];
