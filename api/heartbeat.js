export default async function handler(req, res) {
  const webhook = process.env.DISCORD_WEBHOOK; // ambil dari env variable kamu

  if (!webhook) {
    return res.status(500).json({ error: "Missing DISCORD_WEBHOOK" });
  }

  const now = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
  });

  // buat embed heartbeat
  const embed = {
    username: "Affiliate Heartbeat 💓",
    embeds: [
      {
        title: "💓 Affiliate Bot Heartbeat",
        description: "Server aktif & siap menerima transaksi!",
        color: 0x00ff7f,
        fields: [
          {
            name: "Status",
            value: "✅ Aktif",
            inline: true,
          },
          {
            name: "Waktu",
            value: now,
            inline: true,
          },
        ],
        footer: {
          text: "Drip2Earn Affiliate System | Auto Heartbeat",
        },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  // kirim ke Discord
  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(embed),
  });

  return res.status(200).json({ status: "✅ Heartbeat sent" });
}
