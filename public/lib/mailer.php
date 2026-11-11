<?php
/* Sends plain-text email.
   mail_mode "graph": through Microsoft 365 (Microsoft Graph sendMail, app registration with Mail.Send).
   mail_mode "file":  writes the email to ant8-private/outbox/ instead (for testing on your own PC). */
declare(strict_types=1);
require_once __DIR__ . '/bootstrap.php';

/** Returns true when the message was accepted for delivery. */
function send_mail(string $subject, string $text, string $replyTo, string $replyName): bool {
  $cfg = ant8_config();
  if ($cfg === null) return false;
  $mode = $cfg['mail_mode'] ?? 'graph';

  if ($mode === 'file') {
    $out = ant8_data_path('outbox');
    $msg = "To: {$cfg['mail_to']}\nReply-To: {$replyName} <{$replyTo}>\nSubject: {$subject}\nDate: " . date('c') . "\n\n{$text}\n";
    return file_put_contents($out . '/' . date('Ymd-His') . '-' . bin2hex(random_bytes(3)) . '.txt', $msg) !== false;
  }

  $token = graph_token($cfg);
  if ($token === null) return false;
  $payload = [
    'message' => [
      'subject' => $subject,
      'body' => ['contentType' => 'Text', 'content' => $text],
      'toRecipients' => [['emailAddress' => ['address' => $cfg['mail_to']]]],
      'replyTo' => [['emailAddress' => ['address' => $replyTo, 'name' => $replyName]]],
    ],
    'saveToSentItems' => true,
  ];
  [$status] = http_json('POST',
    'https://graph.microsoft.com/v1.0/users/' . rawurlencode($cfg['mail_sender']) . '/sendMail',
    json_encode($payload, JSON_UNESCAPED_UNICODE),
    ['Authorization: Bearer ' . $token, 'Content-Type: application/json']);
  if ($status !== 202) error_log("ANT8 mail: Graph sendMail answered HTTP $status");
  return $status === 202;
}

/** App-only access token for Microsoft Graph, cached until shortly before it expires. */
function graph_token(array $cfg): ?string {
  $cache = ant8_data_path('cache') . '/graph-token.json';
  $c = is_file($cache) ? json_decode((string)file_get_contents($cache), true) : null;
  if (is_array($c) && ($c['expires'] ?? 0) > time() + 60) return $c['token'];

  [$status, $body] = http_json('POST',
    'https://login.microsoftonline.com/' . rawurlencode($cfg['m365_tenant_id']) . '/oauth2/v2.0/token',
    http_build_query([
      'client_id' => $cfg['m365_client_id'],
      'client_secret' => $cfg['m365_client_secret'],
      'scope' => 'https://graph.microsoft.com/.default',
      'grant_type' => 'client_credentials',
    ]),
    ['Content-Type: application/x-www-form-urlencoded']);
  $j = json_decode($body, true);
  if ($status !== 200 || empty($j['access_token'])) { error_log("ANT8 mail: token request answered HTTP $status"); return null; }
  file_put_contents($cache, json_encode(['token' => $j['access_token'], 'expires' => time() + (int)($j['expires_in'] ?? 3000)]));
  @chmod($cache, 0600);
  return $j['access_token'];
}

/** @return array{0:int,1:string} [HTTP status, response body] */
function http_json(string $method, string $url, string $body, array $headers): array {
  $ch = curl_init($url);
  curl_setopt_array($ch, [
    CURLOPT_CUSTOMREQUEST => $method,
    CURLOPT_POSTFIELDS => $body,
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 15,
  ]);
  $res = curl_exec($ch);
  $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);
  return [$status, is_string($res) ? $res : ''];
}
