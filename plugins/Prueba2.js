import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  try {
    const pdfUrl = 'https://qu.ax/ewTsT.pdf';
    const fileName = 'Maestro_En_Oferta_1_2025.pdf';

    // Enviar el PDF directamente desde la URL
    await conn.sendMessage(m.chat, {
      document: { url: pdfUrl },
      mimetype: 'application/pdf',
      fileName: fileName
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '❗ *Error:* No se pudo enviar el documento. Inténtalo nuevamente.', m);
  }
};

handler.help = ['maestro'];
handler.tags = ['pdf'];
handler.command = ['maestro'];

export default handler;
