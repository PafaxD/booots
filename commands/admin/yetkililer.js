const { getAllPermissions, levels } = require('../../utils/permissions');
const { footer } = require('../../utils/messages');
const { toUserTag } = require('../../utils/format');
module.exports = {
  name: 'yetkililer',
  async execute({ sock, msg, config }) {
    const rows = getAllPermissions().sort((a,b)=>(levels[b.yetki]||0)-(levels[a.yetki]||0));
    if (!rows.length) {
      return sock.sendMessage(msg.key.remoteJid, { text: `Henüz yetkili yok.${footer(config)}` }, { quoted: msg });
    }
    const mentions = [];
    let text = `_*${config.botName}*_ YETKİLİLER 👮\n\n`;
    for (const row of rows) {
      mentions.push(row.jid, row.verenJid);
      text += `Yetkili kişi: ${toUserTag(row.jid)}\nYetkiyi veren: ${toUserTag(row.verenJid)}\nŞuanki mevcut yetkisi: ${row.yetki}\nYetki verilme tarihi: ${row.verilmeZamani}\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n`;
    }
    text += footer(config);
    await sock.sendMessage(msg.key.remoteJid, { text, mentions }, { quoted: msg });
  }
};
