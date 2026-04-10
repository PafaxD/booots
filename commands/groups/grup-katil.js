const { hasLevel } = require('../../utils/permissions');
const { noPermission, blockedFeature } = require('../../utils/messages');
module.exports = {
  name: 'grup-katıl',
  requiredRole: 'Developer',
  async execute({ sock, msg, config, senderJid }) {
    if (!hasLevel(senderJid, 'Developer')) return sock.sendMessage(msg.key.remoteJid, { text: noPermission(config) }, { quoted: msg });
    return sock.sendMessage(msg.key.remoteJid, { text: blockedFeature(config, 'Çoklu hesapla otomatik grup katılımı') }, { quoted: msg });
  }
};
