// ✅ Drip2Earn Affiliate API - Final Version
// Menerima payload dari Roblox lalu kirim embed ke Discord

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    if (!data || !data.username || !data.itemName) {
      return res.status(400).json({ error: "Invalid or incomplete data payload" });
    }

    const embed = {
      username: "💰 Roblox Cashback Tracker",
      embeds: [
        {
          title: `🛒 ${data.username} baru saja melakukan pembelian!`,
          color: 0x9b59b6, // ungu khas Drip2Earn
          fields: [
            { name: "📦 Item", value: data.itemName, inline: false },
            { name: "💰 Harga", value: `${data.price || 0} Robux`, inline: true },
            { name: "💸 Cashback", value: `${data.cashback || 0} Robux`, inline: true },
            {
              name: "📊 Bulan Ini",
              value: `Total: ${data.totalSpent || 0} Robux\nCashback: ${data.totalCashback || 0} Robux`,
              inline: false
            },
            {
              name: "🌐 All Time",
              value: `Total: ${data.allTimeSpent || 0} Robux\nCashback: ${data.allTimeCashback || 0} Robux`,
              inline: false
            }
          ],
          footer: { text: `Cashback Sistem • Periode: ${data.month || "N/A"}` },
          timestamp: new Date((data.time || Date.now() / 1000) * 1000).toISOString()
        }
      ]
    };

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("❌ Missing DISCORD_WEBHOOK_URL in environment variables");
      return res.status(500).json({ error: "Missing Discord webhook URL" });
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(embed)
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Discord API Error:", text);
      return res.status(502).json({ error: "Failed to send to Discord", details: text });
    }

    return res.status(200).json({ ok: true, sent: true });
  } catch (err) {
    console.error("🔥 Error sending to Discord:", err);
    return res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}
