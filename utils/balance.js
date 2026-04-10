const path = require('path');
const { readJson, writeJson } = require('./jsonDb');
const dbFile = path.join(__dirname, '..', 'database', 'musteriler.json');

function getAllCustomers() {
  return readJson(dbFile, []);
}

function getCustomer(jid) {
  return getAllCustomers().find((x) => x.jid === jid) || null;
}

function ensureCustomer(jid, isim) {
  const rows = getAllCustomers();
  let row = rows.find((x) => x.jid === jid);
  if (!row) {
    row = { jid, isim: isim || jid.split('@')[0], bakiye: 0 };
    rows.push(row);
    writeJson(dbFile, rows);
  }
  return row;
}

function addBalance(jid, isim, amount) {
  const rows = getAllCustomers();
  let row = rows.find((x) => x.jid === jid);
  if (!row) {
    row = { jid, isim: isim || jid.split('@')[0], bakiye: 0 };
    rows.push(row);
  }
  row.bakiye += amount;
  writeJson(dbFile, rows);
  return row;
}

function removeBalance(jid, isim, amount) {
  const rows = getAllCustomers();
  let row = rows.find((x) => x.jid === jid);
  if (!row) {
    row = { jid, isim: isim || jid.split('@')[0], bakiye: 0 };
    rows.push(row);
  }
  row.bakiye = Math.max(0, row.bakiye - amount);
  writeJson(dbFile, rows);
  return row;
}

module.exports = { getAllCustomers, getCustomer, ensureCustomer, addBalance, removeBalance };
