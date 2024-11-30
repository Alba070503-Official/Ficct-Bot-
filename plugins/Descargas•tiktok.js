import Scraper from '@SumiFX/Scraper'
import axios from 'axios'
import fetch from 'node-fetch'


let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return m.reply(`🍭 Ingresa un enlace del video de TikTok junto al comando.\n\nEjemplo:\n${usedPrefix + command} https://vm.tiktok.com/ZMMCYHnxf/`)

    try {
        // Intentar con Scraper API
        let { title, published, quality, likes, commentCount, shareCount, views, dl_url } = await Scraper.tiktokdl(args[0])

        let txt = `╭─⬣「 *TikTok Download* 」⬣\n`
            txt += `│  ≡◦ *🍭 Título* : ${title}\n`
            txt += `│  ≡◦ *📅 Publicado* : ${published}\n`
            txt += `│  ≡◦ *🪴 Calidad* : ${quality}\n`
            txt += `│  ≡◦ *👍 Likes* : ${likes}\n`
            txt += `│  ≡◦ *🗣 Comentarios* : ${commentCount}\n`
            txt += `│  ≡◦ *💫 Share* : ${shareCount}\n`
            txt += `│  ≡◦ *📹 Visitas* : ${views}\n`
            txt += `╰─⬣`

        await conn.sendMessage(m.chat, { video: { url: dl_url }, caption: txt }, { quoted: m })
    } catch {
        try {
            // Intentar con Starlights API
            const api = await fetch(`https://api-starlights-team.koyeb.app/api/tiktok?url=${args[0]}`)
            const data = await api.json()

            if (data.status) {
                const { title, video } = data.data
                let txt = `╭─⬣「 *TikTok Download* 」⬣\n`
                    txt += `│  ≡◦ *🍭 Título* : ${title}\n`
                    txt += `╰─⬣`

                await conn.sendMessage(m.chat, { video: { url: video }, caption: txt }, { quoted: m })
            }
        } catch {
            try {
                // Intentar con Delirius API
                const api1 = await fetch(`https://delirius-api-oficial.vercel.app/api/tiktok?url=${args[0]}`)
                const data1 = await api1.json()

                if (data1.status) {
                    const { author, repro, like, share, comment, download, duration, title, meta, published } = data1.data
                    const publishedDate = formatDate(published)
                    const fileSize = convertBytesToMB(meta.media[0].size_org)

                    let txt = `╭─⬣「 *TikTok Download* 」⬣\n`
                        txt += `│  ≡◦ *🍭 Título* : ${title}\n`
                        txt += `│  ≡◦ *🐢 Autor* : ${author.nickname}\n`
                        txt += `│  ≡◦ *🕜 Duración* : ${duration} Segundos\n`
                        txt += `│  ≡◦ *📹 Reproducciones* : ${repro}\n`
                        txt += `│  ≡◦ *👍 Likes* : ${like}\n`
                        txt += `│  ≡◦ *🗣 Comentarios* : ${comment}\n`
                        txt += `│  ≡◦ *📦 Descargas* : ${download}\n`
                        txt += `│  ≡◦ *💫 Share* : ${share}\n`
                        txt += `│  ≡◦ *📅 Publicado* : ${publishedDate}\n`
                        txt += `│  ≡◦ *🌵 Tamaño* : ${fileSize}\n`
                        txt += `╰─⬣`

                    await conn.sendMessage(m.chat, { video: { url: meta.media[0].org }, caption: txt }, { quoted: m })
                }
            } catch {
                m.reply('⚠️ No se pudo descargar el video. Intenta nuevamente más tarde.')
            }
        }
    }
}

handler.help = ['tiktok <url tt>']
handler.tags = ['downloader']
handler.command = ['tiktok', 'ttdl', 'tiktokdl', 'tiktoknowm']
handler.register = true

export default handler

// Funciones auxiliares
function convertBytesToMB(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

function formatDate(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                                                        }
