import { NextResponse } from "next/server";
import { rsvpSchema } from "@/lib/rsvp-schema";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json(
      { ok: false, error: "Geçersiz istek gövdesi." },
      { status: 400 },
    );
  }

  const parsed = rsvpSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  // TODO: Gerçek entegrasyon için burada bir e-posta gönderimi / veritabanı
  // kaydı yapılabilir. Şimdilik başvuru kabul edilmiş gibi simüle ediliyor.
  console.log("Yeni LCV başvurusu:", parsed.data);

  return NextResponse.json({
    ok: true,
    message: "Katılım bildiriminiz alındı.",
    confirmationCode: `LCV-${Date.now().toString(36).toUpperCase()}`,
  });
}
