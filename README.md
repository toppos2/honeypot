<div align="center">

# 🍯 toppos-honeypot

**A multi-service honeypot that logs SSH, HTTP and FTP intrusion attempts in real time.**

[![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![SSH2](https://img.shields.io/badge/ssh2-1.15-4A90D9?style=for-the-badge&logo=openssh&logoColor=white)](https://github.com/mscdex/ssh2)
[![License](https://img.shields.io/badge/License-MIT-00e5b0?style=for-the-badge)](LICENSE)
[![Made by](https://img.shields.io/badge/Made%20by-Leander%20Tops-e94560?style=for-the-badge)](https://github.com/toppos2)

</div>

---

## 🏗️ Architecture

\`\`\`
   SSH :2222  ──────┐
                    ▼
  HTTP :8080  ──► [ ssh-honeypot.js  ]
                [ http-honeypot.js ]  ──► [ logger.js ] ──► console
   FTP :2121  ──► [ ftp-honeypot.js  ]                  └──► logs/honeypot.log
\`\`\`

---

## 📸 Live output

\`\`\`
╔══════════════════════════════════════════════╗
║          toppos-honeypot  v1.0.0             ║
║      Multi-service intrusion logger          ║
║  SSH :2222   HTTP :8080   FTP :2121          ║
╚══════════════════════════════════════════════╝

2026-04-27T21:01:33Z  [SYS]   0.0.0.0       SSH_STARTED     port=2222
2026-04-27T21:01:33Z  [SYS]   0.0.0.0       HTTP_STARTED    port=8080
2026-04-27T21:01:33Z  [SYS]   0.0.0.0       FTP_STARTED     port=2121
2026-04-27T21:03:21Z  [SSH]   192.168.1.50  CONNECTION
2026-04-27T21:03:27Z  [SSH]   192.168.1.50  AUTH_ATTEMPT    username=root  password=toor
2026-04-27T21:03:29Z  [HTTP]  192.168.1.50  LOGIN_ATTEMPT   username=admin password=admin123
2026-04-27T21:03:31Z  [FTP]   192.168.1.50  LOGIN_ATTEMPT   username=anonymous password=test@test.com
\`\`\`

---

## ✨ Features

| | Feature | Description |
|---|---------|-------------|
| 🔐 | **SSH Honeypot** | Fake SSH server — logs every auth attempt, always rejects |
| 🌐 | **HTTP Honeypot** | Fake admin panel — captures credentials from login attempts |
| 📁 | **FTP Honeypot** | Raw TCP server — logs usernames, passwords and commands |
| 🎨 | **Colour logging** | Each service has its own colour in the console |
| 📄 | **JSON Lines** | Every event saved as structured JSON — grep, Splunk, ELK ready |
| ⚙️ | **Configurable** | All ports configurable via .env |
| 🪶 | **Lightweight** | No database, no bloat — plain files only |

---

## 🚀 Getting started

### 1. Clone and install

\`\`\`bash
git clone https://github.com/toppos2/honeypot.git
cd honeypot
npm install
\`\`\`

### 2. Generate SSH host key

\`\`\`bash
ssh-keygen -t rsa -b 2048 -f logs/.ssh_host_key -N ""
\`\`\`

### 3. Configure (optional)

\`\`\`bash
cp .env.example .env
\`\`\`

### 4. Run

\`\`\`bash
npm start
\`\`\`

---

## 📁 Project structure

\`\`\`
honeypot/
├── src/
│   ├── index.js          # Entry point — starts all services
│   ├── logger.js         # Centralised logger (console + JSON Lines)
│   ├── ssh-honeypot.js   # Fake SSH server (ssh2)
│   ├── http-honeypot.js  # Fake HTTP admin panel (Express)
│   └── ftp-honeypot.js   # Fake FTP server (raw TCP)
├── logs/                 # Auto-created on first run, gitignored
├── .env.example
├── .gitignore
└── package.json
\`\`\`

---

## 🔍 Analysing logs

\`\`\`bash
# Watch live
tail -f logs/honeypot.log

# All SSH login attempts
grep '"service":"SSH"' logs/honeypot.log | grep LOGIN

# All captured passwords
grep -o '"password":"[^"]*"' logs/honeypot.log | sort | uniq -c | sort -rn
\`\`\`

---

## ⚠️ Legal disclaimer

> This tool is for **educational purposes and authorised testing only**.
> Only deploy on systems you **own** or have **explicit written permission** to monitor.
> The author accepts no responsibility for misuse.

---

<div align="center">

## 👤 Author

**Leander Tops**
Bachelor E-ICT — Cyber and Cloud Security @ Thomas More Geel
Internship as Junior Pentester @ dotNET lab

[![GitHub](https://img.shields.io/badge/GitHub-toppos2-181717?style=for-the-badge&logo=github)](https://github.com/toppos2)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-leander--tops-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/leander-tops/)
[![Email](https://img.shields.io/badge/Email-tops.leander03@gmail.com-EA4335?style=for-the-badge&logo=gmail)](mailto:tops.leander03@gmail.com)

</div>
