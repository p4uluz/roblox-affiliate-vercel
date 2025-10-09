import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST method" });
  }

  try {
    const data = req.body;
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      return res.status(500).json({ error: "Webhook not set in environment variables" });
    }

    const embed = {
      embeds: [
        {
          title: "🛍️ Roblox Purchase Detected!",
          description: `${data.username} membeli **${data.itemName}** lewat map kamu!`,
          color: 0x00ff00,
          fields: [
            { name: "💰 Harga", value: `${data.price} R$`, inline: true },
            { name: "💸 Cashback (40%)", value: `${data.cashback} R$`, inline: true },
            { name: "🏆 Komisi Kamu (10%)", value: `${data.komisi} R$`, inline: true },
            { name: "🧍 User ID", value: `${data.userId}`, inline: false },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(embed),
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
