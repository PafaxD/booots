const { hasLevel } = require('../../utils/permissions');
const { noPermission, footer } = require('../../utils/messages');
const { removeBalance } = require('../../utils/balance');
const { parseMention, toUserTag } = require('../../utils/format');
module.exports = {
  name: 'bakiye-sil',
  requiredRole: 'Developer',
  async execute({ sock, msg, args, config, senderJid, body }) {
    if (!hasLevel(senderJid, 'Developer')) return sock.sendMessage(msg.key.remoteJid, { text: noPermission(config) }, { quoted: msg });
    const target = (msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [])[0] || parseMention(body);
    const amount = Number(args.find((a) => /^\d+$/.test(a)));
    if (!target || !amount) return sock.sendMessage(msg.key.remoteJid, { text: `Kullanım: ${config.prefix}bakiye-sil @kişi <miktar>${footer(config)}` }, { quoted: msg });
    const row = removeBalance(target, target.split('@')[0], amount);
    await sock.sendMessage(msg.key.remoteJid, { text: `✅ ${toUserTag(target)} kişisinden ${amount} bakiye silindi.\nYeni bakiye: ${row.bakiye}${footer(config)}`, mentions: [target] }, { quoted: msg });
  }
};
