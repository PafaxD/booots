const { hasLevel } = require('../../utils/permissions');
const { noPermission, blockedFeature } = require('../../utils/messages');
module.exports = {
  name: 'grup-ayrıl',
  requiredRole: 'Developer',
  async execute({ sock, msg, config, senderJid }) {
    if (!hasLevel(senderJid, 'Developer')) return sock.sendMessage(msg.key.remoteJid, { text: noPermission(config) }, { quoted: msg });
    return sock.sendMessage(msg.key.remoteJid, { text: blockedFeature(config, 'Toplu grup ayrılma otomasyonu') }, { quoted: msg });
  }
};
