# Approval Model — Controlled Marketplace

Overview:
- Producers cannot self-publish. Accounts must be created by admin or requested and manually approved.
- Products created by producers remain in status 'draft' or 'pending' and are not visible to consumers until admin approves them.

Visibility rule:
- Consumers see products only when product.status = 'approved' AND producer.role_status = 'active'.

Admin responsibilities:
- Approve/reject producer requests
- Approve/reject product submissions
- Manage platform fees, delivery districts, and moderation

Security:
- Enforce via RLS policies and admin JWT claim (is_admin)
