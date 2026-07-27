import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
import heroInquire from "@/assets/hero-inquire.jpg";

export const Route = createFileRoute("/inquire")({
  head: () => ({
    meta: [
      { title: "Inquire — Second Brick Real Estate" },
      { name: "description", content: "Get in touch with Second Brick — offices in Mumbai, Pune and Latur. Expert guidance on residential, commercial and coastal real estate investments." },
      { property: "og:title", content: "Inquire — Second Brick" },
      { property: "og:description", content: "Let's build your next investment together." },
    ],
  }),
  component: Inquire,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  email: z.string().trim().email("Enter a valid email").max(255),
  city: z.string().trim().min(2, "City is required").max(80),
});

const offices = [
  {
    city: "Mumbai",
    address: "301, Zee Square, Above Manyavar Store, M G Road, Opp Bank of Baroda, Vile Parle East, Mumbai — 400057",
  },
  {
    city: "Pune",
    address: "Nawander House, 1156 Saifee Street, Near 1000 Oaks Hotel, Opp. Penosh, MG Road, Camp, Pune — 411 001",
  },
  {
    city: "Latur",
    address: "Nawander Complex, Sai Mandir Road, Vishal Nagar, Latur",
  },
];

function Inquire() {
  const [values, setValues] = useState({ name: "", phone: "", email: "", city: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const update = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  return (
    <>
      {/* HERO */}
      <section className="relative pt-28 md:pt-36 pb-10 overflow-hidden">
        <img
          src={heroInquire}
          alt="Welcoming reception interior"
          width={1920}
          height={900}
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/85 via-cream/90 to-cream" />
        <div className="container-x relative max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="rule-line" />
            <span className="eyebrow">Inquire</span>
          </div>
          <h1 className="font-serif">
            Let's build your next <em className="italic text-brick">investment</em> together.
          </h1>
          <p className="mt-6 text-lg text-cocoa/80 max-w-2xl">
            Whether you're exploring opportunities or ready to invest, our team is here to
            guide you with expert advice and personalized assistance.
          </p>
        </div>
      </section>

      {/* FORM + CONTACT */}
      <section className="pb-24">
        <div className="container-x grid lg:grid-cols-5 gap-14">
          {/* Form */}
          <div className="lg:col-span-3 bg-cream border border-border p-8 md:p-12">
            <div className="eyebrow">Contact Form</div>
            <h2 className="mt-3 font-serif text-3xl text-cocoa">Send us an inquiry</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              We'll respond within one business day.
            </p>

            {submitted ? (
              <div className="mt-10 p-8 border border-brick/30 bg-brick/5 flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-brick shrink-0 mt-0.5" />
                <div>
                  <div className="font-serif text-xl text-cocoa">Thank you, {values.name.split(" ")[0]}.</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your inquiry has been received. Our team will reach out shortly on
                    {" "}<span className="text-cocoa">{values.email}</span>.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-10 grid sm:grid-cols-2 gap-5" noValidate>
                <Field label="Full Name" name="name" value={values.name} onChange={update("name")} error={errors.name} />
                <Field label="Phone Number" name="phone" value={values.phone} onChange={update("phone")} error={errors.phone} />
                <Field label="Email Address" name="email" type="email" value={values.email} onChange={update("email")} error={errors.email} full />
                <Field label="City" name="city" value={values.city} onChange={update("city")} error={errors.city} full />

                <div className="sm:col-span-2 mt-4">
                  <button type="submit" className="btn-primary w-full sm:w-auto">Submit Inquiry</button>
                </div>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-cocoa text-cream p-8">
              <div className="eyebrow" style={{ color: "var(--cream)" }}>Direct Contact</div>
              <div className="mt-6 space-y-5">
                <a href="tel:+919004590002" className="flex items-center gap-4 group">
                  <Phone className="w-5 h-5 text-brick" />
                  <div>
                    <div className="text-xs text-cream/60 tracking-[0.2em] uppercase">Phone</div>
                    <div className="font-serif text-2xl text-cream group-hover:text-cream/80 transition-colors">
                      +91 9004 590 002
                    </div>
                  </div>
                </a>
                <a href="mailto:info@secondbrick.in" className="flex items-center gap-4 group">
                  <Mail className="w-5 h-5 text-brick" />
                  <div>
                    <div className="text-xs text-cream/60 tracking-[0.2em] uppercase">Email</div>
                    <div className="font-serif text-2xl text-cream group-hover:text-cream/80 transition-colors">
                      info@secondbrick.in
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {offices.map((o) => (
              <div key={o.city} className="border-l-2 border-brick pl-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brick" />
                  <div className="eyebrow">{o.city} Office</div>
                </div>
                <p className="mt-3 text-sm text-cocoa leading-relaxed">{o.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="pb-24">
        <div className="container-x">
          <div className="aspect-[16/8] border border-border overflow-hidden bg-secondary">
            <iframe
              title="Second Brick — Mumbai Office"
              src="https://www.google.com/maps?q=Vile+Parle+East+Mumbai+400057&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  full = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  full?: boolean;
}) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="block text-[11px] tracking-[0.2em] uppercase text-cocoa/70 mb-2">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full bg-cream border-b border-border py-3 text-cocoa focus:outline-none focus:border-brick transition-colors ${
          error ? "border-destructive" : ""
        }`}
      />
      {error && <span className="block mt-2 text-xs text-destructive">{error}</span>}
    </label>
  );
}
