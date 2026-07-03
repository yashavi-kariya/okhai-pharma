import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { apiCall, API_BASE_URL } from "@/utils/api";
import { DotGrid, FloatingLeaves } from "./animated-bg";
import QuickAccessHub from "./QuickAccessHub";

const generateCaptcha = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let text = "";

  for (let i = 0; i < 6; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return text;
};
export function ContactSection() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productQuery = searchParams.get('product');
  const productName = location.pathname === '/products'
    ? productQuery === 'alkaloid'
      ? 'Nicotine Alkaloid 90% / 95%'
      : 'Nicotine Sulphate 40%'
    : '';
  const sourcePage = location.pathname === '/products' ? 'product' : 'contact';

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [captchaId, setCaptchaId] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [serverCaptcha, setServerCaptcha] = useState("");

  useEffect(() => {
    // Fetch CAPTCHA from server
    const fetchCaptcha = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/captcha/generate`);
        if (response.ok) {
          const data = await response.json();
          setCaptchaId(data.id);
          setServerCaptcha(data.captcha);
        }
      } catch (error) {
        console.error('Failed to fetch CAPTCHA:', error);
      }
    };
    fetchCaptcha();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!captchaId || !captchaInput) {
      setCaptchaError("Please enter CAPTCHA.");
      return;
    }

    // First verify CAPTCHA with server
    setIsSubmitting(true);

    try {
      const verifyResponse = await fetch(`${API_BASE_URL}/api/admin/captcha/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: captchaId,
          input: captchaInput,
        }),
      });

      const verifyResult = await verifyResponse.json();

      if (!verifyResult.valid) {
        setCaptchaError(verifyResult.error || "Incorrect CAPTCHA.");
        // Fetch new CAPTCHA
        const newCaptchaResponse = await fetch(`${API_BASE_URL}/api/admin/captcha/generate`);
        const newData = await newCaptchaResponse.json();
        setCaptchaId(newData.id);
        setServerCaptcha(newData.captcha);
        setCaptchaInput("");
        setIsSubmitting(false);
        return;
      }

      // CAPTCHA verified, now submit inquiry
      const response = await apiCall("/api/admin/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          sourcePage,
          productName,
          captchaId,
          captchaVerified: true,
        }),
      });

      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Fetch new CAPTCHA
      const newCaptchaResponse = await fetch(`${API_BASE_URL}/api/admin/captcha/generate`);
      const newData = await newCaptchaResponse.json();
      setCaptchaId(newData.id);
      setServerCaptcha(newData.captcha);
      setCaptchaInput("");

      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      console.error(error);
      setCaptchaError("Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="contact-section relative py-16 px-6 lg:px-10 overflow-hidden">
      <FloatingLeaves count={8} className="opacity-60" />
      <DotGrid className="opacity-40" />
      <div className="contact-card mx-auto max-w-6xl rounded-[2.5rem] bg-foreground text-background p-8 md:p-16 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 size-96 rounded-full bg-mint opacity-30 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-gold opacity-20 blur-3xl" />
        <div className="contact-grid relative grid lg:grid-cols-12 gap-10 items-start">
          <motion.div
            className="contact-info lg:col-span-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-xs uppercase tracking-[0.2em] text-primary">Contact</div>
            <h2 className="mt-4 text-3xl md:text-5xl font-display leading-tight">
              Let's start a <em className="italic text-primary">conversation</em>.
            </h2>
            <p className="mt-5 text-background/70 text-base md:text-lg leading-relaxed">
              Request specifications, samples or partnership opportunities. Our team responds within one business day.
            </p>
            <div className="mt-8 space-y-4 text-sm">
              <div>
                <div className="text-background/50 uppercase tracking-wider text-xs">Email</div>
                <div className="mt-1">info@okhaipharma.com</div>
              </div>
              <div>
                <div className="text-background/50 uppercase tracking-wider text-xs">Address</div>
                <div className="mt-1">Sr No.538, Ashapuri-Changa Road,</div>
                <div className="mt-1">Vill-Kasor, Ta-Sojitra, Anand — 388460</div>
                <div className="mt-1">Gujarat India</div>
              </div>
            </div>
          </motion.div>
          <motion.form
            className="contact-form lg:col-span-6 grid gap-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            onSubmit={handleSubmit}
          >
            <label className="block">
              <div className="text-xs uppercase tracking-wider text-background/60 mb-2">Name</div>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
                className="w-full bg-background/10 border border-background/20 rounded-xl px-4 py-3 text-background placeholder:text-background/40 focus:outline-none focus:border-primary focus:bg-background/20 transition-all"
              />
            </label>
            <label className="block">
              <div className="text-xs uppercase tracking-wider text-background/60 mb-2">Email</div>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@company.com"
                className="w-full bg-background/10 border border-background/20 rounded-xl px-4 py-3 text-background placeholder:text-background/40 focus:outline-none focus:border-primary focus:bg-background/20 transition-all"
              />
            </label>
            <label className="block">
              <div className="text-xs uppercase tracking-wider text-background/60 mb-2">Subject</div>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="What is this about?"
                className="w-full bg-background/10 border border-background/20 rounded-xl px-4 py-3 text-background placeholder:text-background/40 focus:outline-none focus:border-primary focus:bg-background/20 transition-all"
              />
            </label>
            <label className="block">
              <div className="text-xs uppercase tracking-wider text-background/60 mb-2">Message</div>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us what you're working on..."
                className="w-full bg-background/10 border border-background/20 rounded-xl px-4 py-3 text-background placeholder:text-background/40 focus:outline-none focus:border-primary focus:bg-background/20 transition-all resize-none"
              />
            </label>
            <div className="space-y-4">

              <div className="text-xs uppercase tracking-wider text-background/60">
                Verification
              </div>

              <div className="flex flex-col sm:flex-row gap-3">

                <div
                  className="relative flex items-center justify-center
      min-w-[190px] h-14 rounded-xl
      bg-white text-gray-900 overflow-hidden
      border border-gray-300 select-none"
                >
                  {/* Background Lines */}
                  <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%">
                      {[...Array(8)].map((_, i) => (
                        <line
                          key={i}
                          x1={Math.random() * 220}
                          y1={Math.random() * 60}
                          x2={Math.random() * 220}
                          y2={Math.random() * 60}
                          stroke="black"
                          strokeWidth="1"
                        />
                      ))}
                    </svg>
                  </div>

                  <div className="relative flex gap-1 text-2xl font-black tracking-[5px]">
                    {serverCaptcha.split("").map((char, index) => (
                      <span
                        key={index}
                        style={{
                          transform: `rotate(${Math.random() * 30 - 15}deg)`,
                          display: "inline-block",
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    try {
                      const response = await fetch(`${API_BASE_URL}/api/admin/captcha/generate`);
                      const data = await response.json();
                      setCaptchaId(data.id);
                      setServerCaptcha(data.captcha);
                      setCaptchaInput("");
                      setCaptchaError("");
                    } catch (error) {
                      console.error('Failed to refresh CAPTCHA:', error);
                    }
                  }}
                  className="rounded-xl px-5 bg-background/10 border border-background/20
      hover:bg-background/20 transition-all"
                >
                  ↻ Refresh
                </button>

              </div>

              <input
                type="text"
                required
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                placeholder="Enter CAPTCHA"
                className="w-full bg-background/10 border border-background/20 rounded-xl
                    px-4 py-3 text-background
                    placeholder:text-background/40
                    focus:outline-none
                    focus:border-primary
                    focus:bg-background/20"
              />
              {captchaError && (
                <p className="text-red-400 text-sm">
                  {captchaError}
                </p>
              )}

            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="rounded-full bg-primary text-primary-foreground px-7 py-4 text-sm font-medium hover:opacity-90 transition-opacity w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send enquiry'}
              </button>
              {submitted && (
                <span className="text-sm font-semibold text-emerald-700">Inquiry sent successfully.</span>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer
      className="site-footer text-[#0f1f14] py-6 px-6 lg:px-10"
      style={{
        background:
          "linear-gradient(135deg, #e8f5ee 0%, #d4ede0 50%, #c8e8d4 100%)",
        borderTop: "1px solid #b8dcc8",
      }}
    >
      <div
        className="mx-auto max-w-7xl flex items-center justify-center text-sm text-center flex-wrap"
        style={{ color: "#4a6e54" }}
      >
        &copy; COPYRIGHT {new Date().getFullYear()} |&nbsp;

        <a
          href="https://www.okhaipharma.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold transition-colors"
          style={{ color: "#1a5435" }}
          onMouseEnter={(e) => (e.target.style.color = "#2a7a4b")}
          onMouseLeave={(e) => (e.target.style.color = "#1a5435")}
        >
          OKHAI PHARMA INTERMEDIATES PVT. LTD.
        </a>

        &nbsp;| ALL RIGHTS RESERVED | DEVELOPED BY&nbsp;

        <a
          href="https://www.technoadviser.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold transition-colors"
          style={{ color: "#1a5435" }}
          onMouseEnter={(e) => (e.target.style.color = "#2a7a4b")}
          onMouseLeave={(e) => (e.target.style.color = "#1a5435")}
        >
          TechnoAdviser
        </a>
      </div>
    </footer>
  );
}

export default function PageBottom({ showContact = true, showFooter = true }) {
  return (
    <>
      {showContact && <ContactSection />}
      {showFooter && <SiteFooter />}
      {/* Leaf FAB + Quick Access Hub panel. PageBottom is rendered on
          every page, so mounting it here makes it global for free —
          it replaces the old plain scroll-to-top button (same corner). */}
      <QuickAccessHub />
    </>
  );
}