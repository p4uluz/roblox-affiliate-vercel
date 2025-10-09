export default async function handler(req, res) {
  try {
    // Cek GET request → untuk test status
    if (req.method !== "POST") {
      return res
        .status(200)
        .json({ status: "✅ Roblox Affiliate Webhook Active" });
    }

    // Parsing body
    let data;
    try {
      data = typeof req.body === "object" ? req.body : JSON.parse(req.body || "{}");
    } catch (err) {
      console.error("Invalid JSON body:", err);
      return res.status(400).json({ error: "Invalid JSON" });
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("❌ ENV variable DISCORD_WEBHOOK_URL belum diatur!");
      return res.status(500).json({ error: "Webhook URL not configured" });
    }

    // Embed Discord (rapih, sesuai script terbaru kamu)
    const embed = {
      embeds: [
        {
          title: "🛍️ Avatar Item Purchased",
          description: `${data.username || "Unknown"} baru saja membeli **${data.itemName || "Unknown Item"}** lewat map SHOP IN HERE`,
          color: 0x00ff00,
          fields: [
            { name: "🧑 Pemain", value: data.username || "Unknown", inline: true },
            { name: "🎁 Item", value: data.itemName || "Unknown Item", inline: true },
            { name: "💵 Harga Item", value: `${data.price || 0} Robux`, inline: true },
            { name: "💸 Cashback (30%)", value: `${data.cashback || 0} Robux`, inline: true },
            { name: "📊 Total Belanja", value: `${data.totalSpent || 0} Robux`, inline: true },
            { name: "💰 Total Cashback", value: `${data.totalCashback || 0} Robux`, inline: true },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    // Kirim ke Discord
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(embed),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("❌ Gagal kirim ke Discord:", text);
      return res.status(500).json({ error: "Failed to send to Discord" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("🔥 Internal error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
