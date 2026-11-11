<?php
/* Shared helpers for the ANT8 PHP endpoints (contact form, later the CMS).
   Secrets and data live OUTSIDE the website folder, in "ant8-private/" next to public_html.
   See ant8-private.example/ in the repository for the template. */
declare(strict_types=1);
date_default_timezone_set('Europe/Brussels');

function ant8_private_dir(): ?string {
  // Look in the folders above the website: the site can live in public_html/ (main domain)
  // or in public_html/<domain>/ (addon domain, e.g. public_html/ant8.be). The private folder
  // belongs in the home folder, next to public_html.
  $candidates = [getenv('ANT8_PRIVATE') ?: ''];
  for ($up = 2; $up <= 4; $up++) $candidates[] = dirname(__DIR__, $up) . '/ant8-private';
  foreach ($candidates as $dir) {
    if ($dir === '' || !is_file($dir . '/config.php')) continue;
    // Safety: never use a private folder that sits inside the public web folder.
    if (preg_match('#[/\\\\]public_html([/\\\\]|$)#', $dir)) continue;
    return rtrim($dir, '/\\');
  }
  return null;
}

/** Returns the private config array, or null when the site is not configured yet. */
function ant8_config(): ?array {
  static $cfg = false;
  if ($cfg !== false) return $cfg;
  $dir = ant8_private_dir();
  if ($dir === null) return $cfg = null;
  $c = require $dir . '/config.php';
  if (!is_array($c)) return $cfg = null;
  $c['private_dir'] = $dir;
  return $cfg = $c;
}

/** A writable folder inside ant8-private (created on first use). */
function ant8_data_path(string $sub): string {
  $cfg = ant8_config();
  $p = $cfg['private_dir'] . '/' . $sub;
  if (!is_dir($p)) mkdir($p, 0750, true);
  return $p;
}

function json_out(int $status, array $data): void {
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  header('Cache-Control: no-store');
  echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

function client_ip(): string {
  return (string)($_SERVER['REMOTE_ADDR'] ?? 'unknown');
}

/** File-based limiter: max $max hits per $seconds per key. Returns false when the limit is reached. */
function rate_limit(string $bucket, string $key, int $max, int $seconds): bool {
  $dir = ant8_data_path('ratelimit');
  $file = $dir . '/' . $bucket . '-' . hash('sha256', $key) . '.json';
  $now = time();
  $fh = fopen($file, 'c+');
  if (!$fh) return true; // never block real visitors because of a disk problem
  flock($fh, LOCK_EX);
  $hits = json_decode((string)stream_get_contents($fh), true) ?: [];
  $hits = array_values(array_filter($hits, fn($t) => is_int($t) && $now - $t < $seconds));
  $allowed = count($hits) < $max;
  if ($allowed) $hits[] = $now;
  ftruncate($fh, 0); rewind($fh); fwrite($fh, json_encode($hits));
  flock($fh, LOCK_UN); fclose($fh);
  return $allowed;
}

/** Trim, remove control characters (except new lines in multi-line text) and cut to length. */
function clip($v, int $max, bool $multiline = false): string {
  if (!is_string($v)) return '';
  $v = str_replace("\r\n", "\n", $v);
  $v = preg_replace($multiline ? '/[\x00-\x09\x0B-\x1F\x7F]/u' : '/[\x00-\x1F\x7F]/u', '', $v) ?? '';
  return mb_substr(trim($v), 0, $max);
}
