// ✅ test.js
// Jalankan di terminal pakai: node test.js
// Pastikan Node.js versi 18 ke atas (karena pakai fetch bawaan)

// Ganti URL ini kalau project Vercel lo beda
const ENDPOINT_URL = "https://roblox-affiliate-vercel.vercel.app/api/roblox";

// Payload simulasi pembelian Roblox (dummy data)
const payload = {
  username: "TesterUser",
  userId: 999999,
  itemName: "TEST_DOMINUS",
  price: 1000,
  cashback: 300,
  totalSpent: 4500,
  totalCashback: 1350,
  allTimeSpent: 14500,
  allTimeCashback: 4350,
  month: "Oktober 2025",
  time: Math.floor(Date.now() / 1000)
};

async function testWebhook() {
  console.log("🚀 Mengirim test payload ke:", ENDPOINT_URL);
  console.log("📦 Payload:", payload);

  try {
    const res = await fetch(ENDPOINT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const text = await res.text();
    console.log("✅ Status:", res.status, res.statusText);
    console.log("🧾 Response:", text);
  } catch (err) {
    console.error("❌ Gagal mengirim request:", err);
  }
}

testWebhook();
