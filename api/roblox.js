// ✅ api/roblox.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    username,
    userId,
    itemName,
    price,
    cashback,
    komisi,
    totalSpent,
    totalCashback,
    totalKomisi,
    time,
  } = req.body;

  const webhook = process.env.DISCORD_WEBHOOK;
  if (!webhook) {
    return res.status(400).json({ error: "Missing DISCORD_WEBHOOK" });
  }

  const embed = {
    username: "💰 Roblox Affiliate Tracker",
    avatar_url:
      "https://tr.rbxcdn.com/3b62a0b12efb6a65aa4cb58c4e7dffb3/150/150/Image/Png",
    embeds: [
      {
        title: `🛍️ ${username} baru saja membeli **${itemName}**`,
        color: 0x00ff00,
        fields: [
          { name: "👤 Pemain", value: `${username} (\`${userId}\`)`, inline: true },
          { name: "💵 Harga", value: `${price} Robux`, inline: true },
          { name: "💸 Cashback (40%)", value: `${cashback} Robux`, inline: true },
          { name: "🏆 Komisi Kamu (10%)", value: `${komisi} Robux`, inline: true },
          { name: "📊 Total Belanja", value: `${totalSpent} Robux`, inline: true },
          { name: "💰 Total Cashback", value: `${totalCashback} Robux`, inline: true },
          { name: "👑 Total Komisi", value: `${totalKomisi} Robux`, inline: true },
        ],
        footer: {
          text: `💸 Cashback System | ${time}`,
        },
        thumbnail: {
          url: "https://cdn3.emoji.gg/emojis/8771-robux.png",
        },
      },
    ],
  };

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(embed),
    });

    return res.status(200).json({ status: "✅ Webhook terkirim ke Discord" });
  } catch (err) {
    console.error("Gagal kirim webhook:", err);
    return res.status(500).json({ error: "Gagal kirim ke Discord" });
  }
}
