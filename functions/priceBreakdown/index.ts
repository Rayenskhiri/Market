export async function handler(req: Request) {
  const url = new URL(req.url);
  const product_id = url.searchParams.get('product_id');
  const quantity = parseInt(url.searchParams.get('quantity') || '1');
  if (!product_id) return new Response(JSON.stringify({ error: 'product_id required' }), { status: 400 });

  // Fetch product data from Supabase REST
  const prodRes = await fetch(`${process.env.SUPABASE_URL}/rest/v1/products?id=eq.${product_id}&select=*`, {
    headers: { 'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY || '' }
  });
  const [product] = await prodRes.json();
  if (!product) return new Response(JSON.stringify({ error: 'not_found' }), { status: 404 });

  const production_cost = parseFloat(product.production_cost) * quantity;
  const transport_cost = parseFloat(product.transport_cost || 0) * quantity;
  const platform_fee = parseFloat(product.platform_fee || 0) * quantity;
  const subtotal = production_cost + transport_cost + platform_fee;

  const breakdown = [
    { key: 'production_cost', label_fr: 'Coût de production', label_ar: 'تكلفة الإنتاج', amount: production_cost },
    { key: 'transport_cost', label_fr: 'Coût du transport', label_ar: 'تكلفة النقل', amount: transport_cost },
    { key: 'platform_fee', label_fr: 'Frais de la plateforme', label_ar: 'رسوم المنصة', amount: platform_fee }
  ];

  return new Response(JSON.stringify({ product_id: Number(product_id), quantity, breakdown, subtotal, total: subtotal, currency: product.currency || 'TND' }), { status: 200 });
}
