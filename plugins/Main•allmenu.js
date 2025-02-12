import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, __dirname }) => {
  if (usedPrefix === 'a' || usedPrefix === 'A') return;
  try {
    const pp = 'https://qu.ax/kbRxS.png'; 
    const vn = './media/menu.mp3';
    const d = new Date(new Date() + 3600000);
    const locale = 'es';
    const date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    const uptime = clockString(process.uptime() * 1000);
    const taguser = '@' + m.sender.split('@')[0];

    const { key } = await conn.sendMessage(m.chat, { text: `Cargando menú, espera un momento...` }, { quoted: m });

    const menuText = `
╭━〔 *FicctBot - Menú* 〕━⬣
┃👤 *Usuario:* ${taguser}
┃📅 *Fecha:* ${date}
┃⏳ *Tiempo Activo:* ${uptime}
┃👑 *Owner:* Alba070503
╰━━━━━━━━━━━━⬣
Bienvenido Al menu de Ficct-Bot
> Mallas De las Carreras:
#sistema
#informatica
#robotica
#redes

> PDF Recomendaciones Docentes & Maestro Oferta
#recomendaciones
#maestro

> Numeros Oficiales De Administradores de Grupo de WhatsApp 
#numsem1 (semestre 1)
#numsem2 (semestre 2)
#numsem3 (semestre 3)
#numsem4 (semestre 4)
#numsem5 (semestre 5)
#numsem6 (semestre 6)
#numsem7 (semestre 7)
#numsem8 (semestre 8)
#numsem9 (semestre 9)
#numsem10 (semestre 10)
#numelectiva (materia electiva)

> información Jefes De Carrera
#jefesistemas (Jefe de carrera sistema)
#jefeinfo (Jefe de carrera informática)
#jeferedes (Jefe de carrera redes)
#jeferobotica (Jefe de carrera robótica)

> Inteligencia Artificial 
#ia (chatgpt)
#gemini (Google Ai)
#blackai (BlackboxAi)
#deepseek (Deepseek Ai)
#claude (Claude Ai)
#iameta (Meta Ai)


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
handler.fail = null;
export default handler;

function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
