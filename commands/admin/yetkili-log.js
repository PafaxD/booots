const fs = require('fs');
const path = require('path');
const { hasLevel } = require('../../utils/permissions');
const { noPermission, footer } = require('../../utils/messages');
module.exports = {
  name: 'yetkili-log',
  requiredRole: 'Developer',
  async execute({ sock, msg, args, config, senderJid }) {
    if (!hasLevel(senderJid, 'Developer')) {
      return sock.sendMessage(msg.key.remoteJid, { text: noPermission(config) }, { quoted: msg });
    }
    const link = args[0];
    if (!link) {
      return sock.sendMessage(msg.key.remoteJid, { text: `Kullanım: ${config.prefix}yetkili-log <grup-linki>${footer(config)}` }, { quoted: msg });
    }
    const file = path.join(__dirname, '..', '..', 'config', 'settings.js');
    const raw = fs.readFileSync(file, 'utf8');
    const next = raw.replace(/yetkiliLogGroup: '.*?'/, `yetkiliLogGroup: '${link}'`);
    fs.writeFileSync(file, next, 'utf8');
    await sock.sendMessage(msg.key.remoteJid, { text: `✅ Yetkili log bağlantısı güncellendi.\nYeni değer: ${link}${footer(config)}` }, { quoted: msg });
  }
};
