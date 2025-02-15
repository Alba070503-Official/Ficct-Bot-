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
Bienvenido Al menu de recomendaciones de Ficct-Bot
> Semestre 1
#calculo1_o_#mat101
#fisica1_o_#fis100
#ingles1_o_#lin100
#estructuradiscreta_o_#inf119
#introduccion_o_#inf110

> Semestre 2
#calculo2_o_#mat102
#algebra_o_#mat103
#fisica2_o_#fis102
#ingles2_o_#lin101
#programacion1_o_#inf120

> Semestre 3
#ecuacionesdif_o_#mat207
#arquitecturacomputadora_o_#inf211
#fisica3_o_#fis200
#programacion2_o_#inf210
#administracion_o_#adm100
#teoriadecampo_o_#elt241
#analisisdecircuito_o_#rds210

> Semestre 4
#probabilidadestadistica1_o_#mat202
#metodonumerico_o_#mat205
#estructuradedatos1_o_#inf220
#programacionensamblador&o_#inf221
#contabilida_o_#adm200
#analisisdecircuitoelectronico_o_#rds220

> Semestre 5
#probabilidadestadistica2_o_#mat302
#estructuradedatos2_o_#inf310
#organizacionymetodo_o_#adm330
#basededatos1_o_#inf312
#economiaparalagestion_o_#eco300
#lenguajeformales_o_#inf319
#programacionlogica_o_#inf318
#señalesysistemas_o_#elt354
#electronicaplicadaredes_o_#rds310
#sistemaslogicoydigitales1_o_#elt352

> Semestre 6
#investigacionoperativa_o_#mat329
#interpretaciondeseñales_o_#rds320
#sistemaslogicoydigitales2_o_#elt362
#basededatos2_o_#inf322
#sistemasoperativo1_o_#inf323
#sistemasdeinformacion1_o_#inf342
#finanzasparalaempresa_o_#adm320

> Semestre 7
#investigaciónoperativa2_o_#mat419
#redes1_o_#inf433
#sistemasdecominicacion1_o_#elt374
#sistemasoperativos2_o_#inf413
#aplicacionesconmicroprocesadores_o_#rds410
#inteligenciartificial_o_#inf418
#sistemasdeinformacion2_o_#inf412
#sistemasdesoporte_o_#inf432

>Semestre 8
#preparacionyevaulaciondeproyecto_o_#eco449
#redes2_o_#inf423
#sistemasexperto_o_#inf428
#sistemasdeinformaciongeografica_o_#inf442
#ingenieria de software1_o_#inf422
#auditoriainformatica_o_#inf462
#sistemasdecomunicacion2_o_#elt384
#legislacionenredes_o_#rds429
#tallerdeanalisisydiseño_o_#rds421

> Semestre 9
#tallerdegrado1_o_#inf511
#gestionyadministracion_o_#rds512
#tecnologiaweb_o_#inf512
#redesinalambricas_o_#rds512
#seguridaderedes_o_#rds519
#ingenieriadesoftware2_o_#inf512
#arquitecturadesoftware_o_#inf552

> Semestre 10
Felicidades ya está a punto de graduarte 🥀 

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
