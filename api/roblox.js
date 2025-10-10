import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const data = req.body;

  const embed = {
    username: "💰 Roblox Cashback Tracker", // << ganti nama pengirim di Discord
    // avatar_url: "https://imgur.com/a/2e2wbti", // (opsional) bisa tambahin logo sendiri
    embeds: [
      {
        title: `🛒 ${data.username} baru saja melakukan pembelian!`,
        color: 16766720, // oranye
        fields: [
          { name: "📦 Item", value: `${data.itemName}`, inline: false },
          { name: "💰 Harga", value: `${data.price} Robux`, inline: true },
          { name: "💸 Cashback", value: `${data.cashback} Robux`, inline: true },
          { 
            name: "📊 Bulan Ini", 
            value: `Total: ${data.totalSpent} Robux\nCashback: ${data.totalCashback} Robux`, 
            inline: false 
          },
          { 
            name: "🌐 All Time", 
            value: `Total: ${data.allTimeSpent} Robux\nCashback: ${data.allTimeCashback} Robux`, 
            inline: false 
          }
        ],
        footer: { text: `Cashback Sistem • Periode: ${data.month}` },
        timestamp: new Date(data.time * 1000).toISOString()
      }
    ]
  };

  try {
    await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(embed)
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Error sending to Discord:", err);
    return res.status(500).json({ error: "Failed to send to Discord" });
  }
}
