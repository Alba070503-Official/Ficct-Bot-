const handler = async (m, { conn, command }) => {
  let imgURL = '';

  switch (command) {
    case 'informatica':
      imgURL = 'https://qu.ax/bngvy.jpg';
      break;
    case 'sistemas':
      imgURL = 'https://qu.ax/YueLA.jpg';
      break;
    case 'redes':
      imgURL = 'https://qu.ax/KAbCr.jpg';
      break;
    default:
      return conn.reply(m.chat, '❗ *Error:* Comando no reconocido.', m);
  }

  await conn.sendMessage(m.chat, { image: { url: imgURL }, caption: `📚 *Carrera:* ${command.charAt(0).toUpperCase() + command.slice(1)}` });
};

handler.command = /^(informatica|sistemas|redes)$/i;
export default handler;
