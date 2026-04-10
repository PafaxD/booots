const { hasLevel } = require('../../utils/permissions');
const { noPermission, footer } = require('../../utils/messages');
const { removeGroup } = require('../../utils/groups');
module.exports = {
  name: 'grup-sil',
  requiredRole: 'Developer',
  async execute({ sock, msg, args, config, senderJid }) {
    if (!hasLevel(senderJid, 'Developer')) return sock.sendMessage(msg.key.remoteJid, { text: noPermission(config) }, { quoted: msg });
    const id = Number(args[0]);
    if (!id) return sock.sendMessage(msg.key.remoteJid, { text: `Kullanım: ${config.prefix}grup-sil <sıra>${footer(config)}` }, { quoted: msg });
    removeGroup(id);
    await sock.sendMessage(msg.key.remoteJid, { text: `✅ ${id}. sıradaki grup kaldırıldı.${footer(config)}` }, { quoted: msg });
  }
};
