const { hasLevel } = require('../../utils/permissions');
const { noPermission, footer } = require('../../utils/messages');
const { addBalance } = require('../../utils/balance');
const { parseMention, toUserTag } = require('../../utils/format');
module.exports = {
  name: 'bakiye-ekle',
  requiredRole: 'Developer',
  async execute({ sock, msg, args, config, senderJid, body }) {
    if (!hasLevel(senderJid, 'Developer')) return sock.sendMessage(msg.key.remoteJid, { text: noPermission(config) }, { quoted: msg });
    const target = (msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [])[0] || parseMention(body);
    const amount = Number(args.find((a) => /^\d+$/.test(a)));
    if (!target || !amount) return sock.sendMessage(msg.key.remoteJid, { text: `Kullanım: ${config.prefix}bakiye-ekle @kişi <miktar>${footer(config)}` }, { quoted: msg });
    const row = addBalance(target, target.split('@')[0], amount);
    await sock.sendMessage(msg.key.remoteJid, { text: `✅ ${toUserTag(target)} kişisine ${amount} bakiye eklendi.\nYeni bakiye: ${row.bakiye}${footer(config)}`, mentions: [target] }, { quoted: msg });
  }
};
