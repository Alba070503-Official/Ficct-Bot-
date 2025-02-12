import fetch from 'node-fetch'

let HS = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `❀ Ingresa un texto para hablar con Claude AI`, m)

  try {
    let response = await fetch(`https://api.agungny.my.id/api/claude?q=${text}`)
    let data = await response.json()
    conn.sendMessage(m.chat, { text: data.result })
  } catch (error) {
    console.error(error)
  }
}

HS.command = ['claude', 'claudeai', 'iaclaude']

export default HS
