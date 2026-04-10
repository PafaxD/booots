const path = require('path');
const { readJson } = require('../../utils/jsonDb');
const { hasLevel } = require('../../utils/permissions');
const { noPermission, footer, blockedFeature } = require('../../utils/messages');
module.exports = {
  name: 'girilmiş-gruplar',
  requiredRole: 'Developer',
  async execute({ sock, msg, config, senderJid }) {
    if (!hasLevel(senderJid, 'Developer')) return sock.sendMessage(msg.key.remoteJid, { text: noPermission(config) }, { quoted: msg });
    if (config.blockedFeatures.massGroupJoin) {
      const rows = readJson(path.join(__dirname, '..', '..', 'database', 'joinedGroups.json'), []);
      if (!rows.length) return sock.sendMessage(msg.key.remoteJid, { text: `Aktif güvenli oturum kaydı yok.${footer(config)}` }, { quoted: msg });
    }
    return sock.sendMessage(msg.key.remoteJid, { text: blockedFeature(config, 'Toplu grup katılım otomasyonu') }, { quoted: msg });
  }
};
