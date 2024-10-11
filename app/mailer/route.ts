import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function GET(req: NextRequest) {
  try {
    // Get the request body as a JSON object
    // const { to, subject, text } = await req.json();

    // Create the transporter for Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "akindejioluwaseun015@gmail.com", // Your Gmail address
        pass: "omgmhefjkpsvgotk", // Your App Password
      },
    });

    // Define email options
    const mailOptions = {
      from: "akindejioluwaseun015@gmail.com", // Sender address
      to: "akindejioluwaseun01588@yopmail.com", // Recipient address (from request body)
      subject: "C'monss now", // Subject (from request body)
      text: "Hekleyoooooooooooodoooooo", // Email body (from request body)
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return a success response
    return NextResponse.json({
      status: "success",
      message: "Email sent successfully!",
    });
  } catch (error) {
    // Catch any errors during the process and return a 500 response
    console.error("Error processing:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to send email." },
      { status: 500 }
    );
  }
}
