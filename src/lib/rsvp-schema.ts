import { z } from "zod";

export const attendanceOptions = [
  { value: "katiliyorum", label: "Katılıyorum" },
  { value: "temsilci", label: "Temsilci Göndereceğim" },
  { value: "katilamiyorum", label: "Katılamıyorum" },
] as const;

export const rsvpSchema = z.object({
  firstName: z.string().min(2, "Adınızı giriniz."),
  lastName: z.string().min(2, "Soyadınızı giriniz."),
  company: z.string().min(2, "Kurum / unvan bilgisini giriniz."),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  phone: z
    .string()
    .min(10, "Geçerli bir telefon numarası giriniz.")
    .max(20, "Geçerli bir telefon numarası giriniz."),
  attendance: z.enum(["katiliyorum", "temsilci", "katilamiyorum"], {
    message: "Katılım durumunuzu seçiniz.",
  }),
  lcvCode: z.string().optional(),
  dietary: z.string().optional(),
  transferNeeded: z.boolean().optional(),
  accommodationNeeded: z.boolean().optional(),
  notes: z.string().optional(),
});

export type RsvpFormValues = z.infer<typeof rsvpSchema>;
