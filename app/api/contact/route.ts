import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  date: z.string().min(1),
  venue: z.string().min(2),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Kalampokas Fotografia <noreply@send.kalampokasfotografia.gr>",
      to: process.env.CONTACT_EMAIL || "hello@kalampokasfotografia.com",
      subject: `New Inquiry from ${data.name}`,
      html: `
        <h2>New Wedding Inquiry</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Venue:</strong> ${data.venue}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
      replyTo: data.email,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
