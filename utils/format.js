function nowFormatted() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()} / ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function parseMention(text = '') {
  const match = text.match(/@(\d{5,20})/);
  if (!match) return null;
  return `${match[1]}@s.whatsapp.net`;
}

function toUserTag(jid = '') {
  return `@${jid.split('@')[0]}`;
}

function normalizeRoleName(input = '') {
  const v = input.toLowerCase('tr');
  if (['1', 'müşteri', 'musteri'].includes(v)) return 'Müşteri';
  if (['2', 'admin'].includes(v)) return 'Admin';
  if (['3', 'developer'].includes(v)) return 'Developer';
  return null;
}

module.exports = { nowFormatted, parseMention, toUserTag, normalizeRoleName };
