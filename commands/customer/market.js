const { footer } = require('../../utils/messages');
module.exports = {
  name: 'market',
  async execute({ sock, msg, config }) {
    const text = `_*VIOLENT MARKET🏪*_\n\n_ℹ️ Peki bu üyeler size ne fayda sağlar?_\n\n- Gruptaki üye sayınız artar.\n- Grup alım satımlarınızda üye miktarı yüksek olunca grup değeriniz artar. Kısacası size para kazandırır.\n\n_🔀Üye Özellikleri:_\n\n*🟤Bronz Paket:*\n- Sadece 1 gruba katılım sağlar.\n- Süre sistemi.\n- Grupta girdiğiniz mesajlara tepki bırakmaz.\n\n*🔘Gümüş Paket (AKTİF):*\n- Sadece 1 gruba katılım sağlar.\n- Süre sistemi.\n- Aldığınız üye sayısının %7 kadar tepki verir.\n\n*🟡Altın Paket (AKTİF):*\n- Sadece 1 gruba katılım sağlar.\n- Süre sistemi yoktur, SINIRSIZ.\n- Aldığınız üye sayısının %9 kadar tepki verir.\n\n*💎Elmas Paket (AKTIF):*\n- Sadece 1 gruba katılım sağlar.\n- Süre sistemi yoktur, SINIRSIZ.\n- Aldığınız üye sayısının %14 kadar tepki verir.\n- DM cevaplama ve diğer ileri özellikler bakımda.\n\n> Eğer paketlerin üye fiyatlarını öğrenmek için ${config.prefix}paket-fiyat paket-adı giriniz.${footer(config)}`;
    await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
  }
};
