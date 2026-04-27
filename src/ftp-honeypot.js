import net from 'net';
import { log } from './logger.js';

const PORT = process.env.FTP_PORT ?? 2121;

export function startFTP() {
  const server = net.createServer((socket) => {
    const ip = socket.remoteAddress ?? 'unknown';
    log('FTP', ip, 'CONNECTION');

    let username = '';
    const send = (msg) => socket.write(msg + '\r\n');

    send('220 FTP server ready (vsftpd 3.0.5)');

    socket.on('data', (buf) => {
      const line = buf.toString().trim();
      const [cmd, ...args] = line.split(' ');
      const arg = args.join(' ');

      switch (cmd.toUpperCase()) {
        case 'USER':
          username = arg;
          log('FTP', ip, 'USER', { username });
          send('331 Please specify the password.');
          break;
        case 'PASS':
          log('FTP', ip, 'LOGIN_ATTEMPT', { username, password: arg });
          send('530 Login incorrect.');
          break;
        case 'QUIT':
          send('221 Goodbye.');
          socket.end();
          break;
        default:
          log('FTP', ip, 'COMMAND', { cmd: cmd.toUpperCase(), arg });
          send('530 Please login with USER and PASS.');
      }
    });

    socket.on('error', () => {});
    socket.on('close', () => log('FTP', ip, 'DISCONNECTED'));
    socket.setTimeout(30_000, () => socket.destroy());
  });

  server.listen(PORT, '0.0.0.0', () => {
    log('SYS', '0.0.0.0', 'FTP_STARTED', { port: PORT });
  });

  server.on('error', (err) => console.error(`[FTP] ${err.message}`));
}
