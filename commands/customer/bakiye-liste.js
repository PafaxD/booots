const { getAllCustomers } = require('../../utils/balance');
const { footer } = require('../../utils/messages');
const { toUserTag } = require('../../utils/format');
module.exports = {
  name: 'bakiye-liste',
  async execute({ sock, msg, config }) {
    const rows = getAllCustomers().filter((x)=>x.bakiye>0).sort((a,b)=>b.bakiye-a.bakiye);
    if (!rows.length) return sock.sendMessage(msg.key.remoteJid, { text: `Bakiyesi olan kayıt yok.${footer(config)}` }, { quoted: msg });
    const mentions = rows.map((x)=>x.jid);
    let text = `_*BAKİYE LİSTESİ*_\n\n`;
    rows.forEach((row, i) => {
      text += `Sıra: ${i+1}\nKişi: ${toUserTag(row.jid)}\nMevcut bakiye: ${row.bakiye}\n⎯⎯⎯⎯⎯\n`;
    });
    text += footer(config);
    await sock.sendMessage(msg.key.remoteJid, { text, mentions }, { quoted: msg });
  }
};
