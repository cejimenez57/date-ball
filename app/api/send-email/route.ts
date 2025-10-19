// app/api/send-email/route.ts
import { Resend } from "resend";
import { NextResponse } from "next/server";

export const runtime = "nodejs";         // ✅ force Node runtime (not Edge)
export const dynamic = "force-dynamic";  // ✅ avoid caching surprises

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  // helps you verify the route is reachable in a browser
  return NextResponse.json({ ok: true, route: "send-email" });
}

export async function POST(req: Request) {
  try {
    const ct = req.headers.get("content-type") || "";
    if (!ct.includes("application/json")) {
      return NextResponse.json(
        { ok: false, error: "Content-Type must be application/json" },
        { status: 415 }
      );
    }

    const { idea, whenISO, christianEmail, ashleyEmail } = await req.json();
    if (!idea || !whenISO || !christianEmail || !ashleyEmail) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "RESEND_API_KEY is missing on the server" },
        { status: 500 }
      );
    }

    const when = new Date(whenISO);
    const pretty = when.toLocaleString();

    const subject = `Your Date Night: ${idea.title}`;
    const html = `
      <h2>You're going on a date! 🎉</h2>
      <p><b>Idea:</b> ${idea.title}</p>
      <p><b>Location:</b> ${idea.location ?? "-"}</p>
      <p><b>Cost:</b> ${"$".repeat(idea.cost)}</p>
      <p><b>Link:</b> ${idea.url ? `<a href="${idea.url}">${idea.url}</a>` : "-"}</p>
      <p><b>When:</b> ${pretty}</p>
      <hr />
      <p>Have fun! 💚💙</p>
    `;

    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev", // use this until your domain is verified
      to: [christianEmail, ashleyEmail],
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: String(error) }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("API error:", e);
    return NextResponse.json({ ok: false, error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
