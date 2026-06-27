import { motion } from "framer-motion";
import { DotGrid, FloatingLeaves } from "./animated-bg";
import { LogoMark } from "./SiteHeader";

export function ContactSection() {
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
                <div className="mt-1">Okhai Pharma Intermediates Pvt. Ltd., India</div>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="contact-form lg:col-span-6 grid gap-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            onSubmit={(e) => e.preventDefault()}
          >
            {[
              { l: "Name", t: "text", p: "Your full name" },
              { l: "Company", t: "text", p: "Company / institution" },
              { l: "Email", t: "email", p: "you@company.com" },
            ].map((f) => (
              <label key={f.l} className="block">
                <div className="text-xs uppercase tracking-wider text-background/60 mb-2">{f.l}</div>
                <input
                  type={f.t}
                  placeholder={f.p}
                  className="w-full bg-background/10 border border-background/20 rounded-xl px-4 py-3 text-background placeholder:text-background/40 focus:outline-none focus:border-primary focus:bg-background/20 transition-all"
                />
              </label>
            ))}
            <label className="block">
              <div className="text-xs uppercase tracking-wider text-background/60 mb-2">Message</div>
              <textarea
                rows={4}
                placeholder="Tell us what you're working on..."
                className="w-full bg-background/10 border border-background/20 rounded-xl px-4 py-3 text-background placeholder:text-background/40 focus:outline-none focus:border-primary focus:bg-background/20 transition-all resize-none"
              />
            </label>
            <button
              type="submit"
              className="mt-2 group inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-4 text-sm font-medium hover:opacity-90 transition-opacity w-full md:w-auto"
            >
              Send enquiry
              <span className="transition-transform group-hover:translate-x-1">-&gt;</span>
            </button>
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
    </>
  );
}
