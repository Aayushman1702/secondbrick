import React, { useState, useEffect } from "react";
import { X, ChevronDown, ArrowRight, Check } from "lucide-react";
import { saveInquiry } from "@/lib/contentStore";

interface ScrollInterestModalProps {
  scrollThreshold?: number; // scroll distance in px before opening modal
}


const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", country: "India" },
  { code: "+1", flag: "🇺🇸", country: "USA" },
  { code: "+44", flag: "🇬🇧", country: "UK" },
  { code: "+971", flag: "🇦🇪", country: "UAE" },
  { code: "+65", flag: "🇸🇬", country: "Singapore" },
];

export function ScrollInterestModal({ scrollThreshold = 350 }: ScrollInterestModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [countryFlag, setCountryFlag] = useState("🇮🇳");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(true);

  // Handle Scroll to trigger popup
  useEffect(() => {
    const dismissedSession = sessionStorage.getItem("secondbrick_form_dismissed");
    if (dismissedSession === "true") {
      setHasDismissed(true);
      return;
    }

    const handleScroll = () => {
      if (!hasDismissed && !isOpen && window.scrollY > scrollThreshold) {
        setIsOpen(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold, hasDismissed, isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setHasDismissed(true);
    sessionStorage.setItem("secondbrick_form_dismissed", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !mobileNumber.trim()) {
      alert("Please enter your name and contact number.");
      return;
    }
    setSubmitted(true);
    saveInquiry({
      name: name.trim(),
      phone: `${countryCode} ${mobileNumber.trim()}`,
      email: email.trim(),
      city: city.trim(),
      source: "Homepage Interest Popup",
      message: `Preferred location / interest in ${city.trim() || "all projects"}`,
    });
    setTimeout(() => {
      handleClose();
    }, 2400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop with subtle dark cocoa tint */}
      <div
        className="fixed inset-0 bg-[#1F1310]/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* Modal Card - Second Brick Cocoa / Brick Theme */}
      <div className="relative w-full max-w-lg bg-[#2B1B17] border border-cream/15 rounded-2xl shadow-[var(--shadow-soft)] overflow-hidden p-6 sm:p-8 text-cream z-10 animate-in zoom-in-95 fade-in duration-300 my-auto grain">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brick/20 via-transparent to-transparent pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          type="button"
          className="absolute top-5 right-5 text-cream/60 hover:text-cream transition-colors p-1.5 rounded-full hover:bg-cream/10 z-20"
          aria-label="Close form"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-14 h-14 bg-brick/30 text-cream rounded-full flex items-center justify-center mx-auto border border-brick/60 animate-bounce">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl text-cream">Interest Submitted!</h3>
            <p className="text-cream/70 text-sm max-w-xs mx-auto">
              Thank you for reaching out. Our real estate experts will get back to you shortly.
            </p>
          </div>
        ) : (
          <div className="relative z-10">
            {/* Header */}
            <div className="mb-6">
              <h2 className="font-serif text-2xl sm:text-3xl text-cream font-medium tracking-tight">
                Just a few more details.
              </h2>
              <p className="text-cream/70 text-xs sm:text-sm mt-1">
                Our experts will call you shortly.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-cream/80 font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full py-1.5 border-b border-cream/25 focus:border-brick bg-transparent text-cream placeholder:text-cream/40 outline-none text-sm transition-colors"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-cream/80 font-medium mb-1">
                  Mobile Number
                </label>
                <div className="relative flex items-center border-b border-cream/25 focus-within:border-brick pb-1.5 transition-colors">
                  {/* Country Selector */}
                  <div className="relative mr-3">
                    <button
                      type="button"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      className="flex items-center gap-1 text-sm text-cream font-medium hover:text-cream focus:outline-none"
                    >
                      <span>{countryCode}</span>
                      <span>{countryFlag}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-cream/60 ml-0.5" />
                    </button>

                    {isCountryDropdownOpen && (
                      <div className="absolute z-30 top-full left-0 mt-2 w-36 bg-[#37231E] border border-cream/20 rounded-md shadow-2xl py-1">
                        {COUNTRY_CODES.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => {
                              setCountryCode(c.code);
                              setCountryFlag(c.flag);
                              setIsCountryDropdownOpen(false);
                            }}
                            className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-cream/80 hover:text-cream hover:bg-brick/40"
                          >
                            <span>{c.country}</span>
                            <span className="font-mono">{c.code} {c.flag}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Input */}
                  <input
                    type="tel"
                    required
                    placeholder="Enter your mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="flex-1 bg-transparent text-cream placeholder:text-cream/40 outline-none text-sm"
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-cream/80 font-medium mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full py-1.5 border-b border-cream/25 focus:border-brick bg-transparent text-cream placeholder:text-cream/40 outline-none text-sm transition-colors"
                />
              </div>

              {/* Email ID */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-cream/80 font-medium mb-1">
                  Email ID
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-1.5 border-b border-cream/25 focus:border-brick bg-transparent text-cream placeholder:text-cream/40 outline-none text-sm transition-colors"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAgreed(!agreed)}
                  className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors border ${
                    agreed
                      ? "bg-cream border-cream text-cocoa"
                      : "bg-transparent border-cream/40 text-transparent"
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </button>
                <label
                  onClick={() => setAgreed(!agreed)}
                  className="text-[11px] sm:text-xs text-cream/80 leading-snug cursor-pointer select-none"
                >
                  I agree to be contacted by Second Brick or its representative through SMS/ Email/ WhatsApp/ RCS or Call.
                </label>
              </div>

              {/* Submit Button - Warm Gold / Brick Brand CTA */}
              <div className="pt-3 text-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-9 py-3.5 bg-[#C8A86B] hover:bg-[#D4B578] text-[#231713] font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase rounded-full shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>SUBMIT INTEREST</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
