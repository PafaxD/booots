const { ensureCustomer } = require('../../utils/balance');
const { footer } = require('../../utils/messages');
const { parseMention, toUserTag } = require('../../utils/format');
module.exports = {
  name: 'bakiye-gör',
  async execute({ sock, msg, config, body }) {
    const target = (msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [])[0] || parseMention(body);
    if (!target) return sock.sendMessage(msg.key.remoteJid, { text: `Kullanım: ${config.prefix}bakiye-gör @kişi${footer(config)}` }, { quoted: msg });
    const row = ensureCustomer(target, target.split('@')[0]);
    await sock.sendMessage(msg.key.remoteJid, { text: `${toUserTag(target)} mevcut bakiyesi: *${row.bakiye}*${footer(config)}`, mentions: [target] }, { quoted: msg });
  }
};
