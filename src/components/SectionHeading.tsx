import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <div className="flex items-center gap-3 mb-5" style={{ justifyContent: align === "center" ? "center" : "flex-start" }}>
          <span className="rule-line" style={{ background: invert ? "var(--cream)" : "var(--brick)" }} />
          <span className="eyebrow" style={{ color: invert ? "var(--cream)" : "var(--brick)" }}>{eyebrow}</span>
        </div>
      )}
      <h2 className={invert ? "text-cream" : ""} style={{ color: invert ? "var(--cream)" : undefined }}>
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-base leading-relaxed ${invert ? "text-cream/70" : "text-muted-foreground"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
