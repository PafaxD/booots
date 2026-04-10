const path = require('path');
const { readJson, writeJson } = require('./jsonDb');
const { nowFormatted } = require('./format');
const logFile = path.join(__dirname, '..', 'database', 'logs.json');

function addCommandLog({ userJid, role, command, action }) {
  const rows = readJson(logFile, []);
  rows.push({
    userJid,
    role,
    command,
    action,
    usedAt: nowFormatted()
  });
  writeJson(logFile, rows);
}

module.exports = { addCommandLog };
