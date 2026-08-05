# 3A Softwares

The 3A Softwares marketing website — built with Next.js (App Router), Tailwind CSS, MongoDB (Mongoose), and a Razorpay-powered ₹99 booking flow.

## Stack

- **Next.js** (App Router) — pages and API routes in one project
- **Tailwind CSS** for styling
- **MongoDB + Mongoose** for storing bookings, payments, webhooks, and contact/demo leads
- **Razorpay Orders + Checkout + Webhooks** for the ₹99 booking payment flow

## Local setup

1. Install dependencies:
   ```
   npm install
   ```
2. Copy `.env.example` to `.env.local` and fill in real values.
3. Run the dev server:
   ```
   npm run dev
   ```
   Visit http://localhost:3000.

## Environment variables

See `.env.example` for the full list. You'll need:

- `MONGODB_URI` — a MongoDB connection string (e.g. MongoDB Atlas)
- `RAZORPAY_KEY_ID` — server Razorpay key id
- `RAZORPAY_KEY_SECRET` — server Razorpay secret
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` — public Razorpay key id used by checkout

Never commit `.env.local` — it's gitignored.

## Booking / payment flow

Clicking "Get Started" on any pricing plan opens a checkout modal collecting name/email/phone, then charges a flat **₹99 refundable booking fee** via Razorpay (regardless of the plan's listed price) to reserve a project slot. The flow:

1. `POST /api/payment/create-order` validates plan and user input, creates a Razorpay order, and stores a `Payment` document with `PENDING` status.
2. Client opens Razorpay Checkout using the created `orderId`.
3. `POST /api/payment/verify` verifies signature server-side using HMAC SHA256 and marks payment `SUCCESS` or `FAILED`.
4. On success, a `Booking` document is created with:
   - `status = BOOKED`
   - `bookingAmount = 9900` (₹99 in paise)
   - `remainingAmount = full plan price - 99` (when numeric plan price is available)
5. `POST /api/payment/webhook` handles `payment.captured`, `payment.failed`, and `order.paid` idempotently.

Contact and Get-Demo form submissions are stored as `Lead` rows in the same database (`/api/contact`, `/api/demo-request`).

## Deployment

Deploys to Vercel. Set the environment variables above in the Vercel project settings and configure Razorpay webhook to:

- `https://<your-domain>/api/payment/webhook`

For local webhook testing, use Razorpay CLI or tunneling and point webhook URL to your public tunnel.
