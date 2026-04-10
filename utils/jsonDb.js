const fs = require('fs');
const path = require('path');

function ensureFile(filePath, fallback = '[]') {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, fallback, 'utf8');
  }
}

function readJson(filePath, fallback = []) {
  ensureFile(filePath);
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

function writeJson(filePath, data) {
  ensureFile(filePath);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = { ensureFile, readJson, writeJson };
