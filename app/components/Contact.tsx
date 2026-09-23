"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { sendContactMessage } from "../actions/contact";
import { contactSchema, ContactInput } from "../data/contactSchema";
import { profile, socials } from "../data/profile";
import Reveal from "./Reveal";

type Status = { state: "idle" } | { state: "sent" } | { state: "error"; message: string };

const fieldClass =
  "w-full rounded-xl border border-line bg-bg px-4 py-3.5 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none aria-[invalid=true]:border-red-500";

const FieldError = ({ id, message }: { id: string; message?: string }) => (
  <AnimatePresence>
    {message && (
      <motion.p
        id={id}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="mt-2 text-sm text-red-500"
      >
        {message}
      </motion.p>
    )}
  </AnimatePresence>
);

const Contact = () => {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    const result = await sendContactMessage(data);
    if (result.ok) {
      reset();
      setStatus({ state: "sent" });
    } else {
      setStatus({ state: "error", message: result.error });
    }
  };

  return (
    <section id="contact" className="border-t border-line bg-surface py-24 md:py-36">
      <div className="container grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <Reveal className="text-5xl font-bold tracking-tight sm:text-7xl">
            Let&apos;s build
          </Reveal>
          <Reveal className="text-5xl font-bold tracking-tight text-muted sm:text-7xl" delay={0.1}>
            something good.
          </Reveal>
          <p className="mt-8 max-w-[44ch] text-lg text-muted">
            Hiring for a frontend role, or have a project in mind? Send a message and
            I&apos;ll reply within a couple of days.
          </p>

          <dl className="mt-12 space-y-6">
            <div>
              <dt className="text-sm text-muted">Phone</dt>
              <dd>
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="link text-lg">
                  {profile.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Based in</dt>
              <dd className="text-lg font-semibold">{profile.location}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Elsewhere</dt>
              <dd className="mt-1 flex flex-wrap gap-x-6 gap-y-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link text-lg"
                  >
                    {s.label}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {status.state === "sent" ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full min-h-[420px] flex-col items-start justify-center rounded-3xl border border-line bg-bg p-10"
                role="status"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                  className="grid h-14 w-14 place-items-center rounded-full bg-accent text-on-accent"
                >
                  <Check size={28} />
                </motion.span>
                <h3 className="mt-6 text-3xl font-bold">Message sent</h3>
                <p className="mt-2 text-muted">Thanks for reaching out. I&apos;ll reply soon.</p>
                <button
                  type="button"
                  onClick={() => setStatus({ state: "idle" })}
                  className="link mt-8"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-6 rounded-3xl border border-line bg-bg p-6 sm:p-10"
              >
                <div>
                  <label htmlFor="name" className="mb-2 block font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={fieldClass}
                    {...register("name")}
                  />
                  <FieldError id="name-error" message={errors.name?.message} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={fieldClass}
                    {...register("email")}
                  />
                  <FieldError id="email-error" message={errors.email?.message} />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell me about the role or project"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`${fieldClass} resize-none`}
                    {...register("message")}
                  />
                  <FieldError id="message-error" message={errors.message?.message} />
                </div>

                {status.state === "error" && (
                  <p role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500">
                    {status.message}
                  </p>
                )}

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-70">
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    "Send message"
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Contact;
