import fetch from 'node-fetch';
import crypto from 'crypto';

export async function handler(req: Request) {
  const body = await req.json();
  const { phone, code } = body;
  if (!phone || !code) return new Response(JSON.stringify({ error: 'missing' }), { status: 400 });

  const hash = crypto.createHash('sha256').update(code + (process.env.OTP_SALT||'')).digest('hex');

  // Query Supabase phone_otps for a match
  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/phone_otps?phone=eq.${encodeURIComponent(phone)}&code_hash=eq.${hash}`, {
    headers: { 'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY || '' }
  });
  const rows = await res.json();
  if (!rows || rows.length === 0) return new Response(JSON.stringify({ error: 'invalid_code' }), { status: 400 });

  // At this point, create or get user via Supabase Admin API and issue JWT (implementation depends on setup)
  return new Response(JSON.stringify({ status: 'verified' }), { status: 200 });
}
