eksplode DAC frontend

Overview

This repository contains the frontend for the Eksplode DAC project.
All changes are deployed automatically to Vercel.

Deployment

Your project is live at:

https://eksplode.vercel.app/

Features Implemented
Authentication & User Management

Implemented register/login with JWT or session-based authentication.

Enforced role-based access on API routes.

User profile and payment profile can be successfully updated.

Full auth flow deployed on staging.

Merchant & User Dashboards

Merchant dashboard allows creation, editing, and deletion of products and rewards.

User dashboard shows pending → available reward lifecycle.

Dashboards fully functional with role-specific access.

Product & Sharing

Public product catalog with detailed product pages.

Implemented share link & QR code generation using HMAC signatures.

Verified share → click attribution is correctly recorded in the database.

Payments & Orders

Stripe Checkout integration with webhooks in test mode.

Orders and reward allocations are recorded correctly.

Verified webhook event flow end-to-end.

How It Works

Create and modify your project.

Deploy changes to Vercel.

Users and merchants can access their dashboards according to role.

Orders, rewards, and shares are tracked automatically.
