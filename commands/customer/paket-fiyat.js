const { footer } = require('../../utils/messages');
const prices = {
  bronz: `_*🟤Bronz Paket:*_\n𝟑𝟎 Üye - 20₺ (Haftalık)\n𝟓𝟎 Üye - 40₺ (Haftalık)\n𝟕𝟎 Üye - 60₺ (Haftalık)\n𝟏𝟎𝟎 Üye - 80₺ (Haftalık)\n𝟏𝟓𝟎 Üye - 100₺ (Haftalık)\n𝟐𝟎𝟎 Üye - 150₺ (Haftalık)\n𝟑𝟎𝟎 Üye - 170₺ (Haftalık)\n𝟒𝟎𝟎 Üye - 190₺ (Haftalık)\n𝟓𝟎𝟎 Üye - 220₺ (Haftalık) + (Aylık: 300₺)\n𝟔𝟎𝟎 Üye - 350₺ (Haftalık) + (Aylık: 400₺)\n𝟕𝟎𝟎 Üye - 370₺ (Haftalık) + (Aylık: 450₺)\n𝟖𝟎𝟎 Üye - 400₺ (Haftalık) + (Aylık: 550₺)\n𝟗𝟎𝟎 Üye - 500₺ (Haftalık) + (Aylık: 650₺)`,
  gümüş: `_*🔘Gümüş Paket:*_\n𝟏𝟎 Üye - 30₺ (Haftalık)\n𝟑𝟎 Üye - 60₺ (Haftalık)\n𝟓𝟎 Üye - 90₺ (Haftalık)\n𝟕𝟎 Üye - 120₺ (Haftalık)\n𝟏𝟎𝟎 Üye - 140₺ (Haftalık)\n𝟏𝟓𝟎 Üye - 160₺ (Haftalık)\n𝟐𝟎𝟎 Üye - 190₺ (Haftalık)\n𝟑𝟎𝟎 Üye - 280₺ (Haftalık)\n𝟒𝟎𝟎 Üye - 350₺ (Haftalık)\n𝟓𝟎𝟎 Üye - 470₺ (Haftalık) + (Aylık: 500₺)\n𝟔𝟎𝟎 Üye - 500₺ (Haftalık) + (Aylık: 550₺)\n𝟕𝟎𝟎 Üye - 650₺ (Haftalık) + (Aylık: 700₺)\n𝟖𝟎𝟎 Üye - 700₺ (Haftalık) + (Aylık: 770₺)\n𝟗𝟎𝟎 Üye - 800₺ (Haftalık) + (Aylık: 850₺)`,
  altın: `_*🟡Altın Paket:*_\n𝟏𝟎 Üye - 40₺ (SINIRSIZ)\n𝟑𝟎 Üye - 70₺ (SINIRSIZ)\n𝟓𝟎 Üye - 100₺ (SINIRSIZ)\n𝟕𝟎 Üye - 130₺ (SINIRSIZ)\n𝟏𝟎𝟎 Üye - 160₺ (SINIRSIZ)\n𝟏𝟓𝟎 Üye - 200₺ (SINIRSIZ)\n𝟐𝟎𝟎 Üye - 250₺ (SINIRSIZ)\n𝟑𝟎𝟎 Üye - 330₺ (SINIRSIZ)\n𝟒𝟎𝟎 Üye - 400₺ (SINIRSIZ)\n𝟓𝟎𝟎 Üye - 500₺ (SINIRSIZ)\n𝟔𝟎𝟎 Üye - 600₺ (SINIRSIZ)\n𝟕𝟎𝟎 Üye - 700₺ (SINIRSIZ)\n𝟖𝟎𝟎 Üye - 800₺ (SINIRSIZ)\n𝟗𝟎𝟎 Üye - 900₺ (SINIRSIZ)`,
  elmas: `_*💎Elmas Paket:*_\n𝟏𝟎 Üye - 50₺ (SINIRSIZ)\n𝟑𝟎 Üye - 80₺ (SINIRSIZ)\n𝟓𝟎 Üye - 90₺ (SINIRSIZ)\n𝟕𝟎 Üye - 170₺ (SINIRSIZ)\n𝟏𝟎𝟎 Üye - 260₺ (SINIRSIZ)\n𝟏𝟓𝟎 Üye - 300₺ (SINIRSIZ)\n𝟐𝟎𝟎 Üye - 450₺ (SINIRSIZ)\n𝟑𝟎𝟎 Üye - 530₺ (SINIRSIZ)\n𝟒𝟎𝟎 Üye - 600₺ (SINIRSIZ)\n𝟓𝟎𝟎 Üye - 700₺ (SINIRSIZ)\n𝟔𝟎𝟎 Üye - 800₺ (SINIRSIZ)\n𝟕𝟎𝟎 Üye - 900₺ (SINIRSIZ)\n𝟖𝟎𝟎 Üye - 1.000₺ (SINIRSIZ)\n𝟗𝟎𝟎 Üye - 2.000₺ (SINIRSIZ)`
};
module.exports = {
  name: 'paket-fiyat',
  async execute({ sock, msg, args, config }) {
    const key = (args[0] || '').toLowerCase('tr');
    const normalized = key === 'gumus' ? 'gümüş' : key;
    const text = prices[normalized];
    if (!text) return sock.sendMessage(msg.key.remoteJid, { text: `Paket bulunamadı. Kullanım: ${config.prefix}paket-fiyat <Bronz|Gümüş|Altın|Elmas>${footer(config)}` }, { quoted: msg });
    await sock.sendMessage(msg.key.remoteJid, { text: `${text}${footer(config)}` }, { quoted: msg });
  }
};
