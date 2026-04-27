import fs from 'fs';
import path from 'path';

const LOG_DIR  = path.resolve('logs');
const LOG_FILE = path.join(LOG_DIR, 'honeypot.log');

if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

const C = {
  reset:  '\x1b[0m',
  dim:    '\x1b[2m',
  red:    '\x1b[31m',
  yellow: '\x1b[33m',
  cyan:   '\x1b[36m',
  green:  '\x1b[32m',
  white:  '\x1b[37m',
};

const SERVICE_COLOUR = { SSH: C.cyan, HTTP: C.yellow, FTP: C.green, SYS: C.dim };

export function log(service, ip, event, data = {}) {
  const entry = { timestamp: new Date().toISOString(), service, ip, event, ...data };
  const colour = SERVICE_COLOUR[service] ?? C.white;
  const extras = Object.entries(data)
    .map(([k, v]) => `${C.dim}${k}${C.reset}=${C.white}${v}${C.reset}`)
    .join('  ');
  console.log(
    `${C.dim}${entry.timestamp}${C.reset}  ` +
    `${colour}[${service}]${C.reset}  ` +
    `${C.red}${String(ip).padEnd(15)}${C.reset}  ` +
    `${event.padEnd(20)}  ${extras}`
  );
  fs.appendFileSync(LOG_FILE, JSON.stringify(entry) + '\n');
}
