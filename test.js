// ✅ api/test.js
// Endpoint buat test manual — kirim dummy embed ke Discord
// Akses dari browser: https://roblox-affiliate-vercel.vercel.app/api/test

export default async function handler(req, res) {
  // Dummy data buat simulasi pembelian
  const data = {
    username: "DummyTester",
    userId: 111111,
    itemName: "Test Sword",
    price: 100,
    cashback: 30,
    totalSpent: 200,
    totalCashback: 60,
    allTimeSpent: 800,
    allTimeCashback: 240,
    month: "October 2025",
    time: Math.floor(Date.now() / 1000)
  };

  const embed = {
    username: "💰 Roblox Cashback Tracker (TEST)",
    embeds: [
      {
        title: `🧪 ${data.username} baru saja melakukan pembelian (TEST)!`,
        color: 0x2ecc71, // hijau biar beda dari real
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
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return res.status(500).json({ error: "Missing DISCORD_WEBHOOK_URL" });
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(embed)
    });

    if (!response.ok) {
      const txt = await response.text();
      console.error("Discord error:", txt);
      return res.status(502).json({ error: "Failed to send to Discord", details: txt });
    }

    return res.status(200).json({ ok: true, message: "✅ Dummy embed terkirim ke Discord" });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Gagal kirim ke Discord" });
  }
}
