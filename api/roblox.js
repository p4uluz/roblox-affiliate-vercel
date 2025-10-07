export default async function handler(req, res) {
  try {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const webhook = process.env.DISCORD_WEBHOOK;
    if (!webhook) return res.status(500).json({ error: "Missing DISCORD_WEBHOOK" });

    const data = req.body;
    const embed = {
      username: "💰 Roblox Affiliate Tracker",
      avatar_url: "https://tr.rbxcdn.com/3b62a0b12efb6a65aa4cb58c4e7dffb3/150/150/Image/Png",
      embeds: [{
        title: `🛍️ ${data.username} baru saja beli ${data.itemName}`,
        color: 0x00ff00,
        fields: [
          { name: "💵 Harga", value: `${data.price} R$`, inline: true },
          { name: "💸 Cashback (40%)", value: `${data.cashback} Robux`, inline: true },
          { name: "🏆 Komisi Kamu (10%)", value: `${data.komisi} Robux`, inline: true },
          { name: "📊 Total Belanja", value: `${data.totalSpent} Robux`, inline: true },
          { name: "💰 Total Cashback", value: `${data.totalCashback} Robux`, inline: true },
          { name: "👑 Total Komisi", value: `${data.totalKomisi} Robux`, inline: true },
        ],
        footer: { text: "💸 Roblox Affiliate Tracker System" },
      }]
    };

    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(embed),
    });

    return res.status(200).json({ status: "✅ Sent to Discord" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
