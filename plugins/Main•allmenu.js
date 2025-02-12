import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, __dirname }) => {
  if (usedPrefix === 'a' || usedPrefix === 'A') return;
  try {
    const pp = 'https://telegra.ph/file/f1d5a8d6b2c03efeaaa78.jpg'; 
    const vn = './media/menu.mp3';
    const d = new Date(new Date() + 3600000);
    const locale = 'es';
    const date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    const uptime = clockString(process.uptime() * 1000);
    const taguser = '@' + m.sender.split('@')[0];

    const { key } = await conn.sendMessage(m.chat, { text: `Cargando menú, espera un momento...` }, { quoted: m });

    await conn.sendMessage(m.chat, { text: `📢 Únete a mi canal de WhatsApp: https://whatsapp.com/channel/0029VaAN15BJP21BYCJ3tH04` }, { edit: key });

    const menuText = `
╭━〔 *FicctBot - Menú* 〕━⬣
┃👤 *Usuario:* ${taguser}
┃📅 *Fecha:* ${date}
┃⏳ *Tiempo Activo:* ${uptime}
┃👑 *Owner:* Alba070503
╰━━━━━━━━━━━━⬣
    `.trim();

    const fkontak = {
      key: { remoteJid: 'status@broadcast', fromMe: false, id: 'Halo' },
      message: { contactMessage: { vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Bot;;;\nFN:FicctBot\nTEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nEND:VCARD` } }
    };

    conn.sendMessage(m.chat, { image: { url: pp }, caption: menuText, mentions: [m.sender] }, { quoted: fkontak });
  } catch (e) {
    conn.reply(m.chat, '❗ *Error:* No se pudo enviar el menú. Reporta esto al propietario del bot.', m);
  }
};

handler.command = /^(menu|menú|help|info|comandos|allmenu|ayuda|commands)$/i;
handler.exp = 50;
handler.fail = null;
export default handler;

function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
