# Web Frontend Starter

This project uses Vite + React + Tailwind + react-i18next and integrates with Supabase.

Setup:
1. Copy environment variables into .env: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
2. Install deps: npm install
3. Start: npm run dev

Notes:
- Ensure Supabase tables are created by running infra/supabase/schema.sql in your Supabase SQL editor.
- Deploy Edge functions under /functions using your cloud provider or Supabase Edge Functions.
