import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
    X,
    Building2,
    FlaskConical,
    Users,
    FileDown,
    Mail,
    PenSquare,
    MapPin,
    Share2,
    Leaf,
    ArrowUp,
    ChevronRight,
    Phone,
    MessageCircle,
} from "lucide-react";

/* ── Edit this list to change what shows in the hub ── */
const ITEMS = [
    {
        icon: Building2,
        label: "Company",
        sub: "About Okhai Pharma",
        to: "/about",
        color: "from-emerald-500 to-teal-600",
    },
    {
        icon: FlaskConical,
        label: "Products",
        sub: "Our Pharmaceutical Range",
        to: "/products",
        color: "from-blue-500 to-cyan-600",
    },
    {
        icon: Users,
        label: "Leadership",
        sub: "Meet Our Leaders",
        to: "/leadership",
        color: "from-purple-500 to-indigo-600",
    },
    {
        icon: FileDown,
        label: "Download Brochure",
        sub: "Company Brochure (PDF)",
        href: "/brochure.pdf",
        download: true,
        color: "from-orange-500 to-red-600",
    },
    {
        icon: Mail,
        label: "Contact Us",
        sub: "Phone, Email & Address",
        to: "/contact",
        color: "from-pink-500 to-rose-600",
    },
    {
        icon: PenSquare,
        label: "Send Inquiry",
        sub: "Drop us a message",
        to: "/contact",
        color: "from-amber-500 to-yellow-600",
    },
    {
        icon: MapPin,
        label: "Our Location",
        sub: "Find us on Map",
        href: "https://maps.google.com/?q=Okhai+Pharma+Intermediates",
        external: true,
        color: "from-green-500 to-lime-600",
    },
    {
        icon: Share2,
        label: "Follow Us",
        sub: "LinkedIn & Social Media",
        href: "https://www.linkedin.com",
        external: true,
        color: "from-sky-500 to-blue-600",
    },
];

const WHATSAPP_NUMBER = "919999999999";
const CALL_NUMBER = "+919999999999";

function IconTile({ Icon, color }) {
    return (
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl overflow-hidden group-hover:scale-110 transition-transform duration-300">
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity`} />
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity`} />
            <Icon className="h-5 w-5 text-emerald-700 relative z-10" strokeWidth={2.2} />
        </div>
    );
}

function Row({ item, onNavigate, index }) {
    const Icon = item.icon;
    const content = (
        <>
            <IconTile Icon={Icon} color={item.color} />
            <span className="min-w-0 flex-1 text-left">
                <span className="block text-[13.5px] font-semibold text-[#0f2419] leading-tight group-hover:text-emerald-700 transition-colors">
                    {item.label}
                </span>
                <span className="block text-[11.5px] text-[#4a6b5a] leading-tight mt-0.5">
                    {item.sub}
                </span>
            </span>
            <ChevronRight className="h-4 w-4 text-emerald-600/40 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0" strokeWidth={2.5} />
        </>
    );

    const rowClass =
        "group flex w-full items-center gap-3.5 rounded-2xl px-4 py-3.5 transition-all hover:bg-gradient-to-r hover:from-emerald-50/80 hover:to-teal-50/50 hover:shadow-sm active:scale-[0.98]";

    const motionProps = {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        transition: { delay: index * 0.05, duration: 0.3 },
    };

    if (item.to) {
        return (
            <motion.div {...motionProps}>
                <Link to={item.to} onClick={onNavigate} className={rowClass}>
                    {content}
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.div {...motionProps}>
            <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                download={item.download || undefined}
                onClick={onNavigate}
                className={rowClass}
            >
                {content}
            </a>
        </motion.div>
    );
}

export default function QuickAccessHub() {
    const [open, setOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const panelRef = useRef(null);
    const btnRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 400);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!open) return;
        const handleClick = (e) => {
            if (
                panelRef.current &&
                !panelRef.current.contains(e.target) &&
                btnRef.current &&
                !btnRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const handleKey = (e) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [open]);

    useEffect(() => {
        if (open && window.innerWidth < 480) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = prev;
            };
        }
    }, [open]);

    return (
        <>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 z-[65] bg-black/20 backdrop-blur-sm sm:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setOpen(false)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={panelRef}
                        role="dialog"
                        aria-label="Quick access hub"
                        initial={{ opacity: 0, y: 20, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.92 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed z-[70] bottom-[6.75rem] right-4 sm:right-6 w-[calc(100vw-2rem)] max-w-[360px] max-h-[calc(100vh-9rem)] overflow-hidden rounded-[2rem] border border-emerald-100/80 bg-white/95 backdrop-blur-xl shadow-2xl shadow-emerald-900/20"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white/20 to-teal-50/40 pointer-events-none" />
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-teal-200/30 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative sticky top-0 z-10 backdrop-blur-xl bg-white/80 border-b border-emerald-100/50">
                            <div className="flex items-center justify-between px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30">
                                        <Leaf className="h-5 w-5 text-white" strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#0f2419] leading-tight">
                                            Quick Access
                                        </p>
                                        <p className="text-[11px] text-[#4a6b5a] mt-0.5">
                                            Everything you need
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setOpen(false)}
                                    aria-label="Close quick access hub"
                                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all active:scale-95"
                                >
                                    <X className="h-4.5 w-4.5" strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>

                        <div className="relative overflow-y-auto max-h-[calc(100vh-20rem)] px-3 py-3">
                            <div className="flex flex-col gap-1">
                                {ITEMS.map((item, index) => (
                                    <Row key={item.label} item={item} index={index} onNavigate={() => setOpen(false)} />
                                ))}
                            </div>
                        </div>

                        <div className="relative px-4 pb-4 pt-3 border-t border-emerald-100/50 backdrop-blur-xl bg-white/80">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="grid grid-cols-2 gap-3"
                            >
                                <a
                                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] px-4 py-3.5 text-white shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all active:scale-95"
                                >
                                    <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" strokeWidth={2.2} />
                                    <span className="text-[12px] font-semibold">WhatsApp</span>
                                </a>
                                <a
                                    href={`tel:${CALL_NUMBER}`}
                                    className="group flex flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[#f97316] to-[#ea580c] px-4 py-3.5 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all active:scale-95"
                                >
                                    <Phone className="h-5 w-5 group-hover:scale-110 transition-transform" strokeWidth={2.2} />
                                    <span className="text-[12px] font-semibold">Call Now</span>
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        aria-label="Scroll to top"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        whileHover={{ scale: 1.08, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="fixed z-[70] bottom-6 right-[5.5rem] sm:right-[6rem] flex h-14 w-14 items-center justify-center rounded-full bg-white text-emerald-700 border-2 border-emerald-200 shadow-xl shadow-emerald-900/15 hover:bg-emerald-50 hover:border-emerald-300 transition-all backdrop-blur-sm"
                    >
                        <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
                    </motion.button>
                )}
            </AnimatePresence>

            <motion.button
                ref={btnRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close quick access hub" : "Open quick access hub"}
                aria-expanded={open}
                className="fixed z-[70] bottom-6 right-4 sm:right-6 flex h-16 w-16 items-center justify-center rounded-full text-white shadow-2xl shadow-emerald-900/40 overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                animate={{ rotate: open ? 135 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-200%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {!open && (
                    <motion.span
                        className="absolute inset-0 rounded-full bg-emerald-400/60"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                    />
                )}

                <AnimatePresence mode="wait" initial={false}>
                    {open ? (
                        <motion.span
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                            className="relative z-10"
                        >
                            <X className="h-6 w-6" strokeWidth={2.5} />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="leaf"
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            transition={{ duration: 0.2 }}
                            className="relative z-10"
                        >
                            <Leaf className="h-7 w-7" strokeWidth={2.5} />
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>
        </>
    );
}
