const { hasLevel } = require('../../utils/permissions');
const { noPermission, footer } = require('../../utils/messages');
const { listGroups } = require('../../utils/groups');
module.exports = {
  name: 'gruplar',
  requiredRole: 'Developer',
  async execute({ sock, msg, config, senderJid }) {
    if (!hasLevel(senderJid, 'Developer')) return sock.sendMessage(msg.key.remoteJid, { text: noPermission(config) }, { quoted: msg });
    const rows = listGroups();
    if (!rows.length) return sock.sendMessage(msg.key.remoteJid, { text: `Kayıtlı grup yok.${footer(config)}` }, { quoted: msg });
    let text = '';
    for (const row of rows) {
      text += `_*📊Sıra:*_ ${row.id}\n_*👥Grup Adı:*_ ${row.grupAdi}\n_*🙍‍♂️Grup Üye Sayısı:*_ ${row.uyeSayisi}\n_*🔗Grup Linki:*_ ${row.link}\n\n`;
    }
    text += footer(config);
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
};
