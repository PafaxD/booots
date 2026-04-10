const { hasLevel, setPermission } = require('../../utils/permissions');
const { noPermission, footer } = require('../../utils/messages');
const { normalizeRoleName, parseMention, toUserTag } = require('../../utils/format');
module.exports = {
  name: 'yetki-ver',
  requiredRole: 'Developer',
  async execute({ sock, msg, args, config, senderJid, senderName, body }) {
    if (!hasLevel(senderJid, 'Developer')) {
      return sock.sendMessage(msg.key.remoteJid, { text: noPermission(config) }, { quoted: msg });
    }
    const role = normalizeRoleName(args[0]);
    const target = (msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [])[0] || parseMention(body);
    if (!role || !target) {
      return sock.sendMessage(msg.key.remoteJid, { text: `Kullanım: ${config.prefix}yetki-ver <Yetki> @kişi${footer(config)}` }, { quoted: msg });
    }
    setPermission({ jid: target, name: target.split('@')[0], yetki: role, verenJid: senderJid, verenName: senderName });
    await sock.sendMessage(msg.key.remoteJid, {
      text: `✅ ${toUserTag(target)} kişisine *${role}* yetkisi verildi.${footer(config)}`,
      mentions: [target]
    }, { quoted: msg });
  }
};
