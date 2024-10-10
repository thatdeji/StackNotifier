import { NextResponse } from "next/server";
import crypto from "crypto";
import { NextRequest } from "next/server";
import formData from "form-data";
import Mailgun from "mailgun.js";

// Ensure you have your secret key and email credentials in the environment variables
const secret = process.env.PAYSTACK_SECRET_KEY as string;
const mailgunApiKey = process.env.MAILGUN_API_KEY as string;
const mailgunDomain = process.env.MAILGUN_DOMAIN as string;
console.log(mailgunApiKey);

// Setup Mailgun client
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: "api", key: mailgunApiKey });

export async function POST(req: NextRequest) {
  try {
    // Get the request body as a JSON object
    const body = await req.json();

    // Generate the HMAC-SHA512 hash using the secret key and the request body
    const hash = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(body))
      .digest("hex");

    // Retrieve the x-paystack-signature from the request headers
    const signature = req.headers.get("x-paystack-signature");

    if (hash === signature) {
      // The event is validated
      const event = body;
      const customerEmail = event?.data?.customer?.email;

      if (customerEmail) {
        // Compose the email using Mailgun SDK
        const mailOptions = {
          from: `Your Company <mailgun@${mailgunDomain}>`,
          to: [customerEmail], // Send email to the customer email from the event data
          subject: `Payment Event Notification - ${event.event}`,
          text: `Dear customer, \n\nWe have received an event from Paystack regarding your subscription.\n\nEvent: ${event.event}\n\nBest regards,\nYour Company.`,
          html: `<p>Dear customer,</p><p>We have received an event from Paystack regarding your subscription.</p><p><strong>Event:</strong> ${event.event}</p><p>Best regards,<br>Your Company</p>`,
        };

        // Send the email using Mailgun
        const response = await mg.messages.create(mailgunDomain, mailOptions);
        console.log(`Email sent:`, response);
      }

      // Return a 200 response to indicate success
      return NextResponse.json({ status: "success" }, { status: 200 });
    } else {
      // Return a 400 response if the signature doesn't match
      return NextResponse.json(
        { status: "invalid signature" },
        { status: 400 }
      );
    }
  } catch (error) {
    // Catch any errors during the process and return a 500 response
    console.error("Error processing webhook:", error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
