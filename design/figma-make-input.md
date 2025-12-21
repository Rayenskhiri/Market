# Figma Make Input — Controlled Admin-Gated Marketplace

Stop. This is NOT an open marketplace. Build a prototype with STRICT ROLE SEPARATION: Consumer (public browse & buy only), Producer (private — request or admin-created, cannot publish), Admin (gatekeeper: approve producers & products).

Required pages: 00-README, 01-Design-System, 02-Components, 03-Mobile-Flows, 04-Desktop-Flows, 05-Localization, 06-Handoff-API.

Key flows to prototype:
- Producer Request Access -> Pending -> Admin Approve -> Producer activated
- Producer Add Product -> Save Draft / Submit for Review (PENDING) -> Admin Approve (APPROVED) -> Product visible to consumers

Do NOT include public seller signup or publish actions for producers. Include microcopy in FR & AR & AR_LATN. Add annotated API overlay on approve/reject actions (POST /admin/products/{id}/approve etc.).
