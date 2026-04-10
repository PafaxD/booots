const fs = require('fs');
const path = require('path');
const P = require('pino');
const qrcode = require('qrcode-terminal');
const { makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const { readJson, writeJson } = require('./jsonDb');

const dbFile = path.join(__dirname, '..', 'database', 'accounts.json');
const sessionsBase = path.join(__dirname, '..', 'sessions');

async function startSingleSession(sessionId, { interactive = false } = {}) {
  const sessionPath = path.join(sessionsBase, sessionId);
  fs.mkdirSync(sessionPath, { recursive: true });
  const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
  const { version } = await fetchLatestBaileysVersion();
  const sock = makeWASocket({
    version,
    logger: P({ level: 'silent' }),
    auth: state,
    printQRInTerminal: false,
    syncFullHistory: false,
    markOnlineOnConnect: false
  });

  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
    if (qr && interactive) {
      console.log(`\n=== ${sessionId.toUpperCase()} QR KOD ===`);
      qrcode.generate(qr, { small: true });
    }
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) startSingleSession(sessionId, { interactive: false }).catch(console.error);
    }
    if (connection === 'open') {
      console.log(`[OK] ${sessionId} oturumu bağlandı.`);
      const rows = readJson(dbFile, []);
      const idx = rows.findIndex((x) => x.sessionId === sessionId);
      if (idx >= 0) {
        rows[idx].connected = true;
        writeJson(dbFile, rows);
      }
    }
  });

  return sock;
}

function listAccounts() {
  return readJson(dbFile, []);
}

function addPendingAccount(label) {
  const rows = listAccounts();
  const id = rows.length + 1;
  const entry = { id, label: label || `Hesap ${id}`, sessionId: `account_${id}`, connected: false, createdAt: new Date().toISOString() };
  rows.push(entry);
  writeJson(dbFile, rows);
  return entry;
}

module.exports = { startSingleSession, listAccounts, addPendingAccount };
