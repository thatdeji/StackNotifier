# StackNotifier

StackNotifier is a web application built using Next.js, Supabase, TailwindCSS (along with ShadCN UI components), and Nodemailer. It provides features like email notifications for user events, subscriptions, and more.

## Technologies Used

- **Next.js** - For the frontend and API routes.
- **Supabase** - For managing the backend database and handling authentication.
- **TailwindCSS + ShadCN** - For designing and styling the UI components.
- **Nodemailer** - For sending email notifications to users.

## Features

- Subscription management and notifications (welcome emails, cancellations, renewals, etc.).
- Easy email templating with dynamic variable replacements.
- API integration with Paystack for handling payment notifications.
- Clean and responsive UI design powered by TailwindCSS and ShadCN.

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-repo-url.git
cd stacknotifier
```

### 2. Install dependencies

```bash
yarn add
```

### 3. Set up environment variables

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
PAYSTACK_SECRET_KEY=your-paystack-secret-key
MAIL_USER=your-email
MAIL_PASS=your-email-password
```

### 4. Gmail Setup for Nodemailer

To send emails using Nodemailer with Gmail, follow these steps:

1. **Enable 2-Step Verification on your Google account**:

   - Go to your [Google Account Security Settings](https://myaccount.google.com/security).
   - Under the "Signing in to Google" section, enable **2-Step Verification**.

2. **Generate an App Password**:
   - Once 2-Step Verification is enabled, return to your [Google Account Security Settings](https://myaccount.google.com/security).
   - Under the "Signing in to Google" section, select **App Passwords**.
   - Select "Mail" as the app and "Other" for the device name, then generate a password.
   - Use this generated password as your `MAIL_PASS` in the environment variables.

### 5. Run the development server

```bash
yarn dev
```
