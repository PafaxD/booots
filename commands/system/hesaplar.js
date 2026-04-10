const { listAccounts } = require('../../utils/accountManager');
const { footer } = require('../../utils/messages');
module.exports = {
  name: 'hesaplar',
  async execute({ sock, msg, config }) {
    const rows = listAccounts();
    if (!rows.length) return sock.sendMessage(msg.key.remoteJid, { text: `Kayıtlı ek hesap yok.${footer(config)}` }, { quoted: msg });
    let text = `_*KAYITLI HESAPLAR*_\n\n`;
    for (const row of rows) {
      text += `Sıra: ${row.id}\nEtiket: ${row.label}\nOturum: ${row.sessionId}\nDurum: ${row.connected ? 'Bağlı' : 'Bekliyor'}\n⎯⎯⎯⎯⎯\n`;
    }
    text += footer(config);
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
};
