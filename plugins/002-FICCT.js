import { sticker } from '../lib/sticker.js';

const GROUP_ID = "120363382897286189@g.us"; let handler = async (m, { conn, text }) => { try { if (m.chat !== GROUP_ID) return m.reply('❌ Este comando solo se puede usar dentro del grupo permitido.');

if (!text && !m.quoted) return m.reply('*⚠️ Ingresa un mensaje o archivo a enviar.*\n\n*Permitido:*\n- Texto\n- Imagen\n- Video\n- Sticker\n- Audio');
    
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';
    text = text || m.quoted.text || q.text || q.caption || '';

    let media, messageType, sticker_;
    
    if (/image|video|mp4|audio|webp/.test(mime)) {
        media = await q.download();
        if (/webp/.test(mime)) {
            sticker_ = await sticker(media, false, 'FicctBot', 'Powered by @Alba070503');
        }
    }

    const recipient = "120363360977692179@newsletter";
    const groupChatId = GROUP_ID;

    await m.reply('Enviando... ⏳ Si el contenido lleva multimedia tomará tiempo, sea paciente.');
    
    if (/webp/.test(mime) && media) {
        await conn.sendFile(recipient, sticker_, 'sticker.webp', '', null);
        await conn.sendFile(groupChatId, sticker_, 'sticker.webp', '', m);
        messageType = 'Sticker';
    } else if (/image/.test(mime) && media) {
        await conn.sendMessage(recipient, { image: media, caption: text });
        await conn.sendMessage(groupChatId, { image: media, caption: text });
        messageType = 'Imagen';
    } else if (/video/.test(mime) && media) {
        await conn.sendMessage(recipient, { video: media, caption: text });
        await conn.sendMessage(groupChatId, { video: media, caption: text });
        messageType = 'Video';
    } else if (/audio/.test(mime) && media) {
        await conn.sendMessage(recipient, { audio: media, mimetype: 'audio/mp4', ptt: true });
        await conn.sendMessage(groupChatId, { audio: media, mimetype: 'audio/mp4', ptt: true });
        messageType = 'Audio';
    } else if (text) {
        await conn.sendMessage(recipient, { text });
        await conn.sendMessage(groupChatId, { text });
        messageType = 'Texto';
    } else {
        return m.reply('❌ No se pudo procesar el archivo o mensaje.');
    }
    
    let groupMessage = `*@${m.sender.split("@")[0]} ha enviado lo siguiente al canal:*\n\n\`Tipo de mensaje:\` ${messageType || mime}\n\`Texto:\` ${text || 'No se incluyó un mensaje de texto.'}`;
    await conn.sendMessage(groupChatId, { text: groupMessage, mentions: [m.sender] });
    await m.reply('✅ Mensaje enviado al canal y al grupo.');
} catch (e) {
    m.reply('❌ Error.');
    console.log(e);
}

};

handler.command = /^(ficct)$/i; export default handler;

