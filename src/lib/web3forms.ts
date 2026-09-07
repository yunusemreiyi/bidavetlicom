import { attendanceOptions, type RsvpFormValues } from "@/lib/rsvp-schema";

// Web3Forms access keys are meant to be used client-side (that's the whole
// point of the service for static sites with no backend) — it's not a
// secret, so embedding it here is intentional and safe.
const WEB3FORMS_ACCESS_KEY = "e2ef77e1-1c76-4a8c-b02b-8bf5c58a3962";

function attendanceLabel(value: RsvpFormValues["attendance"]) {
  return attendanceOptions.find((o) => o.value === value)?.label ?? value;
}

export async function submitRsvp(values: RsvpFormValues) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: "Yeni LCV Başvurusu — bidavetli.com",
      from_name: `${values.firstName} ${values.lastName}`,
      Ad: values.firstName,
      Soyad: values.lastName,
      "Kurum / Unvan": values.company,
      "E-posta": values.email,
      Telefon: values.phone,
      "Katılım Durumu": attendanceLabel(values.attendance),
      "LCV Kodu": values.lcvCode || "-",
      "Diyet / Alerjen": values.dietary || "-",
      "Transfer İhtiyacı": values.transferNeeded ? "Evet" : "Hayır",
      "Konaklama İhtiyacı": values.accommodationNeeded ? "Evet" : "Hayır",
      Not: values.notes || "-",
    }),
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || "Gönderim başarısız oldu.");
  }
}
