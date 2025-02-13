import yts from "yt-search";

export default {
    name: 'yts',
    params: ['message'],
    description: 'Busca videos en YouTube',
    command: ['yts'],
    os: true,
    exec: async (m, { sock }) => {
        if (!m.text) return sock.sendMessage(m.from, { text: '❌ Debes escribir algo para buscar en YouTube.' });

        const videos = await yts(m.text);
        if (!videos.videos.length) return sock.sendMessage(m.from, { text: '❌ No se encontraron resultados.' });

        const video = videos.videos[0];

        sock.sendMessage(m.from, {
            caption: `🎬 *Título:* ${video.title}\n⏳ *Duración:* ${video.timestamp}\n📺 *Canal:* ${video.author.name}\n👀 *Vistas:* ${video.views}\n📅 *Subido:* ${video.ago}\n\n_Tiempo límite para responder: 5 minutos_\n_Solo el remitente puede responder._`,
            image: { url: video.thumbnail },
            buttons: [
                { buttonId: 'audio', buttonText: { displayText: '🎵 Audio' } },
                { buttonId: 'video', buttonText: { displayText: '📹 Video' } }
            ],
            headerType: 6,
            viewOnce: true
        });

        const filter = response => response.key.remoteJid === m.from && response.key.participant === m.sender;
        const timeout = setTimeout(() => {
            sock.ev.off('messages.upsert', responseHandler);
        }, 5 * 60 * 1000);

        const responseHandler = async response => {
            if (response.messages[0].message && response.messages[0].message.buttonsResponseMessage && filter(response.messages[0])) {
                clearTimeout(timeout);
                sock.ev.off('messages.upsert', responseHandler);

                const type = response.messages[0].message.buttonsResponseMessage.selectedButtonId === 'audio' ? 'audio' : 'video';
                const url = `https://api.botcahx.eu.org/api/download/get-YoutubeResult?url=${video.url}&type=${type}&xky=zMxPoM%C2%81S`;

                if (type === 'audio') {
                    await sock.sendMedia(m.from, url);
                } else {
                    await sock.sendMedia(m.from, url, { caption: video.title });
                }
            }
        };

        sock.ev.on('messages.upsert', responseHandler);
    }
};
