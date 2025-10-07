export default async function handler(req, res) {
  try {
    // Untuk request GET (cek status)
    if (req.method !== "POST") {
      return res
        .status(200)
        .json({ status: "✅ Roblox Affiliate Webhook Active" });
    }

    // Parsing body agar tidak undefined
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

    // Buat embed Discord
    const embed = {
      embeds: [
        {
          title: "🛍️ Roblox Purchase Detected!",
          description: `${data.username || "Unknown"} membeli **${data.itemName || "Unknown Item"}**`,
          color: 0x00ff00,
          fields: [
            { name: "💰 Harga", value: `${data.price || 0} Robux`, inline: true },
            { name: "💸 Cashback (40%)", value: `${data.cashback || 0} Robux`, inline: true },
            { name: "🏆 Komisi Kamu (10%)", value: `${data.komisi || 0} Robux`, inline: true },
            { name: "🧍 User ID", value: `${data.userId || "N/A"}`, inline: false },
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
