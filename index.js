const path = require('path');
const chalk = require('chalk');
const config = require('./config/settings');
const { startSingleSession, listAccounts } = require('./utils/accountManager');
const { loadCommands } = require('./utils/commandLoader');
const { addCommandLog } = require('./utils/logger');
const { getLevelName } = require('./utils/permissions');
const { footer } = require('./utils/messages');

const commands = loadCommands(path.join(__dirname, 'commands'));

function getTextMessage(msg) {
  return msg.message?.conversation
    || msg.message?.extendedTextMessage?.text
    || msg.message?.imageMessage?.caption
    || msg.message?.videoMessage?.caption
    || '';
}

async function bootstrap() {
  console.log(chalk.cyan(`\n${config.botName} başlatılıyor...`));
  const mainSock = await startSingleSession('main', { interactive: true });
  const accountRows = listAccounts();
  for (const account of accountRows) {
    startSingleSession(account.sessionId, { interactive: false }).catch(console.error);
  }

  mainSock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg?.message || msg.key.fromMe) return;
    const body = getTextMessage(msg).trim();
    if (!body.startsWith(config.prefix)) return;

    const withoutPrefix = body.slice(config.prefix.length).trim();
    const [rawCmd, ...args] = withoutPrefix.split(/\s+/);
    const commandName = rawCmd.toLowerCase('tr');
    const cmd = commands.get(commandName);
    if (!cmd) {
      return mainSock.sendMessage(msg.key.remoteJid, { text: `Bilinmeyen komut: ${commandName}${footer(config)}` }, { quoted: msg });
    }

    const senderJid = msg.key.participant || msg.key.remoteJid;
    const senderName = msg.pushName || senderJid.split('@')[0];
    const role = getLevelName(senderJid) || 'Yetkisiz';

    try {
      await cmd.execute({
        sock: mainSock,
        msg,
        args,
        config,
        senderJid,
        senderName,
        body,
        role
      });
      addCommandLog({ userJid: senderJid, role, command: commandName, action: `${commandName} komutu kullanıldı` });
    } catch (error) {
      console.error(error);
      await mainSock.sendMessage(msg.key.remoteJid, { text: `Komut çalıştırılırken hata oluştu: ${error.message}${footer(config)}` }, { quoted: msg });
    }
  });
}

bootstrap().catch((err) => {
  console.error('Başlatma hatası:', err);
  process.exit(1);
});
