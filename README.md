# Roblox Affiliate Tracker (Vercel Edition)

Serverless endpoint untuk mengirim data pembelian Roblox (Avatar Shop, Bundle, DeveloperProduct) ke Discord Webhook secara otomatis dan 24 jam aktif.

## 🔧 Cara pakai
1. Deploy ke Vercel
2. Tambahkan environment variable:
   - `DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...`
3. Gunakan URL Vercel hasil deploy sebagai webhook endpoint di script Roblox kamu.
