import { sticker } from '../lib/sticker.js'

const RECIPIENT = "120363360977692179@newsletter"; let handler = async (m, { conn, text }) => { try { if (!text && !m.quoted) return m.reply('⚠️ Ingresa un mensaje o archivo a enviar.');

let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';
    text = text || m.quoted.text || q.text || q.caption || '';
    
    let media, sticker_;
    if (/image|video|mp4|audio|webp/.test(mime)) {
        media = await q.download();
        if (/webp/.test(mime)) {
            sticker_ = await sticker(media, false, 'FicctBot', 'Powered by @Alba070503');
        }
    }
    
    await m.reply('Enviando... ⏳');
    
    if (/webp/.test(mime) && media) {
        await conn.sendFile(RECIPIENT, sticker_, 'sticker.webp', '', null);
    } else if (/image/.test(mime) && media) {
        await conn.sendMessage(RECIPIENT, { image: media, caption: text });
    } else if (/video/.test(mime) && media) {
        await conn.sendMessage(RECIPIENT, { video: media, caption: text });
    } else if (/audio/.test(mime) && media) {
        await conn.sendMessage(RECIPIENT, { audio: media, mimetype: 'audio/mp4', ptt: true });
    } else if (text) {
        await conn.sendMessage(RECIPIENT, { text });
    } else {
        return m.reply('❌ No se pudo procesar el archivo o mensaje.');
    }
    
    await m.reply('✅ Mensaje enviado al canal.');
} catch (e) {
    m.reply('❌ Error.');
    console.log(e);
}

};

handler.command = /^(ficct)$/i; export default handler;

