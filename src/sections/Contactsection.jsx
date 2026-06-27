import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FloatingLeaves, DotGrid } from "../components/animated-bg";
import "../responsive.css";

const contactFields = [
    { l: "Name", t: "text", p: "Your full name" },
    { l: "Company", t: "text", p: "Company / institution" },
    { l: "Email", t: "email", p: "you@company.com" },
];

/* ─── useContactReveal ──────────────────────────────────────────────── */
function useContactReveal() {
    const infoRef = useRef(null);
    const formRef = useRef(null);

    const infoInView = useInView(infoRef, { once: true });
    const formInView = useInView(formRef, { once: true });

    const infoAnim = {
        initial: { opacity: 0, y: 24 },
        animate: infoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
        transition: { duration: 0.7 },
    };

    const formAnim = {
        initial: { opacity: 0, y: 24 },
        animate: formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
        transition: { duration: 0.7, delay: 0.1 },
    };

    return { infoRef, formRef, infoAnim, formAnim };
}

/* ─── Contact ───────────────────────────────────────────────────────── */
export default function Contact() {
    const { infoRef, formRef, infoAnim, formAnim } = useContactReveal();

    return (
        <section id="contact" className="contact-section relative py-16 px-6 lg:px-10 overflow-hidden">
            <FloatingLeaves count={8} className="opacity-60" />
            <DotGrid className="opacity-40" />

            <div className="contact-card mx-auto max-w-6xl rounded-[2.5rem] bg-foreground text-background p-8 md:p-16 relative overflow-hidden">
                <div className="absolute -top-32 -right-32 size-96 rounded-full bg-mint opacity-30 blur-3xl" />
                <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-gold opacity-20 blur-3xl" />

                <div className="contact-grid relative grid lg:grid-cols-12 gap-10 items-start">

                    <motion.div ref={infoRef} className="contact-info lg:col-span-6" {...infoAnim}>
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

                    <motion.form ref={formRef} className="contact-form lg:col-span-6 grid gap-4"
                        onSubmit={(e) => e.preventDefault()} {...formAnim}>
                        {contactFields.map((f) => (
                            <label key={f.l} className="block">
                                <div className="text-xs uppercase tracking-wider text-background/60 mb-2">{f.l}</div>
                                <input type={f.t} placeholder={f.p}
                                    className="w-full bg-background/10 border border-background/20 rounded-xl px-4 py-3 text-background placeholder:text-background/40 focus:outline-none focus:border-primary focus:bg-background/20 transition-all" />
                            </label>
                        ))}
                        <label className="block">
                            <div className="text-xs uppercase tracking-wider text-background/60 mb-2">Message</div>
                            <textarea rows={4} placeholder="Tell us what you're working on…"
                                className="w-full bg-background/10 border border-background/20 rounded-xl px-4 py-3 text-background placeholder:text-background/40 focus:outline-none focus:border-primary focus:bg-background/20 transition-all resize-none" />
                        </label>
                        <button type="submit"
                            className="mt-2 group inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-4 text-sm font-medium hover:opacity-90 transition-opacity w-full md:w-auto">
                            Send enquiry
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                        </button>
                    </motion.form>

                </div>
            </div>
        </section>
    );
}