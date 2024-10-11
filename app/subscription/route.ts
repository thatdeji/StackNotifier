import { NextResponse } from "next/server";
import crypto from "crypto";
import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { getReminders } from "../actions";

const secret = process.env.PAYSTACK_SECRET_KEY as string;
const mailUser = process.env.MAIL_USER as string;
const mailPass = process.env.MAIL_PASS as string;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: mailUser,
    pass: mailPass,
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Generate the HMAC-SHA512 hash using the secret key and the request body
    const hash = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(body))
      .digest("hex");

    const signature = req.headers.get("x-paystack-signature");

    if (hash === signature) {
      const event = body;
      const customerEmail = event?.data?.customer?.email;

      console.log(event);

      const reminders = await getReminders();

      const reminder = reminders?.find(
        (reminder) => reminder.event === event.event
      );

      console.log(reminder);

      if (reminder && customerEmail) {
        const mailOptions: Mail.Options = {
          from: `Your Company <noreply@${mailUser}>`,
          to: customerEmail,
          subject: `Payment Event Notification - ${event.event}`,
          html: reminder.template?.template || "",
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${customerEmail}`);
      }

      return NextResponse.json({ status: "success" }, { status: 200 });
    } else {
      return NextResponse.json(
        { status: "invalid signature" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
