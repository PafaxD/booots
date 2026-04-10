const path = require('path');
const { readJson, writeJson } = require('./jsonDb');
const groupsFile = path.join(__dirname, '..', 'database', 'gruplar.json');

function listGroups() {
  return readJson(groupsFile, []);
}

function addGroup(link) {
  const rows = listGroups();
  const next = { id: rows.length + 1, link, grupAdi: 'Bilinmiyor', uyeSayisi: 0 };
  rows.push(next);
  writeJson(groupsFile, rows);
  return next;
}

function removeGroup(id) {
  const rows = listGroups().filter((x) => x.id !== Number(id));
  const resequenced = rows.map((x, i) => ({ ...x, id: i + 1 }));
  writeJson(groupsFile, resequenced);
  return resequenced;
}

module.exports = { listGroups, addGroup, removeGroup };
