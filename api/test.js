import fetch from "node-fetch";

export default async function handler(req, res) {
  // Dummy data untuk testing
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
    username: "💰 Roblox Cashback Tracker",
    // avatar_url: "https://i.imgur.com/xyz123.png", // opsional: pasang logo custom
    embeds: [
      {
        title: `🛒 ${data.username} baru saja melakukan pembelian (TEST)!`,
        color: 3066993, // hijau biar beda sama real
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

    return res.status(200).json({ ok: true, message: "Dummy embed terkirim ke Discord" });
  } catch (err) {
    console.error("Error sending to Discord:", err);
    return res.status(500).json({ error: "Gagal kirim ke Discord" });
  }
}
