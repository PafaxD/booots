const { hasLevel } = require('../../utils/permissions');
const { noPermission, footer } = require('../../utils/messages');
const { addPendingAccount, startSingleSession } = require('../../utils/accountManager');
module.exports = {
  name: 'hesap-ekle',
  requiredRole: 'Developer',
  async execute({ sock, msg, args, config, senderJid }) {
    if (!hasLevel(senderJid, 'Developer')) {
      return sock.sendMessage(msg.key.remoteJid, { text: noPermission(config) }, { quoted: msg });
    }
    const label = args.join(' ') || undefined;
    const account = addPendingAccount(label);
    startSingleSession(account.sessionId, { interactive: true }).catch(console.error);
    await sock.sendMessage(msg.key.remoteJid, { text: `✅ Yeni hesap slotu oluşturuldu: *${account.label}*\nTerminalde *${account.sessionId}* için QR kod gösterilecek.${footer(config)}` }, { quoted: msg });
  }
};
