const { footer } = require('../../utils/messages');
module.exports = {
  name: 'yardım',
  async execute({ sock, msg, config }) {
    const text = `_*${config.botName}*_ MENÜ\n\nKomutlar:\n- ${config.prefix}yardım\n- ${config.prefix}yetki-ver\n- ${config.prefix}yetki-al\n- ${config.prefix}yetkililer\n- ${config.prefix}yetkili-log\n- ${config.prefix}admin-şifre\n- ${config.prefix}hesap-ekle\n- ${config.prefix}hesaplar\n- ${config.prefix}grup-ekle\n- ${config.prefix}grup-sil\n- ${config.prefix}gruplar\n- ${config.prefix}girilmiş-gruplar\n- ${config.prefix}grup-katıl\n- ${config.prefix}grup-ayrıl\n- ${config.prefix}market\n- ${config.prefix}paket-fiyat\n- ${config.prefix}bakiye-ekle\n- ${config.prefix}bakiye-sil\n- ${config.prefix}bakiye-gör\n- ${config.prefix}bakiye-liste${footer(config)}`;
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
};
