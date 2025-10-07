import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    // Kalau diakses dengan GET atau browser, bisa dikembalikan pesan status aktif
    return res.status(200).json({ status: "✅ Roblox Affiliate Webhook Active" });
  }

  try {
    const data = req.body;
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("DISCORD_WEBHOOK_URL not set");
      return res.status(500).json({ error: "Webhook URL not configured" });
    }

    // Bisa validasi data.body apakah mengandung username, itemName, price, dsb
    // contohnya:
    if (!data.username || !data.itemName) {
      console.error("Invalid payload:", data);
      return res.status(400).json({ error: "Invalid payload" });
    }

    const embed = {
      embeds: [
        {
          title: "🛍️ Roblox Purchase Detected!",
          description: `${data.username} membeli **${data.itemName}** lewat map kamu!`,
          color: 0x00ff00,
          fields: [
            { name: "💰 Harga", value: `${data.price} Robux`, inline: true },
            { name: "💸 Cashback (40%)", value: `${data.cashback} Robux`, inline: true },
            { name: "🏆 Komisi Kamu (10%)", value: `${data.komisi} Robux`, inline: true },
            { name: "🧍 User ID", value: `${data.userId}`, inline: false }
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const resp = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(embed),
    });

    if (!resp.ok) {
      console.error("Discord webhook failed:", await resp.text());
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Internal error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
