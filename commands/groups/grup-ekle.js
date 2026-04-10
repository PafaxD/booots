const { hasLevel } = require('../../utils/permissions');
const { noPermission, footer } = require('../../utils/messages');
const { addGroup } = require('../../utils/groups');
module.exports = {
  name: 'grup-ekle',
  requiredRole: 'Developer',
  async execute({ sock, msg, args, config, senderJid }) {
    if (!hasLevel(senderJid, 'Developer')) return sock.sendMessage(msg.key.remoteJid, { text: noPermission(config) }, { quoted: msg });
    const link = args[0];
    if (!link) return sock.sendMessage(msg.key.remoteJid, { text: `Kullanım: ${config.prefix}grup-ekle <grup-linki>${footer(config)}` }, { quoted: msg });
    const row = addGroup(link);
    await sock.sendMessage(msg.key.remoteJid, { text: `✅ Grup hafızaya eklendi.\nSıra: ${row.id}\nLink: ${row.link}${footer(config)}` }, { quoted: msg });
  }
};
