import fetch from 'node-fetch';

export async function handler(req: Request) {
  const body = await req.json();
  const { order_id } = body;
  if (!order_id) return new Response(JSON.stringify({ error: 'order_id required' }), { status: 400 });

  // Fetch order details
  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/orders?id=eq.${order_id}&select=*`, { headers: { 'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY || '' } });
  const [order] = await res.json();
  if (!order) return new Response(JSON.stringify({ error: 'order_not_found' }), { status: 404 });

  const message = `Votre commande ${order_id} est confirmée. Suivez: ${process.env.APP_URL}/track/${order_id}`;

  // Send via Twilio
  await fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_SID}/Messages.json`, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${process.env.TWILIO_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({ From: process.env.TWILIO_FROM||'', To: order.phone, Body: message })
  });

  return new Response(JSON.stringify({ status: 'sent' }), { status: 200 });
}
