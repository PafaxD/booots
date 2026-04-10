const { hasLevel, removePermission } = require('../../utils/permissions');
const { noPermission, footer } = require('../../utils/messages');
const { parseMention, toUserTag } = require('../../utils/format');
module.exports = {
  name: 'yetki-al',
  requiredRole: 'Developer',
  async execute({ sock, msg, config, senderJid, body }) {
    if (!hasLevel(senderJid, 'Developer')) {
      return sock.sendMessage(msg.key.remoteJid, { text: noPermission(config) }, { quoted: msg });
    }
    const target = (msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [])[0] || parseMention(body);
    if (!target) {
      return sock.sendMessage(msg.key.remoteJid, { text: `Kullanım: ${config.prefix}yetki-al @kişi${footer(config)}` }, { quoted: msg });
    }
    removePermission(target);
    await sock.sendMessage(msg.key.remoteJid, { text: `✅ ${toUserTag(target)} kişisinin yetkisi kaldırıldı.${footer(config)}`, mentions: [target] }, { quoted: msg });
  }
};
