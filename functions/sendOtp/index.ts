// Edge Function: sendOtp
import fetch from 'node-fetch';
import crypto from 'crypto';

export async function handler(req: Request) {
  const body = await req.json();
  const phone = body.phone;
  const purpose = body.purpose || 'signup';
  if (!phone) return new Response(JSON.stringify({ error: 'phone_required' }), { status: 400 });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const hash = crypto.createHash('sha256').update(code + (process.env.OTP_SALT||'')).digest('hex');

  // Store hashed code via Supabase REST (service role) - simplified example
  await fetch(`${process.env.SUPABASE_URL}/rest/v1/phone_otps`, {
    method: 'POST',
    headers: {
      'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY || '',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify([{ phone, code_hash: hash, purpose, expires_at: new Date(Date.now()+5*60*1000).toISOString() }])
  });

  // Send SMS via Twilio (server side)
  await fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_SID}/Messages.json`, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${process.env.TWILIO_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({ From: process.env.TWILIO_FROM||'', To: phone, Body: `Votre code: ${code} (valable 5 min)` })
  });

  return new Response(JSON.stringify({ status: 'otp_sent' }), { status: 200 });
}
