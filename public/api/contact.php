<?php
/* POST /api/contact.php — receives the contact form and the assessment report form (see initForm in src/runtime.js)
   and emails them to the ANT8 inbox. Any non-2xx answer makes the page fall back to opening a prefilled email. */
declare(strict_types=1);
require_once __DIR__ . '/../lib/mailer.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') { header('Allow: POST'); json_out(405, ['error' => 'Method not allowed']); }
$cfg = ant8_config();
if ($cfg === null) json_out(503, ['error' => 'Form delivery not configured']);

if (!rate_limit('contact', client_ip(), 5, 600)) json_out(429, ['error' => 'Too many requests']);

$raw = (string)file_get_contents('php://input', false, null, 0, 64000);
$b = json_decode($raw, true);
if (!is_array($b)) json_out(400, ['error' => 'Invalid submission']);
if (!empty($b['website'])) json_out(200, ['ok' => true]); // honeypot: pretend success, send nothing

$kind = $b['kind'] ?? '';
$name = clip($b['name'] ?? null, 120);
$email = clip($b['email'] ?? null, 160);
$subject = clip($b['subject'] ?? null, 200);
$body = clip($b['body'] ?? null, 15000, true);
if ($name === '' || !preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/', $email) || $subject === '' || $body === ''
    || !in_array($kind, ['contact', 'report'], true)) {
  json_out(400, ['error' => 'Invalid submission']);
}

$prefix = $cfg['subject_prefix'] ?? '[ant8.be]';
$text = $body . "\n\n--\nSent from the form on " . ($kind === 'report' ? 'the free assessment page' : 'the contact page')
      . ' · ' . date('Y-m-d H:i') . "\nReply to this email to answer {$name} directly.";

if (!send_mail("$prefix $subject", $text, $email, $name)) json_out(502, ['error' => 'Delivery failed']);
json_out(200, ['ok' => true]);
