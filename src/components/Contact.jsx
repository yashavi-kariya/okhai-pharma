import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { apiCall } from "@/utils/api";
import SiteNav from "./SiteHeader";
import { MeshBlobs, DotGrid, GridLines, FloatingLeaves } from "./animated-bg";
import "../responsive.css";

// ── Reusable animation variants ──────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

const scaleIn = (delay = 0) => ({
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { duration: 0.55, ease: "easeOut", delay },
});

// ── Styles ────────────────────────────────────────────────────────────────────
const inputCls =
    "w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200";

const labelCls =
    "block text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground mb-2";

// ── FAQ Data ──────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
    {
        q: "More about Okhai Pharma",
        a: "Okhai Pharma Intermediates Pvt. Ltd. is a leading Indian manufacturer and exporter of high-purity nicotine products. Operating under strict quality and compliance standards, we serve pharmaceutical companies, research institutions, and nicotine product manufacturers worldwide.",
    },
    {
        q: "Who are the owners of Okhai Pharma?",
        a: "Okhai Pharma is led by a team of experienced professionals with deep expertise in pharmaceutical manufacturing and nicotine chemistry. Our leadership brings decades of industry experience to ensure the highest standards of product quality and customer service.",
    },
    {
        q: "What are the products by Okhai Pharma?",
        a: "We specialise in two core products: Nicotine Sulphate 40% — a high-purity, water-soluble grade used in research, chemical manufacturing, and nicotine refinement; and Nicotine Alkaloid 90% / 95% — a premium pharmaceutical-grade extract used in NRT products, e-liquid manufacturing, and scientific research.",
    },
    {
        q: "Where is the office located at?",
        a: "Our plant and registered office is located at Sr No. 538, Ashapuri-Changa Road, Vill-Kasor, Ta-Sojitra, Dist-Anand, Pin-388460, Gujarat, India. For directions, please use the map below or contact us directly.",
    },
    {
        q: "What is the minimum quantity we can buy?",
        a: "Minimum order quantities depend on the product and packaging configuration. Please reach out to our sales team at info@okhaipharma.com or call +91 79900 82565 for specific MOQ details, pricing, and bulk-order options.",
    },
];

// ── FAQ Accordion Item ────────────────────────────────────────────────────────
function FaqItem({ item, index, openIndex, setOpenIndex }) {
    const isOpen = openIndex === index;

    return (
        <motion.div
            {...fadeUp(0.05 * index)}
            className="border border-border/60 rounded-2xl overflow-hidden bg-card/70 backdrop-blur-sm"
        >
            <button
                className="w-full flex items-center justify-between px-6 py-4 text-left group"
                onClick={() => setOpenIndex(isOpen ? null : index)}
            >
                <span
                    className={`text-sm font-semibold transition-colors duration-200 ${isOpen ? "text-primary" : "text-primary/80 group-hover:text-primary"
                        }`}
                >
                    {item.q}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className={`shrink-0 ml-4 w-6 h-6 rounded-full border flex items-center justify-center transition-colors duration-200 ${isOpen
                        ? "border-primary bg-primary text-white"
                        : "border-border/60 text-muted-foreground group-hover:border-primary/40"
                        }`}
                >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                    </svg>
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="faq-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-5 pt-0 border-t border-border/40">
                            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                                {item.a}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [faqOpen, setFaqOpen] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await apiCall('/api/admin/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    sourcePage: 'contact',
                }),
            });
            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitted(false), 4000);
        }
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(56,131,70,0.16),transparent_30%),linear-gradient(180deg,#eef7ed_0%,#f7fbf6_45%,#ebf5e6_100%)] text-foreground overflow-hidden relative">
            <SiteNav />

            <MeshBlobs className="opacity-40" />
            <DotGrid className="opacity-25" />
            <GridLines className="opacity-10" />
            <FloatingLeaves count={8} className="opacity-30" />

            <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-10 space-y-14 relative z-10">

                {/* ── Hero ─────────────────────────────────────────────────────────── */}
                <motion.section
                    {...fadeUp(0)}
                    className="mx-auto max-w-5xl text-center relative z-10"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-primary font-semibold">
                        <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                        Reach Us
                    </div>
                    <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-foreground tracking-tight">
                        Connect with <span className="text-primary">Okhai Pharma</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                        Complete the form below and an Okhai Pharma representative will respond shortly.
                    </p>
                </motion.section>

                {/* ── Main Grid: Form LEFT  |  Quick Contact RIGHT ─────────────────── */}
                <section className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-12 relative z-10 items-start">

                    {/* ── LEFT: Enquiry Form ─────────────────────────────────────────── */}
                    <motion.div
                        {...fadeUp(0.1)}
                        className="lg:col-span-7 rounded-[2rem] border-5 border-border bg-card/85 backdrop-blur-md p-8 shadow-soft"
                    >
                        {/* Form header */}
                        <div className="border-b border-border/60 pb-6 mb-6">
                            <p className="text-xs uppercase tracking-[0.22em] text-primary font-bold">Enquiry Form</p>
                            <h2 className="mt-2 text-3xl font-display font-semibold text-foreground">
                                Send us a Message
                            </h2>
                            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                Complete the form below and an Okhai Pharma representative will respond shortly.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Row 1: Full Name + Email */}
                            <div className="grid gap-5 md:grid-cols-2">
                                <div>
                                    <label className={labelCls}>Full Name <span className="text-red-400">*</span></label>
                                    <input type="text" placeholder="John Doe" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputCls} />
                                </div>
                                <div>
                                    <label className={labelCls}>Email Address <span className="text-red-400">*</span></label>
                                    <input type="email" placeholder="you@example.com" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputCls} />
                                </div>
                            </div>

                            {/* Row 2: Phone + Company */}
                            {/* Removed - no longer needed */}

                            {/* Row 3: Subject */}
                            <div>
                                <label className={labelCls}>Subject <span className="text-red-400">*</span></label>
                                <div className="relative">
                                    <select
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className={`${inputCls} appearance-none cursor-pointer pr-10 bg-background/60`}
                                    >
                                        <option value="" disabled>Select a subject</option>
                                        <option value="Product Inquiry">Product Inquiry</option>
                                        <option value="Bulk Order">Bulk Order / Pricing</option>
                                        <option value="Quality & Compliance">Quality &amp; Compliance</option>
                                        <option value="Partnership">Partnership / Distribution</option>
                                        <option value="General Query">General Query</option>
                                    </select>
                                    {/* Custom dropdown arrow */}
                                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            {/* Row 5: Message */}
                            <div>
                                <label className={labelCls}>Message <span className="text-red-400">*</span></label>
                                <textarea
                                    rows={5}
                                    placeholder="How can we help you?"
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className={`${inputCls} resize-none`}
                                />
                            </div>

                            {/* Consent */}
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="consent"
                                    required
                                    className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary/20 focus:ring-offset-background"
                                />
                                <label htmlFor="consent" className="text-xs text-muted-foreground leading-normal">
                                    I agree to Okhai Pharma's handling of my data according to the privacy policy.
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary text-primary-foreground px-8 py-4 text-sm font-bold shadow-soft hover:bg-primary/90 transition duration-200 active:scale-[0.99] cursor-pointer"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                <motion.svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16" height="16"
                                    viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.8, repeat: Infinity }}
                                >
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </motion.svg>
                            </button>

                            {/* Success banner */}
                            <AnimatePresence>
                                {submitted && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        className="rounded-xl border border-primary/20 bg-primary/10 p-4 text-center text-sm font-semibold text-primary"
                                    >
                                        ✅ Your message has been sent! We'll get back to you soon.
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>

                    {/* ── RIGHT: Quick Contact + Info cards ─────────────────────────── */}
                    <div className="lg:col-span-5 space-y-5">

                        {/* Quick Contact — dark green card matching site identity */}
                        <motion.div
                            {...scaleIn(0.15)}
                            className="rounded-[2rem] overflow-hidden shadow-xl"
                            style={{
                                background: "linear-gradient(145deg, #1a4731 0%, #1e5c3d 50%, #164028 100%)",
                            }}
                        >
                            {/* Card header */}
                            <div className="px-8 pt-8 pb-5 border-b border-white/10">
                                <h3 className="text-xl font-bold text-white">Quick Contact</h3>
                                <p className="text-sm text-white/60 mt-1">Reach us directly anytime</p>
                            </div>

                            {/* Contact items */}
                            <div className="px-8 py-6 space-y-4">
                                {[
                                    {
                                        icon: (
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        ),
                                        label: "Call us at",
                                        value: "+91 79900 82565",
                                    },
                                    {
                                        icon: (
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        ),
                                        label: "Email us",
                                        value: "info@okhaipharma.com",
                                    },
                                    {
                                        icon: (
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        ),
                                        label: "Office",
                                        value: "Sr No.538, Ashapuri-Changa Road\nVill-Kasor, Ta-Sojitra, Anand — 388460",
                                    },
                                ].map(({ icon, label, value }, i) => (
                                    <motion.div
                                        key={label}
                                        initial={{ opacity: 0, x: 16 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + i * 0.1, duration: 0.45 }}
                                        className="flex items-start gap-4 group"
                                    >
                                        {/* Icon bubble */}
                                        <div className="shrink-0 w-10 h-10 rounded-xl bg-white/10 group-hover:bg-emerald-400/20 border border-white/15 flex items-center justify-center text-emerald-300 transition-colors duration-200">
                                            {icon}
                                        </div>
                                        <div>
                                            <p className="text-xs text-white/50 font-medium uppercase tracking-wider">{label}</p>
                                            <p className="mt-0.5 text-sm font-bold text-white leading-snug whitespace-pre-line">{value}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* FAQ Accordion — moved into right column */}
                        <motion.div {...fadeUp(0.2)} className="space-y-3">
                            <div className="mb-4">
                                <p className="text-xs uppercase tracking-[0.28em] text-primary/70 font-semibold">FAQ</p>
                                <h3 className="mt-1 text-xl font-display font-semibold text-foreground">
                                    Frequently Asked Questions
                                </h3>
                            </div>
                            {FAQ_ITEMS.map((item, i) => (
                                <FaqItem
                                    key={i}
                                    item={item}
                                    index={i}
                                    openIndex={faqOpen}
                                    setOpenIndex={setFaqOpen}
                                />
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ── FAQ Accordion ─────────────────────────────────────────────────── */}


                {/* ── Map / Location ────────────────────────────────────────────────── */}
                <motion.section
                    {...fadeUp(0.1)}
                    className="mx-auto max-w-7xl relative z-10"
                >
                    <div className="rounded-[2rem] border border-border bg-card/85 p-8 shadow-soft transition-all duration-300 hover:border-primary/20">
                        <div className="space-y-2 mb-6">
                            <p className="text-xs uppercase tracking-[0.22em] text-primary font-bold">Location</p>
                            <h2 className="text-2xl font-display font-semibold text-foreground">Find our office</h2>
                        </div>

                        <motion.div
                            onClick={() => window.open("https://www.google.com/maps/place/Okhai+Pharma+Intermediates+Pvt+Ltd/@22.5653178,72.7863326,804m/data=!3m2!1e3!4b1!4m6!3m5!1s0x395e5700556aa1b1:0xb31c0bffa3a47fab!8m2!3d22.5653178!4d72.7863326!16s%2Fg%2F11xckx_vv1?entry=ttu&g_ep=EgoyMDI2MDYyOC4wIKXMDSoASAFQAw%3D%3D", "_blank", "noopener,noreferrer")}
                            whileHover={{ scale: 1.005 }}
                            className="rounded-2xl overflow-hidden border border-border h-72 relative group cursor-pointer shadow-soft transition-all duration-300"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === "Enter" && window.open("https://www.google.com/maps/place/Okhai+Pharma+Intermediates+Pvt+Ltd/@22.5653178,72.7863326,804m/data=!3m2!1e3!4b1!4m6!3m5!1s0x395e5700556aa1b1:0xb31c0bffa3a47fab!8m2!3d22.5653178!4d72.7863326!16s%2Fg%2F11xckx_vv1?entry=ttu&g_ep=EgoyMDI2MDYyOC4wIKXMDSoASAFQAw%3D%3D", "_blank", "noopener,noreferrer")}
                        >
                            <iframe
                                title="Office Location"
                                src="https://maps.google.com/maps?q=22.5653178,72.7863326&z=17&output=embed"
                                className="w-full h-full border-0 pointer-events-none"
                                loading="lazy"
                                allowFullScreen
                            />
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                                className="absolute inset-0 bg-background/80 flex items-center justify-center backdrop-blur-sm"
                            >
                                <motion.span
                                    animate={{ y: [0, -3, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="bg-card text-foreground text-sm font-semibold px-6 py-3 rounded-xl shadow-soft border border-border"
                                >
                                    📍 Open in Google Maps
                                </motion.span>
                            </motion.div>
                        </motion.div>

                        <p className="mt-4 text-sm text-muted-foreground text-center font-medium">
                            Sr No.538, Ashapuri-Changa Road, Vill-Kasor, Ta-Sojitra, Dis-Anand, Pin-388460
                        </p>
                    </div>
                </motion.section>
            </main>
        </div>
    );
}