import PhoneNumber from 'awesome-phonenumber';

let handler = async (m, { conn }) => {
  // Lista de contactos (20 números)
  const contactos = [
    ['59169082575', '🍁 Powered @Alba070503', 'Alba070503', 'Desarrollador', 'Alba070503@hotmail.com', '🇧🇴 Bolivia', 'https://example.com', 'Sin Biografía'],
    ['521234567890', 'Carlos Pérez', 'Soporte Técnico', '📞 Atención 24/7', 'carlos@example.com', '🇲🇽 México', 'https://soporte.com', 'Disponible'],
    ['5511987654321', 'Ana Souza', 'Gerente', '📌 Brasil', 'ana@example.com', '🇧🇷 Brasil', 'https://empresa.com', 'Sin Biografía'],
    ['441234567890', 'John Smith', 'CEO', '🌍 Global', 'john@example.com', '🇬🇧 Reino Unido', 'https://corporate.com', 'Conectado'],
    ['33601234567', 'Marie Dubois', 'Atención al Cliente', '📞 Servicio 24h', 'marie@example.com', '🇫🇷 Francia', 'https://contact.com', 'Ocupado'],
    ['4915123456789', 'Hans Müller', 'Desarrollador', '💻 Software', 'hans@example.com', '🇩🇪 Alemania', 'https://devworld.com', 'Sin Biografía'],
    ['81234567890', 'Akira Tanaka', 'Marketing', '📈 Estrategias', 'akira@example.com', '🇯🇵 Japón', 'https://marketingpro.com', 'Disponible'],
    ['821012345678', 'Kim Ji-hoon', 'Ingeniero', '🔧 Proyectos', 'kim@example.com', '🇰🇷 Corea del Sur', 'https://techsolutions.com', 'En Reunión'],
    ['391234567890', 'Giuseppe Rossi', 'Ventas', '🛒 Comercio', 'giuseppe@example.com', '🇮🇹 Italia', 'https://sales.com', 'Sin Biografía'],
    ['341234567890', 'Luis García', 'Atención al Cliente', '📞 24/7', 'luis@example.com', '🇪🇸 España', 'https://soporteesp.com', 'Ocupado'],
    ['12123456789', 'Michael Johnson', 'Director', '📊 Finanzas', 'michael@example.com', '🇺🇸 EE.UU.', 'https://finanzas.com', 'Disponible'],
    ['5512998765432', 'Beatriz Lima', 'Soporte Técnico', '📡 Telecom', 'beatriz@example.com', '🇧🇷 Brasil', 'https://telcom.com', 'Sin Biografía'],
    ['66123456789', 'Nattapong Wong', 'Gerente', '🏢 Empresa X', 'nattapong@example.com', '🇹🇭 Tailandia', 'https://empresax.com', 'Conectado'],
    ['541198765432', 'Martín Fernández', 'CEO', '🏦 Negocios', 'martin@example.com', '🇦🇷 Argentina', 'https://negocios.com', 'Disponible'],
    ['23123456789', 'Kwame Mensah', 'Desarrollador', '💻 IT', 'kwame@example.com', '🇬🇭 Ghana', 'https://techghana.com', 'Sin Biografía'],
    ['21123456789', 'Amina Diallo', 'Atención al Cliente', '📞 24h', 'amina@example.com', '🇸🇳 Senegal', 'https://atencionsn.com', 'Ocupado'],
    ['25123456789', 'Yared Tesfaye', 'Marketing', '📊 Estrategia', 'yared@example.com', '🇪🇹 Etiopía', 'https://marketinget.com', 'Disponible'],
    ['351234567890', 'Diogo Silva', 'Ventas', '🛒 Comercio', 'diogo@example.com', '🇵🇹 Portugal', 'https://ventas.com', 'Sin Biografía'],
    ['60123456789', 'Muhammad Hafiz', 'Soporte', '🔧 Reparaciones', 'hafiz@example.com', '🇲🇾 Malasia', 'https://techfix.com', 'Conectado'],
    ['441234567890', 'Sophia Williams', 'Asistente', '📌 UK', 'sophia@example.com', '🇬🇧 Reino Unido', 'https://asistentes.com', 'Ocupado'],
  ];

  // Enviar contactos
  await sendContactArray(conn, m.chat, contactos, m);
};

handler.help = ['docente', 'numdoc'];
handler.tags = ['info'];
handler.command = /^(numdoc|docente)$/i;
export default handler;

// Función para enviar múltiples contactos
async function sendContactArray(conn, jid, data, quoted, options) {
  if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data];
  let contacts = [];
  for (let [number, name, org, label, email, region, website, status] of data) {
    number = number.replace(/[^0-9]/g, '');
    let njid = number + '@s.whatsapp.net';
    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:${name.replace(/\n/g, '\\n')}
item.ORG:${org}
item1.TEL;waid=${number}:${new PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${label}
item2.EMAIL;type=INTERNET:${email}
item2.X-ABLabel:📧 Email
item3.ADR:;;${region};;;;
item3.X-ABADR:ac
item3.X-ABLabel:🏷 Region
item4.URL:${website}
item4.X-ABLabel:Website
item5.X-ABLabel:${status}
END:VCARD`.trim();
    contacts.push({ vcard, displayName: name });
  }
  return await conn.sendMessage(jid, {
    contacts: {
      displayName: (contacts.length > 1 ? `${contacts.length} contactos` : contacts[0].displayName) || null,
      contacts,
    }
  }, { quoted, ...options });
}
