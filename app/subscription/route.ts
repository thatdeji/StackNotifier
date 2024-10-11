import { NextResponse } from "next/server";
import crypto from "crypto";
import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { addLog, getReminders } from "../actions";
import { formatDate, replaceTemplateVariables } from "@/utils/utils";

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

      const reminders = await getReminders();

      const reminder = reminders?.reminders?.find(
        (reminder) => reminder.event === event.event
      );

      if (reminder && customerEmail) {
        const htmlVars = {
          customer_name: `${event?.data?.customer?.first_name} ${event?.data?.customer?.last_name}`,
          amount: event?.data?.amount?.toLocaleString(),
          subscription_name: event?.data?.plan?.name,
          next_payment_date: event?.data?.next_payment_date,
          current_date: formatDate(new Date().toISOString()),
        };

        const mailOptions: Mail.Options = {
          from: `Your Company <noreply@${mailUser}>`,
          to: customerEmail,
          subject: `${reminder.name}`,
          html: replaceTemplateVariables(
            reminder.template?.template || "",
            htmlVars
          ),
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        console.log(`Email sent to ${customerEmail}`);

        await addLog({
          message: replaceTemplateVariables(
            reminder.template?.template || "",
            htmlVars
          ),
          status: info.accepted.length > 0 ? "success" : "failed", // Check if email was accepted
          title: reminder.name,
          type: reminder.event,
        });
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

    // Log the failed email attempt in the "mails" table
    await addLog({
      message: `Error: ${error}`,
      status: "failed",
      title: "Failed email send attempt",
      type: "error",
    });

    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
