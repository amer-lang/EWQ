# 🚀 Quiz Funnel — Stripe Deployment Guide

## What's in this folder

```
quiz-funnel/
├── index.html          ← Your quiz funnel (the main page people see)
├── api/
│   ├── create-payment.js   ← Handles the $20 checkout
│   └── charge-upsell.js    ← Handles one-click upsell charges
├── package.json        ← Tells Vercel to install Stripe
└── README.md           ← This file (you're reading it!)
```

---

## Step-by-Step Deployment

### 1. Get your Stripe keys
1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy your **Publishable key** (`pk_test_...`)
3. Copy your **Secret key** (`sk_test_...`)

### 2. Add your Publishable key to index.html
Open `index.html` and find this line:
```
var stripe = Stripe('pk_test_REPLACE_WITH_YOUR_PUBLISHABLE_KEY');
```
Replace `pk_test_REPLACE_WITH_YOUR_PUBLISHABLE_KEY` with your actual publishable key.

### 3. Push to GitHub
1. Go to https://github.com → click **New Repository**
2. Name it `quiz-funnel` → click **Create**
3. Upload all the files from this folder (drag & drop works)

### 4. Deploy on Vercel
1. Go to https://vercel.com → sign up with GitHub
2. Click **"Add New" → "Project"**
3. Select your `quiz-funnel` repo
4. **IMPORTANT** — Before clicking Deploy, click **"Environment Variables"**
5. Add this variable:
   - **Name:** `STRIPE_SECRET_KEY`
   - **Value:** `sk_test_...` (your secret key)
6. Click **Deploy**

### 5. Test it!
- Vercel gives you a URL like `https://quiz-funnel.vercel.app`
- Go through the quiz until you reach the checkout
- Use test card: `4242 4242 4242 4242` / any future date / any CVC
- Check your Stripe dashboard → Payments to see it appear!

---

## Going Live (When ready for real money)

1. In Stripe dashboard, toggle OFF "Test mode" (top right)
2. Copy your **LIVE** keys (`pk_live_...` and `sk_live_...`)
3. Update `index.html` with your live publishable key
4. In Vercel → Project Settings → Environment Variables → update `STRIPE_SECRET_KEY` to your live secret key
5. Redeploy

---

## Test Card Numbers
| Card | Result |
|------|--------|
| 4242 4242 4242 4242 | ✅ Success |
| 4000 0000 0000 0002 | ❌ Declined |
| 4000 0025 0000 3155 | 🔐 Requires 3D Secure |

Use any future expiry date and any 3-digit CVC.
