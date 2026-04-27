# 🍯 toppos-honeypot

A lightweight **multi-service honeypot** written in Node.js.
Simulates SSH, HTTP and FTP services to capture and log intrusion attempts in real time.

Built by [Leander Tops](https://github.com/toppos2) — Bachelor E-ICT (Cyber & Cloud Security) @ Thomas More.

---

## Features

| Service | Default port | What it captures |
|---------|-------------|-----------------|
| **SSH** | 2222 | IP, username, password, auth method |
| **HTTP** | 8080 | IP, user-agent, login attempts, path probes |
| **FTP** | 2121 | IP, username, password, raw commands |

- Logs to **console** (colour-coded) and **logs/honeypot.log** (JSON Lines)
- Configurable ports via .env
- No database needed

---

## Getting started

    git clone https://github.com/toppos2/honeypot.git
    cd honeypot
    npm install
    ssh-keygen -t rsa -b 2048 -f logs/.ssh_host_key -N ""
    cp .env.example .env
    npm start

---

## Project structure

    honeypot/
    src/
      index.js          - Entry point
      logger.js         - Console + file logger
      ssh-honeypot.js   - Fake SSH server
      http-honeypot.js  - Fake admin panel
      ftp-honeypot.js   - Fake FTP server
    .env.example
    .gitignore
    package.json

---

## Legal disclaimer

For educational purposes and authorised testing only.
Only deploy on infrastructure you own or have permission to monitor.

---

## Author

Leander Tops
https://github.com/toppos2
https://www.linkedin.com/in/leander-tops/
