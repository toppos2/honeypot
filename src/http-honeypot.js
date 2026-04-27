import express from 'express';
import { log } from './logger.js';

const PORT = process.env.HTTP_PORT ?? 8080;

const LOGIN_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Admin Login</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #1a1a2e; display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: 'Segoe UI', sans-serif; }
  .card { background: #16213e; border: 1px solid #0f3460; border-radius: 8px; padding: 40px 36px; width: 360px; box-shadow: 0 20px 60px rgba(0,0,0,.5); }
  .logo { color: #e94560; font-size: 1.4rem; font-weight: 700; margin-bottom: 6px; }
  .sub  { color: #888; font-size: .8rem; margin-bottom: 28px; }
  label { display: block; color: #aaa; font-size: .8rem; margin-bottom: 6px; }
  input { width: 100%; padding: 10px 14px; background: #0f3460; border: 1px solid #1a4a8a; border-radius: 6px; color: #eee; font-size: .95rem; margin-bottom: 18px; outline: none; }
  input:focus { border-color: #e94560; }
  button { width: 100%; padding: 11px; background: #e94560; border: none; border-radius: 6px; color: #fff; font-size: 1rem; font-weight: 600; cursor: pointer; }
  .error { color: #e94560; font-size: .82rem; margin-top: 14px; text-align: center; }
  .footer { color: #444; font-size: .72rem; text-align: center; margin-top: 20px; }
</style>
</head>
<body>
<div class="card">
  <div class="logo">⚙ ServerAdmin</div>
  <div class="sub">Management Console v3.2.1</div>
  <form method="POST" action="/login">
    <label>Username</label>
    <input type="text" name="username" placeholder="admin" autocomplete="off">
    <label>Password</label>
    <input type="password" name="password" placeholder="••••••••">
    <button type="submit">Sign in</button>
  </form>
  <div class="footer">Unauthorised access is prohibited and monitored.</div>
</div>
</body>
</html>`;

const ERROR_PAGE = LOGIN_PAGE.replace(
  '</form>',
  '</form><div class="error">⚠ Invalid credentials. Access denied.</div>'
);

export function startHTTP() {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? 'unknown';
    log('HTTP', ip, 'REQUEST', { method: req.method, path: req.path, ua: (req.headers['user-agent'] ?? '').slice(0, 80) });
    req._ip = ip;
    next();
  });

  app.get('/',          (_req, res) => res.send(LOGIN_PAGE));
  app.get('/login',     (_req, res) => res.send(LOGIN_PAGE));
  app.get('/admin',     (_req, res) => res.send(LOGIN_PAGE));
  app.get('/wp-admin',  (_req, res) => res.send(LOGIN_PAGE));
  app.get('/phpmyadmin',(_req, res) => res.send(LOGIN_PAGE));

  app.post('/login', (req, res) => {
    const { username = '', password = '' } = req.body;
    log('HTTP', req._ip, 'LOGIN_ATTEMPT', { username, password });
    setTimeout(() => res.status(401).send(ERROR_PAGE), 800);
  });

  app.all('*', (req, res) => {
    log('HTTP', req._ip, 'PROBE', { path: req.path });
    res.status(404).send('Not found');
  });

  app.listen(PORT, '0.0.0.0', () => {
    log('SYS', '0.0.0.0', 'HTTP_STARTED', { port: PORT });
  });
}
