import { log }       from './logger.js';
import { startSSH }  from './ssh-honeypot.js';
import { startHTTP } from './http-honeypot.js';
import { startFTP }  from './ftp-honeypot.js';

console.log(`
╔══════════════════════════════════════════════╗
║          toppos-honeypot  v1.0.0             ║
║      Multi-service intrusion logger          ║
║  SSH :2222   HTTP :8080   FTP :2121          ║
╚══════════════════════════════════════════════╝
`);

log('SYS', 'localhost', 'HONEYPOT_STARTING');

startSSH();
startHTTP();
startFTP();

process.on('SIGINT',  () => { log('SYS', 'localhost', 'SHUTDOWN'); process.exit(0); });
process.on('SIGTERM', () => { log('SYS', 'localhost', 'SHUTDOWN'); process.exit(0); });
