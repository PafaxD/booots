const { setPermission, getPermission } = require('../../utils/permissions');
const { footer } = require('../../utils/messages');
module.exports = {
  name: 'admin-şifre',
  async execute({ sock, msg, args, config, senderJid, senderName }) {
    const code = args[0];
    if (code !== config.adminPassword) {
      return sock.sendMessage(msg.key.remoteJid, { text: `Şifre hatalı.${footer(config)}` }, { quoted: msg });
    }
    const existing = getPermission(senderJid);
    if (!existing || existing.yetki !== 'Developer') {
      setPermission({ jid: senderJid, name: senderName, yetki: 'Developer', verenJid: senderJid, verenName: senderName });
    }
    await sock.sendMessage(msg.key.remoteJid, { text: `✅ ${senderName || senderJid.split('@')[0]} artık *Developer* yetkisine sahip.${footer(config)}` }, { quoted: msg });
  }
};
