import { NextResponse } from "next/server";
import { writeClient, offerBySlugQuery } from "@/lib/sanity";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch the offer by slug to get the Sanity document ID
    const offer = await writeClient.fetch(offerBySlugQuery, { slug: id });

    if (!offer) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }

    if (offer.isExpired) {
      return NextResponse.json(
        { error: "This offer has expired" },
        { status: 410 }
      );
    }

    if (offer.status === "accepted") {
      return NextResponse.json(
        { error: "This offer has already been accepted" },
        { status: 409 }
      );
    }

    // Update status to accepted in Sanity
    await writeClient.patch(offer._id).set({ status: "accepted" }).commit();

    // Send notification email
    const contactEmail = process.env.CONTACT_EMAIL;
    if (contactEmail && process.env.RESEND_API_KEY !== "re_your_api_key") {
      await resend.emails.send({
        from: "Kalampokas Fotografia <noreply@send.kalampokasfotografia.gr>",
        to: contactEmail,
        subject: `Offer Accepted: ${offer.clientName}`,
        html: `
          <h2>Offer Accepted!</h2>
          <p><strong>${offer.clientName}</strong> has accepted the offer.</p>
          <p><strong>Event Date:</strong> ${offer.eventDate || "Not specified"}</p>
          <p><strong>Location:</strong> ${offer.eventLocation || "Not specified"}</p>
          ${offer.clientEmail ? `<p><strong>Email:</strong> ${offer.clientEmail}</p>` : ""}
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing offer response:", error);
    return NextResponse.json(
      { error: "Failed to process response" },
      { status: 500 }
    );
  }
}
