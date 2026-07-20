import { useRef, type ReactNode, type MouseEvent } from "react";

export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  as = "button",
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  as?: "button" | "a";
  strength?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0,0)";
  };

  const Cmp: any = as;
  return (
    <span
      className="inline-block"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <Cmp
        ref={ref as any}
        href={href}
        onClick={onClick}
        className={`transition-transform duration-300 ease-out ${className}`}
      >
        {children}
      </Cmp>
    </span>
  );
}
