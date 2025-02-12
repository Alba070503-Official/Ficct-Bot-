import fs from 'fs';

const handler = async (m, { conn, usedPrefix }) => {
  if (usedPrefix === 'a' || usedPrefix === 'A') return;
  
  try {
    const pp = fs.existsSync('./media/menu.jpg') ? './media/menu.jpg' : 'https://files.catbox.moe/boxrbv.jpg';
    const d = new Date();
    const locale = 'es';
    const date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    const uptime = clockString(process.uptime() * 1000);
    const taguser = '@' + m.sender.split('@')[0];

    const menuText = `
╭━〔 *FicctBot - Menú* 〕━⬣
┃👤 *Usuario:* ${taguser}
┃📅 *Fecha:* ${date}
┃⏳ *Tiempo Activo:* ${uptime}
┃👑 *Owner:* Alba070503
╰━━━━━━━━━━━━⬣
Bienvenido Al menú de Ficct-Bot
> Mallas De las Carreras:
#sistema
#informatica
#robotica
#redes

> PDF Recomendaciones Docentes & Maestro Oferta
#recomendaciones
#maestro

> Números Oficiales De Administradores de Grupo de WhatsApp 
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

> Información Jefes De Carrera
#jefesistemas (Jefe de carrera sistema)
#jefeinfo (Jefe de carrera informática)
#jeferedes (Jefe de carrera redes)
#jeferobotica (Jefe de carrera robótica)

> Inteligencia Artificial 
#ia (ChatGPT)
#gemini (Google AI)
#blackai (Blackbox AI)
#deepseek (Deepseek AI)
#claude (Claude AI)
#iameta (Meta AI)
    `.trim();

    // Enviar primero el texto para mayor rapidez
    await conn.sendMessage(m.chat, { text: menuText, mentions: [m.sender] });

    // Enviar la imagen después
    await conn.sendMessage(m.chat, { image: fs.existsSync(pp) ? { url: pp } : { url: 'https://files.catbox.moe/boxrbv.jpg' } });

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
