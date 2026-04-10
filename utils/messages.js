function footer(config) {
  if (!config.footerEnabled) return '';
  return `\n\n> Bu _*${config.botName}*_ adlı sunucuya aittir, Bu tarz bot yaptırmak için veya Whatsapp üyesi almak için, bu numaraya ulaşınız. --> ${config.phoneNumber}\n> ᴅᴇᴠᴇʟᴏᴘᴇᴅ ʙʏ ᴘᴀғᴀ`;
}

function noPermission(config) {
  return `Hey! Komutu kullanman için yeterli _Yetkiye_ sahip değilsin.\n${footer(config)}`;
}

function blockedFeature(config, featureName) {
  return `Bu komut güvenlik/politika nedeniyle pasif bırakıldı: *${featureName}*.\nGerekirse bunu yasal ve manuel onaylı iş akışına dönüştürebilirsin.${footer(config)}`;
}

module.exports = { footer, noPermission, blockedFeature };
