const path = require('path');
const { readJson, writeJson } = require('./jsonDb');
const { nowFormatted } = require('./format');

const dbFile = path.join(__dirname, '..', 'database', 'yetkiler.json');
const levels = { 'Müşteri': 1, 'Admin': 2, 'Developer': 3 };

function getAllPermissions() {
  return readJson(dbFile, []);
}

function getPermission(jid) {
  return getAllPermissions().find((x) => x.jid === jid) || null;
}

function getLevelName(jid) {
  return getPermission(jid)?.yetki || null;
}

function hasLevel(jid, required) {
  const mine = getLevelName(jid);
  if (!mine) return false;
  return (levels[mine] || 0) >= (levels[required] || 0);
}

function setPermission({ jid, name, yetki, verenJid, verenName }) {
  const rows = getAllPermissions();
  const idx = rows.findIndex((x) => x.jid === jid);
  const entry = {
    jid,
    isim: name || jid.split('@')[0],
    yetki,
    verenJid,
    verenName: verenName || verenJid?.split('@')[0] || 'Sistem',
    verilmeZamani: nowFormatted()
  };
  if (idx >= 0) rows[idx] = { ...rows[idx], ...entry };
  else rows.push(entry);
  writeJson(dbFile, rows);
  return entry;
}

function removePermission(jid) {
  const rows = getAllPermissions();
  const filtered = rows.filter((x) => x.jid !== jid);
  writeJson(dbFile, filtered);
}

module.exports = { levels, getAllPermissions, getPermission, getLevelName, hasLevel, setPermission, removePermission };
