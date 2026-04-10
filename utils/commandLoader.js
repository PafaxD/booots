const fs = require('fs');
const path = require('path');

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith('.js')) files.push(full);
  }
  return files;
}

function loadCommands(baseDir) {
  const map = new Map();
  for (const file of walk(baseDir)) {
    const cmd = require(file);
    if (cmd?.name && typeof cmd.execute === 'function') {
      map.set(cmd.name, cmd);
    }
  }
  return map;
}

module.exports = { loadCommands };
