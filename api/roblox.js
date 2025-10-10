import fetch from "node-fetch"; // kalau pakai node-fetch, jangan lupa package.json ada "type":"module"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const data = req.body;

  const embed = {
    embeds: [
      {
        title: `🛒 ${data.username} baru saja melakukan pembelian!`,
        color: 16766720,
        fields: [
          { name: "Item", value: `${data.itemName} (${data.price} Robux)`, inline: false },
          { name: "Cashback", value: `${data.cashback} Robux`, inline: true },
          { name: "Total Bulan Ini", value: `${data.totalSpent} Robux`, inline: true },
          { name: "Cashback Bulan Ini", value: `${data.totalCashback} Robux`, inline: true },
          { name: "Total All Time", value: `${data.allTimeSpent} Robux`, inline: true },
          { name: "Cashback All Time", value: `${data.allTimeCashback} Robux`, inline: true }
        ],
        footer: { text: `Affiliate Tracker • Periode: ${data.month}` },
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

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Error sending to Discord:", err);
    return res.status(500).json({ error: "Failed to send to Discord" });
  }
}
