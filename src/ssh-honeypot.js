import pkg from 'ssh2';
const { Server } = pkg;
import fs from 'fs';
import { log } from './logger.js';

const PORT    = process.env.SSH_PORT ?? 2222;
const KEY_PATH = 'logs/.ssh_host_key';

export function startSSH() {
  if (!fs.existsSync(KEY_PATH)) {
    console.error('[SSH] Host key not found. Run: ssh-keygen -t rsa -b 2048 -f logs/.ssh_host_key -N ""');
    return;
  }

  const hostKey = fs.readFileSync(KEY_PATH);

  const server = new Server({ hostKeys: [hostKey] }, (client) => {
    const ip = client._sock?.remoteAddress ?? 'unknown';
    log('SSH', ip, 'CONNECTION');

    client.on('authentication', (ctx) => {
      log('SSH', ip, 'AUTH_ATTEMPT', {
        method:   ctx.method,
        username: ctx.username,
        password: ctx.method === 'password' ? ctx.password : undefined,
      });
      ctx.reject(['password']);
    });

    client.on('error', () => {});
    client.on('end', () => log('SSH', ip, 'DISCONNECTED'));
  });

  server.listen(PORT, '0.0.0.0', () => {
    log('SYS', '0.0.0.0', 'SSH_STARTED', { port: PORT });
  });

  server.on('error', (err) => console.error(`[SSH] ${err.message}`));
}
