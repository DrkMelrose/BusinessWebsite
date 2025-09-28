import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body || {};
    if (!name || !email || !message) {
      return new NextResponse("Invalid payload", { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: { name, email, message, source: 'contact' }
    });

    // Optional email notification
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.NOTIFY_EMAIL_TO;
    const from = process.env.NOTIFY_EMAIL_FROM;
    if (apiKey && to && from) {
      try {
        const resend = new Resend(apiKey);
        await resend.emails.send({
          from,
          to,
          subject: `Новая заявка от ${name}`,
          text: `Email: ${email}\n\n${message}`
        });
      } catch (e) {
        console.warn("Email send failed:", e);
      }
    }

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (e: any) {
    console.error(e);
    return new NextResponse("Server error", { status: 500 });
  }
}
