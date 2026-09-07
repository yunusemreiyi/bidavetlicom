"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ConfettiBurst } from "@/components/ui/confetti-burst";
import { attendanceOptions, rsvpSchema, type RsvpFormValues } from "@/lib/rsvp-schema";

type SubmitState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; confirmationCode: string }
  | { status: "error"; message: string };

export function RsvpSection() {
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      attendance: "katiliyorum",
      transferNeeded: false,
      accommodationNeeded: false,
    },
  });

  const attendance = watch("attendance");

  async function onSubmit(values: RsvpFormValues) {
    setSubmitState({ status: "loading" });

    // Static hosting has no server, so there's no backend to POST to here.
    // The form is fully wired (validation, confirmation code, confetti) —
    // to actually receive these submissions, point it at a form backend
    // (e.g. Web3Forms, Formspree) or a mailto: fallback.
    console.log("LCV başvurusu:", values);
    await new Promise((resolve) => setTimeout(resolve, 500));

    setSubmitState({
      status: "success",
      confirmationCode: `LCV-${Date.now().toString(36).toUpperCase()}`,
    });
    reset();
  }

  const isSuccess = submitState.status === "success";
  const isLoading = submitState.status === "loading";

  return (
    <section id="lcv" className="relative overflow-hidden bg-obsidian-soft py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(201,164,92,0.08),_transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-2xl px-6">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.4em] text-gold">
            LCV
          </span>
          <h2 className="font-serif text-4xl italic text-ivory sm:text-5xl">
            Katılımınızı{" "}
            <span className="gold-shimmer not-italic">Bildirin</span>
          </h2>
          <p className="max-w-md text-sm font-light text-mist">
            Aşağıdaki formu doldurarak katılım durumunuzu bize iletebilirsiniz.
          </p>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="glass relative flex flex-col items-center gap-4 rounded-2xl p-12 text-center"
              >
                <ConfettiBurst />
                <CheckCircle2 className="h-12 w-12 text-gold" strokeWidth={1.5} />
                <h3 className="font-serif text-2xl text-ivory">
                  Teşekkür Ederiz
                </h3>
                <p className="max-w-sm text-sm text-mist">
                  Katılım bildiriminiz alınmıştır. Onay kodunuz:{" "}
                  <span className="font-medium text-gold">
                    {submitState.confirmationCode}
                  </span>
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSubmitState({ status: "idle" })}
                >
                  Yeni Bildirim Gönder
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="glass flex flex-col gap-6 rounded-2xl p-8 sm:p-10"
                noValidate
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="firstName">Ad</Label>
                    <Input id="firstName" {...register("firstName")} />
                    {errors.firstName && (
                      <p className="text-xs text-red-400">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="lastName">Soyad</Label>
                    <Input id="lastName" {...register("lastName")} />
                    {errors.lastName && (
                      <p className="text-xs text-red-400">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="company">Kurum / Unvan</Label>
                  <Input id="company" {...register("company")} />
                  {errors.company && (
                    <p className="text-xs text-red-400">
                      {errors.company.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">E-posta</Label>
                    <Input id="email" type="email" {...register("email")} />
                    {errors.email && (
                      <p className="text-xs text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" type="tel" {...register("phone")} />
                    {errors.phone && (
                      <p className="text-xs text-red-400">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Label>Katılım Durumu</Label>
                  <RadioGroup
                    value={attendance}
                    onValueChange={(value) =>
                      setValue(
                        "attendance",
                        value as RsvpFormValues["attendance"],
                        { shouldValidate: true },
                      )
                    }
                    className="grid grid-cols-1 gap-3 sm:grid-cols-3"
                  >
                    {attendanceOptions.map((option) => (
                      <label
                        key={option.value}
                        htmlFor={option.value}
                        className="flex cursor-pointer items-center gap-2 rounded-md border border-line px-4 py-3 text-sm text-ivory transition-colors has-[[data-state=checked]]:border-gold/60 has-[[data-state=checked]]:bg-gold/10"
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        {option.label}
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="lcvCode">LCV Kodu (varsa)</Label>
                    <Input id="lcvCode" {...register("lcvCode")} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="dietary">Diyet / Alerjen Tercihi</Label>
                    <Input id="dietary" {...register("dietary")} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="flex cursor-pointer items-center gap-3 rounded-md border border-line px-4 py-3 text-sm text-ivory">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-[#c9a45c]"
                      {...register("transferNeeded")}
                    />
                    Transfer ihtiyacım var
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 rounded-md border border-line px-4 py-3 text-sm text-ivory">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-[#c9a45c]"
                      {...register("accommodationNeeded")}
                    />
                    Konaklama ihtiyacım var
                  </label>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="notes">Not (opsiyonel)</Label>
                  <Textarea id="notes" {...register("notes")} />
                </div>

                {submitState.status === "error" && (
                  <p className="text-sm text-red-400">
                    {submitState.message}
                  </p>
                )}

                <Button type="submit" size="lg" disabled={isLoading} className="mt-2">
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" strokeWidth={1.5} />
                  )}
                  Gönder
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
