import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import product1 from "@/assets/products/product1.png";
import product2 from "@/assets/products/product2.png";

const PRODUCTS = [
    {
        id: "sulfate40",
        name: "Nicotine Sulphate 40%",
        tagline: "Pharmaceutical Grade",
        image: product1,
    },
    {
        id: "alkaloid",
        name: "Nicotine Alkaloid 90% / 95%",
        tagline: "Premium Extract",
        image: product2,
    },
];

export function LogoMark({ className = "h-9 w-auto" }) {
    return (
        <img
            src={logo}
            alt="Okhai Pharma Logo"
            className={`${className} object-contain`}
        // Remove the style={{ mixBlendMode: "multiply" }} line
        />
    );
}

export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("Home");
    const [productsOpen, setProductsOpen] = useState(false);
    const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
    const [hoveredProduct, setHoveredProduct] = useState(null);

    const dropdownRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const path = location.pathname;
        let name = "Home";
        if (path.startsWith("/about")) name = "About Us";
        else if (path.startsWith("/leadership")) name = "Leadership";
        else if (path.startsWith("/products")) name = "Products";
        else if (path.startsWith("/contact")) name = "Contact Us";
        setActiveLink(name);
    }, [location]);

    useEffect(() => {
        const handleClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setProductsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
        setMobileProductsOpen(false);
    }, [location]);

    const handleProductClick = (productId) => {
        setProductsOpen(false);
        setMenuOpen(false);
        setMobileProductsOpen(false);
        navigate(`/products?product=${productId}`);
    };

    const links = ["Home", "About Us", "Leadership", "Products", "Brochure", "Contact Us"];

    return (
        <header className="nav-header fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
            <div className="nav-inner mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center py-2">
                    <LogoMark className="max-h-16 w-auto" />
                </Link>

                {/* Desktop Nav */}
                <nav className="nav-links hidden md:flex items-center gap-8 text-sm">
                    {links.map((l) => {
                        const key = l.toLowerCase();
                        const isActive = activeLink === l;
                        const base = isActive
                            ? "text-green-700 font-extrabold"
                            : "text-foreground/80 hover:text-primary";
                        const linkClass = `${base} transition-colors`;

                        if (key === "products") {
                            return (
                                <div
                                    key={l}
                                    ref={dropdownRef}
                                    className="relative"
                                    onMouseEnter={() => setProductsOpen(true)}
                                    onMouseLeave={() => setProductsOpen(false)}
                                >
                                    {/* Trigger */}
                                    <button
                                        className={`${linkClass} flex items-center gap-1.5 py-1`}
                                        onClick={() => setProductsOpen((v) => !v)}
                                    >
                                        {l}
                                        <motion.svg
                                            animate={{ rotate: productsOpen ? 180 : 0 }}
                                            transition={{ duration: 0.22, ease: "easeOut" }}
                                            className="w-3.5 h-3.5 mt-0.5 text-primary/60"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2.5}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </motion.svg>
                                    </button>

                                    {/* ── Dropdown panel ── */}
                                    <AnimatePresence>
                                        {productsOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 12, scale: 0.97 }}
                                                transition={{ duration: 0.22, ease: "easeOut" }}
                                                /* Light green bg matching site theme */
                                                className="absolute top-full left-1/2 -translate-x-1/2 mt-5 w-[30rem] rounded-2xl border border-emerald-200/80 shadow-2xl overflow-hidden"
                                                style={{ background: "linear-gradient(160deg,#edfaf3 0%,#f0fdf4 60%,#e8f5ee 100%)" }}
                                            >
                                                {/* Thin green accent line at top */}
                                                <div className="h-[3px] w-full bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400" />

                                                <div className="px-4 pt-3 pb-4">
                                                    {/* Header label */}
                                                    <p className="text-[10px] uppercase tracking-[0.32em] text-green-700/60 font-semibold mb-3 px-1">
                                                        Our Products
                                                    </p>

                                                    {/* ── Two cards side by side ── */}
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {PRODUCTS.map((p) => (
                                                            <motion.button
                                                                key={p.id}
                                                                onClick={() => handleProductClick(p.id)}
                                                                onHoverStart={() => setHoveredProduct(p.id)}
                                                                onHoverEnd={() => setHoveredProduct(null)}
                                                                className="flex flex-col items-center text-center rounded-2xl px-4 py-5 transition-all duration-200 cursor-pointer border"
                                                                animate={{
                                                                    backgroundColor:
                                                                        hoveredProduct === p.id
                                                                            ? "#ffffff"
                                                                            : "rgba(255,255,255,0.70)",
                                                                    borderColor:
                                                                        hoveredProduct === p.id
                                                                            ? "rgba(52,168,100,0.35)"
                                                                            : "rgba(209,250,229,0.8)",
                                                                    boxShadow:
                                                                        hoveredProduct === p.id
                                                                            ? "0 8px 24px rgba(52,168,100,0.13)"
                                                                            : "0 2px 8px rgba(52,168,100,0.06)",
                                                                    y: hoveredProduct === p.id ? -3 : 0,
                                                                }}
                                                                transition={{ duration: 0.18 }}
                                                            >
                                                                {/* Product image – centered, top of card */}
                                                                <div className="w-20 h-20 rounded-xl overflow-hidden mb-3 shrink-0 border border-emerald-100">
                                                                    <motion.img
                                                                        src={p.image}
                                                                        alt={p.name}
                                                                        className="w-full h-full object-cover"
                                                                        animate={{
                                                                            scale: hoveredProduct === p.id ? 1.07 : 1,
                                                                        }}
                                                                        transition={{ duration: 0.28 }}
                                                                    />
                                                                </div>

                                                                {/* Name */}
                                                                <p className="text-sm font-bold text-gray-800 leading-snug">
                                                                    {p.name}
                                                                </p>

                                                                {/* Tagline */}
                                                                <p className="text-xs text-green-700/70 mt-1 font-medium">
                                                                    {p.tagline}
                                                                </p>
                                                            </motion.button>
                                                        ))}
                                                    </div>



                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        }
                        if (key === "about us") return <Link key={l} to="/about" className={linkClass}>{l}</Link>;
                        if (key === "home") return <Link key={l} to="/" className={linkClass}>{l}</Link>;
                        if (key === "leadership") return <Link key={l} to="/leadership" className={linkClass}>{l}</Link>;
                        if (key === "contact us") return <Link key={l} to="/contact" className={linkClass}>{l}</Link>;
                        return <a key={l} href={`#${key}`} className={linkClass}>{l}</a>;
                    })}
                </nav>

                <Link
                    to="/contact"
                    className="nav-cta hidden md:inline-flex items-center rounded-full bg-foreground text-background px-5 py-2 text-sm hover:bg-primary transition-colors"
                >
                    Get a quote
                </Link>

                {/* Mobile hamburger */}
                <button
                    className="mobile-menu-btn md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 p-1"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                    <span className={`block h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                    <span className={`block h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="mobile-nav md:hidden bg-background/98 backdrop-blur border-b border-border/50 px-6 py-4 flex flex-col gap-1"
                    >
                        {links.map((l) => {
                            const key = l.toLowerCase();
                            const isActive = activeLink === l;
                            const base = isActive
                                ? "text-green-700 font-extrabold"
                                : "text-foreground/80 hover:text-primary";
                            const common = `${base} transition-colors text-sm py-2.5 block`;

                            if (key === "products") {
                                return (
                                    <div key={l}>
                                        {/* Mobile Products accordion */}
                                        <button
                                            className={`w-full flex items-center justify-between text-sm py-2.5 ${isActive ? "text-green-700 font-extrabold" : "text-foreground/80"}`}
                                            onClick={() => setMobileProductsOpen((v) => !v)}
                                        >
                                            <span>Products</span>
                                            <motion.svg
                                                animate={{ rotate: mobileProductsOpen ? 180 : 0 }}
                                                transition={{ duration: 0.22 }}
                                                className="w-3.5 h-3.5 text-primary/60"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2.5}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </motion.svg>
                                        </button>

                                        <AnimatePresence>
                                            {mobileProductsOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.22, ease: "easeOut" }}
                                                    className="overflow-hidden"
                                                >
                                                    {/* Mobile: two mini cards side by side */}
                                                    <div className="grid grid-cols-2 gap-2 py-2 px-1">
                                                        {PRODUCTS.map((p) => (
                                                            <button
                                                                key={p.id}
                                                                onClick={() => handleProductClick(p.id)}
                                                                className="flex flex-col items-center text-center rounded-xl px-3 py-3 bg-emerald-50 border border-emerald-100 hover:bg-white hover:border-emerald-300 transition-all"
                                                            >
                                                                <div className="w-14 h-14 rounded-lg overflow-hidden mb-2 border border-emerald-100">
                                                                    <img
                                                                        src={p.image}
                                                                        alt={p.name}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                                <p className="text-xs font-bold text-gray-800 leading-snug">{p.name}</p>
                                                                <p className="text-[10px] text-green-700/70 mt-0.5">{p.tagline}</p>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            }

                            if (key === "about us") return <Link key={l} to="/about" onClick={() => setMenuOpen(false)} className={common}>{l}</Link>;
                            if (key === "home") return <Link key={l} to="/" onClick={() => setMenuOpen(false)} className={common}>{l}</Link>;
                            if (key === "leadership") return <Link key={l} to="/leadership" onClick={() => setMenuOpen(false)} className={common}>{l}</Link>;
                            if (key === "contact us") return <Link key={l} to="/contact" onClick={() => setMenuOpen(false)} className={common}>{l}</Link>;
                            return <a key={l} href={`#${key}`} onClick={() => setMenuOpen(false)} className={common}>{l}</a>;
                        })}

                        <Link
                            to="/contact"
                            onClick={() => setMenuOpen(false)}
                            className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-5 py-2 text-sm hover:bg-primary transition-colors mt-3"
                        >
                            Get a quote
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}