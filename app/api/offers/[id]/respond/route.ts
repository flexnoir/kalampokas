import { NextResponse } from "next/server";
import { writeClient, offerBySlugQuery } from "@/lib/sanity";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function formatPrice(price: number): string {
  return `€ ${new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)}`;
}

interface AcceptedAddOnInput {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface RespondBody {
  message?: string;
  package?: { id: string; name: string; price: number };
  addOns?: AcceptedAddOnInput[];
  totalPrice?: number;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: RespondBody = await request.json().catch(() => ({}));

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

    if (!body.package) {
      return NextResponse.json(
        { error: "No package selected" },
        { status: 400 }
      );
    }

    const acceptedPackage = body.package;
    const acceptedAddOns = body.addOns ?? [];
    const acceptedMessage = body.message ?? "";
    const acceptedTotalPrice = body.totalPrice ?? acceptedPackage.price;
    const acceptedAt = new Date().toISOString();

    // Update status to accepted in Sanity, and record what was accepted
    await writeClient
      .patch(offer._id)
      .set({
        status: "accepted",
        acceptedPackage,
        acceptedAddOns,
        acceptedMessage,
        acceptedTotalPrice,
        acceptedAt,
      })
      .commit();

    // Send notification email
    const contactEmail = process.env.CONTACT_EMAIL || "hello@kalampokasfotografia.com";
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_your_api_key") {
      const addOnsHtml = acceptedAddOns.length
        ? `<ul>${acceptedAddOns
            .map(
              (a) =>
                `<li>${a.name}${a.quantity > 1 ? ` x${a.quantity}` : ""} - ${formatPrice(a.price * a.quantity)}</li>`
            )
            .join("")}</ul>`
        : "<p>None</p>";

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
          <h3>Selected Package</h3>
          <p>${acceptedPackage.name} - ${formatPrice(acceptedPackage.price)}</p>
          <h3>Add-Ons</h3>
          ${addOnsHtml}
          <h3>Total</h3>
          <p><strong>${formatPrice(acceptedTotalPrice)}</strong> (VAT excl.)</p>
          ${
            acceptedMessage
              ? `<h3>Message from client</h3><p>${acceptedMessage}</p>`
              : ""
          }
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
