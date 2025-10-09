export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ status: "✅ Roblox Affiliate Webhook Active" });
  }

  try {
    const data = typeof req.body === "object" ? req.body : JSON.parse(req.body || "{}");
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      return res.status(500).json({ error: "Webhook not set" });
    }

    const embed = {
      username: "💰 Roblox Affiliate Tracker",
      avatar_url: "https://tr.rbxcdn.com/3b62a0b12efb6a65aa4cb58c4e7dffb3/150/150/Image/Png",
      embeds: [
        {
          title: "🛍️ Avatar Item Purchased",
          description: `${data.username} baru saja membeli **${data.itemName}** lewat map SHOP IN HERE`,
          color: 0x00ff00,
          fields: [
            { name: "🧑 Pemain", value: data.username, inline: true },
            { name: "🎁 Item", value: data.itemName, inline: true },
            { name: "💵 Harga Item", value: `${data.price} Robux`, inline: true },
            { name: "💸 Cashback (30%)", value: `${data.cashback} Robux`, inline: true },
            { name: "📊 Total Belanja", value: `${data.totalSpent} Robux`, inline: true },
            { name: "💰 Total Cashback", value: `${data.totalCashback} Robux`, inline: true },
          ],
          timestamp: new Date(data.time * 1000).toISOString(),
          thumbnail: {
            url: "https://cdn3.emoji.gg/emojis/8771-robux.png",
          },
          footer: {
            text: "💸 Cashback Tracker System",
          },
        },
      ],
    };

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(embed),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
