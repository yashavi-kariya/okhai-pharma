import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import product1 from "@/assets/products/product1.png";
import product2 from "@/assets/products/product2.png";

const PRODUCTS = [
    {
        id: "sulfate40",
        slug: "nicotine-sulfate-40",
        name: "Nicotine Sulphate 40%",
        tagline: "Pharmaceutical Grade",
        image: product1,
    },
    {
        id: "alkaloid",
        slug: "nicotine-alkaloid-90-95",
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

/* ── Shared-layout underline. Because every active link renders the
   same layoutId, Framer Motion automatically animates it sliding
   from its old position to its new one whenever the active link
   changes — no manual coordinate math needed. ── */
function NavUnderline({ layoutId = "nav-active-underline" }) {
    return (
        <motion.span
            layoutId={layoutId}
            className="absolute left-0 right-0 -bottom-1.5 h-[2px] rounded-full bg-green-600"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
    );
}

/* ── Leaf-shaped glow that sits behind a nav item — an actual leaf
   silhouette (pointed tip, rounded base, center vein) in the same
   sage/olive palette as the hero leaves and logo, not an abstract
   blob. Fades/grows in on hover, flares brighter and bigger on click. ── */
function LeafGlow({ active, pulse, size = 46 }) {
    const uid = useRef(`leaf-${Math.random().toString(36).slice(2, 9)}`);
    return (
        <motion.svg
            aria-hidden
            viewBox="0 0 100 130"
            className="absolute left-1/2 top-1/2 pointer-events-none -z-10"
            style={{
                width: size,
                height: size * 1.3,
                marginLeft: -size / 2,
                marginTop: -(size * 1.3) / 2,
            }}
            initial={false}
            animate={{
                opacity: active ? (pulse ? 1 : 0.7) : 0,
                scale: active ? (pulse ? 1.3 : 1) : 0.55,
                rotate: active ? -8 : -20,
            }}
            transition={{ duration: pulse ? 0.4 : 0.25, ease: "easeOut" }}
        >
            <defs>
                <radialGradient id={uid.current} cx="38%" cy="24%" r="80%">
                    <stop offset="0%" stopColor="#a7f3c9" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#4ade80" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#15803d" stopOpacity="0" />
                </radialGradient>
            </defs>
            {/* Leaf blade: pointed tip at top, rounded, tapering base */}
            <path
                d="M50 4
                   C78 22 92 54 88 78
                   C85 96 70 116 50 126
                   C30 116 15 96 12 78
                   C8 54 22 22 50 4 Z"
                fill={`url(#${uid.current})`}
            />
            {/* Center vein */}
            <path
                d="M50 14 C50 48 50 92 50 122"
                stroke="#166534"
                strokeOpacity="0.4"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
            />
            {/* Side veins */}
            <path
                d="M50 38 C40 44 33 50 27 56 M50 38 C60 44 67 50 73 56
                   M50 66 C41 72 35 78 30 84 M50 66 C59 72 65 78 70 84"
                stroke="#166534"
                strokeOpacity="0.28"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
            />
        </motion.svg>
    );
}

export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("Home");
    const [productsOpen, setProductsOpen] = useState(false);
    const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
    const [hoveredProduct, setHoveredProduct] = useState(null);

    // Which nav item currently shows its leaf glow (hover), and which
    // one is mid-pulse (click flare).
    const [hoveredKey, setHoveredKey] = useState(null);
    const [pulseKey, setPulseKey] = useState(null);
    const pulseTimeout = useRef(null);

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

    useEffect(() => {
        return () => {
            if (pulseTimeout.current) window.clearTimeout(pulseTimeout.current);
        };
    }, []);

    /* ── Flares the leaf glow for a given item on click, then lets it
       settle back to its hover (or idle) state. ── */
    const triggerPulse = (key) => {
        setPulseKey(key);
        if (pulseTimeout.current) window.clearTimeout(pulseTimeout.current);
        pulseTimeout.current = window.setTimeout(() => {
            setPulseKey((p) => (p === key ? null : p));
        }, 380);
    };

    const handleProductClick = (productId) => {
        setProductsOpen(false);
        setMenuOpen(false);
        setMobileProductsOpen(false);
        const product = PRODUCTS.find((p) => p.id === productId);
        navigate(product ? `/products?product=${product.id}` : "/products");
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
                        const linkClass = `${base} transition-colors relative pb-1.5`;
                        const isGlowing = hoveredKey === key || pulseKey === key;

                        if (key === "products") {
                            return (
                                <div
                                    key={l}
                                    ref={dropdownRef}
                                    className="relative"
                                    onMouseEnter={() => setHoveredKey(key)}
                                    onMouseLeave={() => setHoveredKey(null)}
                                >
                                    {/* Trigger */}
                                    <button
                                        className={`${linkClass} flex items-center gap-1.5 py-1`}
                                        onClick={() => {
                                            triggerPulse(key);
                                            setProductsOpen((v) => !v);
                                        }}
                                    >
                                        <LeafGlow active={isGlowing} pulse={pulseKey === key} />
                                        <span className="relative z-10 flex items-center gap-1.5">
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
                                        </span>
                                        {isActive && <NavUnderline />}
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
                                                className="absolute top-full left-1/2 -translate-x-1/2 mt-5 min-w-[22rem] w-[min(30rem,calc(100vw-2rem))] rounded-2xl border border-emerald-200/80 shadow-2xl overflow-hidden"
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
                                                                onClick={() => {
                                                                    triggerPulse(p.id);
                                                                    handleProductClick(p.id);
                                                                }}
                                                                onHoverStart={() => setHoveredProduct(p.id)}
                                                                onHoverEnd={() => setHoveredProduct(null)}
                                                                className="relative flex flex-col items-center text-center rounded-2xl px-4 py-5 transition-all duration-200 cursor-pointer border overflow-hidden"
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
                                                                <LeafGlow
                                                                    active={hoveredProduct === p.id || pulseKey === p.id}
                                                                    pulse={pulseKey === p.id}
                                                                    size={70}
                                                                />
                                                                {/* Product image – centered, top of card */}
                                                                <div className="relative z-10 w-20 h-20 rounded-xl overflow-hidden mb-3 shrink-0 border border-emerald-100">
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
                                                                <p className="relative z-10 text-sm font-bold text-gray-800 leading-snug">
                                                                    {p.name}
                                                                </p>

                                                                {/* Tagline */}
                                                                <p className="relative z-10 text-xs text-green-700/70 mt-1 font-medium">
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

                        const navigateTo =
                            key === "about us" ? "/about" :
                                key === "home" ? "/" :
                                    key === "leadership" ? "/leadership" :
                                        key === "contact us" ? "/contact" : null;

                        if (navigateTo) {
                            return (
                                <Link
                                    key={l}
                                    to={navigateTo}
                                    onMouseEnter={() => setHoveredKey(key)}
                                    onMouseLeave={() => setHoveredKey(null)}
                                    onClick={() => triggerPulse(key)}
                                    className={linkClass}
                                >
                                    <LeafGlow active={isGlowing} pulse={pulseKey === key} />
                                    <span className="relative z-10">{l}</span>
                                    {isActive && <NavUnderline />}
                                </Link>
                            );
                        }

                        return (
                            <a
                                key={l}
                                href={`#${key}`}
                                onMouseEnter={() => setHoveredKey(key)}
                                onMouseLeave={() => setHoveredKey(null)}
                                onClick={() => triggerPulse(key)}
                                className={linkClass}
                            >
                                <LeafGlow active={isGlowing} pulse={pulseKey === key} />
                                <span className="relative z-10">{l}</span>
                            </a>
                        );
                    })}
                </nav>

                <a
                    href="/brochure.pdf"
                    download
                    onMouseEnter={() => setHoveredKey("cta")}
                    onMouseLeave={() => setHoveredKey(null)}
                    onClick={() => triggerPulse("cta")}
                    className="nav-cta hidden md:inline-flex items-center rounded-full bg-foreground text-background px-5 py-2 text-sm hover:bg-primary transition-colors relative overflow-hidden"
                >
                    <LeafGlow active={hoveredKey === "cta" || pulseKey === "cta"} pulse={pulseKey === "cta"} size={64} />
                    <span className="relative z-10">Download Brochure</span>
                </a>

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
                            const accent = isActive
                                ? "border-l-2 border-green-600 pl-3"
                                : "border-l-2 border-transparent pl-3";
                            const common = `${base} ${accent} transition-colors text-sm py-2.5 block relative overflow-hidden`;

                            if (key === "products") {
                                return (
                                    <div key={l}>
                                        {/* Mobile Products accordion */}
                                        <button
                                            className={`relative overflow-hidden w-full flex items-center justify-between text-sm py-2.5 ${isActive ? "text-green-700 font-extrabold" : "text-foreground/80"} ${accent}`}
                                            onClick={() => {
                                                triggerPulse("m-products");
                                                setMobileProductsOpen((v) => !v);
                                            }}
                                        >
                                            <LeafGlow active={pulseKey === "m-products"} pulse={pulseKey === "m-products"} />
                                            <span className="relative z-10">Products</span>
                                            <motion.svg
                                                animate={{ rotate: mobileProductsOpen ? 180 : 0 }}
                                                transition={{ duration: 0.22 }}
                                                className="relative z-10 w-3.5 h-3.5 text-primary/60"
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
                                                                onClick={() => {
                                                                    triggerPulse(p.id);
                                                                    handleProductClick(p.id);
                                                                }}
                                                                className="relative overflow-hidden flex flex-col items-center text-center rounded-xl px-3 py-3 bg-emerald-50 border border-emerald-100 hover:bg-white hover:border-emerald-300 transition-all"
                                                            >
                                                                <LeafGlow active={pulseKey === p.id} pulse={pulseKey === p.id} size={64} />
                                                                <div className="relative z-10 w-14 h-14 rounded-lg overflow-hidden mb-2 border border-emerald-100">
                                                                    <img
                                                                        src={p.image}
                                                                        alt={p.name}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                                <p className="relative z-10 text-xs font-bold text-gray-800 leading-snug">{p.name}</p>
                                                                <p className="relative z-10 text-[10px] text-green-700/70 mt-0.5">{p.tagline}</p>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            }

                            const navigateTo =
                                key === "about us" ? "/about" :
                                    key === "home" ? "/" :
                                        key === "leadership" ? "/leadership" :
                                            key === "contact us" ? "/contact" : null;

                            if (navigateTo) {
                                return (
                                    <Link
                                        key={l}
                                        to={navigateTo}
                                        onClick={() => {
                                            triggerPulse(key);
                                            setMenuOpen(false);
                                        }}
                                        className={common}
                                    >
                                        <LeafGlow active={pulseKey === key} pulse={pulseKey === key} />
                                        <span className="relative z-10">{l}</span>
                                    </Link>
                                );
                            }

                            return (
                                <a
                                    key={l}
                                    href={`#${key}`}
                                    onClick={() => {
                                        triggerPulse(key);
                                        setMenuOpen(false);
                                    }}
                                    className={common}
                                >
                                    <LeafGlow active={pulseKey === key} pulse={pulseKey === key} />
                                    <span className="relative z-10">{l}</span>
                                </a>
                            );
                        })}

                        <a
                            href="/brochure.pdf"
                            download
                            onClick={() => {
                                triggerPulse("cta");
                                setMenuOpen(false);
                            }}
                            className="relative overflow-hidden inline-flex items-center justify-center rounded-full bg-foreground text-background px-5 py-2 text-sm hover:bg-primary transition-colors mt-3"
                        >
                            <LeafGlow active={pulseKey === "cta"} pulse={pulseKey === "cta"} size={64} />
                            <span className="relative z-10">Download Brochure</span>
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect, useRef } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png";
// import product1 from "@/assets/products/product1.png";
// import product2 from "@/assets/products/product2.png";

// const PRODUCTS = [
//     {
//         id: "sulfate40",
//         slug: "nicotine-sulfate-40",
//         name: "Nicotine Sulphate 40%",
//         tagline: "Pharmaceutical Grade",
//         image: product1,
//     },
//     {
//         id: "alkaloid",
//         slug: "nicotine-alkaloid-90-95",
//         name: "Nicotine Alkaloid 90% / 95%",
//         tagline: "Premium Extract",
//         image: product2,
//     },
// ];

// export function LogoMark({ className = "h-9 w-auto" }) {
//     return (
//         <img
//             src={logo}
//             alt="Okhai Pharma Logo"
//             className={`${className} object-contain`}
//         // Remove the style={{ mixBlendMode: "multiply" }} line
//         />
//     );
// }

// export default function Nav() {
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [activeLink, setActiveLink] = useState("Home");
//     const [productsOpen, setProductsOpen] = useState(false);
//     const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
//     const [hoveredProduct, setHoveredProduct] = useState(null);

//     const dropdownRef = useRef(null);
//     const location = useLocation();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const path = location.pathname;
//         let name = "Home";
//         if (path.startsWith("/about")) name = "About Us";
//         else if (path.startsWith("/leadership")) name = "Leadership";
//         else if (path.startsWith("/products")) name = "Products";
//         else if (path.startsWith("/contact")) name = "Contact Us";
//         setActiveLink(name);
//     }, [location]);

//     useEffect(() => {
//         const handleClick = (e) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//                 setProductsOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClick);
//         return () => document.removeEventListener("mousedown", handleClick);
//     }, []);

//     useEffect(() => {
//         setMenuOpen(false);
//         setMobileProductsOpen(false);
//     }, [location]);

//     const handleProductClick = (productId) => {
//         setProductsOpen(false);
//         setMenuOpen(false);
//         setMobileProductsOpen(false);
//         const product = PRODUCTS.find((p) => p.id === productId);
//         navigate(product ? `/products?product=${product.id}` : "/products");
//     };

//     const links = ["Home", "About Us", "Leadership", "Products", "Brochure", "Contact Us"];

//     return (
//         <header className="nav-header fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
//             <div className="nav-inner mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">

//                 {/* Logo */}
//                 <Link to="/" className="flex items-center py-2">
//                     <LogoMark className="max-h-16 w-auto" />
//                 </Link>

//                 {/* Desktop Nav */}
//                 <nav className="nav-links hidden md:flex items-center gap-8 text-sm">
//                     {links.map((l) => {
//                         const key = l.toLowerCase();
//                         const isActive = activeLink === l;
//                         const base = isActive
//                             ? "text-green-700 font-extrabold"
//                             : "text-foreground/80 hover:text-primary";
//                         const linkClass = `${base} transition-colors`;

//                         if (key === "products") {
//                             return (
//                                 <div
//                                     key={l}
//                                     ref={dropdownRef}
//                                     className="relative"
//                                     onMouseEnter={() => setProductsOpen(true)}
//                                     onMouseLeave={() => setProductsOpen(false)}
//                                 >
//                                     {/* Trigger */}
//                                     <button
//                                         className={`${linkClass} flex items-center gap-1.5 py-1`}
//                                         onClick={() => setProductsOpen((v) => !v)}
//                                     >
//                                         {l}
//                                         <motion.svg
//                                             animate={{ rotate: productsOpen ? 180 : 0 }}
//                                             transition={{ duration: 0.22, ease: "easeOut" }}
//                                             className="w-3.5 h-3.5 mt-0.5 text-primary/60"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                             strokeWidth={2.5}
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//                                         </motion.svg>
//                                     </button>

//                                     {/* ── Dropdown panel ── */}
//                                     <AnimatePresence>
//                                         {productsOpen && (
//                                             <motion.div
//                                                 initial={{ opacity: 0, y: 12, scale: 0.97 }}
//                                                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                                                 exit={{ opacity: 0, y: 12, scale: 0.97 }}
//                                                 transition={{ duration: 0.22, ease: "easeOut" }}
//                                                 /* Light green bg matching site theme */
//                                                 className="absolute top-full left-1/2 -translate-x-1/2 mt-5 min-w-[22rem] w-[min(30rem,calc(100vw-2rem))] rounded-2xl border border-emerald-200/80 shadow-2xl overflow-hidden"
//                                                 style={{ background: "linear-gradient(160deg,#edfaf3 0%,#f0fdf4 60%,#e8f5ee 100%)" }}
//                                             >
//                                                 {/* Thin green accent line at top */}
//                                                 <div className="h-[3px] w-full bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400" />

//                                                 <div className="px-4 pt-3 pb-4">
//                                                     {/* Header label */}
//                                                     <p className="text-[10px] uppercase tracking-[0.32em] text-green-700/60 font-semibold mb-3 px-1">
//                                                         Our Products
//                                                     </p>

//                                                     {/* ── Two cards side by side ── */}
//                                                     <div className="grid grid-cols-2 gap-3">
//                                                         {PRODUCTS.map((p) => (
//                                                             <motion.button
//                                                                 key={p.id}
//                                                                 onClick={() => handleProductClick(p.id)}
//                                                                 onHoverStart={() => setHoveredProduct(p.id)}
//                                                                 onHoverEnd={() => setHoveredProduct(null)}
//                                                                 className="flex flex-col items-center text-center rounded-2xl px-4 py-5 transition-all duration-200 cursor-pointer border"
//                                                                 animate={{
//                                                                     backgroundColor:
//                                                                         hoveredProduct === p.id
//                                                                             ? "#ffffff"
//                                                                             : "rgba(255,255,255,0.70)",
//                                                                     borderColor:
//                                                                         hoveredProduct === p.id
//                                                                             ? "rgba(52,168,100,0.35)"
//                                                                             : "rgba(209,250,229,0.8)",
//                                                                     boxShadow:
//                                                                         hoveredProduct === p.id
//                                                                             ? "0 8px 24px rgba(52,168,100,0.13)"
//                                                                             : "0 2px 8px rgba(52,168,100,0.06)",
//                                                                     y: hoveredProduct === p.id ? -3 : 0,
//                                                                 }}
//                                                                 transition={{ duration: 0.18 }}
//                                                             >
//                                                                 {/* Product image – centered, top of card */}
//                                                                 <div className="w-20 h-20 rounded-xl overflow-hidden mb-3 shrink-0 border border-emerald-100">
//                                                                     <motion.img
//                                                                         src={p.image}
//                                                                         alt={p.name}
//                                                                         className="w-full h-full object-cover"
//                                                                         animate={{
//                                                                             scale: hoveredProduct === p.id ? 1.07 : 1,
//                                                                         }}
//                                                                         transition={{ duration: 0.28 }}
//                                                                     />
//                                                                 </div>

//                                                                 {/* Name */}
//                                                                 <p className="text-sm font-bold text-gray-800 leading-snug">
//                                                                     {p.name}
//                                                                 </p>

//                                                                 {/* Tagline */}
//                                                                 <p className="text-xs text-green-700/70 mt-1 font-medium">
//                                                                     {p.tagline}
//                                                                 </p>
//                                                             </motion.button>
//                                                         ))}
//                                                     </div>



//                                                 </div>
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>
//                                 </div>
//                             );
//                         }
//                         if (key === "about us") return <Link key={l} to="/about" className={linkClass}>{l}</Link>;
//                         if (key === "home") return <Link key={l} to="/" className={linkClass}>{l}</Link>;
//                         if (key === "leadership") return <Link key={l} to="/leadership" className={linkClass}>{l}</Link>;
//                         if (key === "contact us") return <Link key={l} to="/contact" className={linkClass}>{l}</Link>;
//                         return <a key={l} href={`#${key}`} className={linkClass}>{l}</a>;
//                     })}
//                 </nav>

//                 <Link
//                     to="/contact"
//                     className="nav-cta hidden md:inline-flex items-center rounded-full bg-foreground text-background px-5 py-2 text-sm hover:bg-primary transition-colors"
//                 >
//                     Get a quote
//                 </Link>

//                 {/* Mobile hamburger */}
//                 <button
//                     className="mobile-menu-btn md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 p-1"
//                     onClick={() => setMenuOpen(!menuOpen)}
//                     aria-label="Toggle menu"
//                 >
//                     <span className={`block h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
//                     <span className={`block h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
//                     <span className={`block h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
//                 </button>
//             </div>

//             {/* Mobile menu */}
//             <AnimatePresence>
//                 {menuOpen && (
//                     <motion.div
//                         initial={{ opacity: 0, y: -8 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -8 }}
//                         transition={{ duration: 0.2 }}
//                         className="mobile-nav md:hidden bg-background/98 backdrop-blur border-b border-border/50 px-6 py-4 flex flex-col gap-1"
//                     >
//                         {links.map((l) => {
//                             const key = l.toLowerCase();
//                             const isActive = activeLink === l;
//                             const base = isActive
//                                 ? "text-green-700 font-extrabold"
//                                 : "text-foreground/80 hover:text-primary";
//                             const common = `${base} transition-colors text-sm py-2.5 block`;

//                             if (key === "products") {
//                                 return (
//                                     <div key={l}>
//                                         {/* Mobile Products accordion */}
//                                         <button
//                                             className={`w-full flex items-center justify-between text-sm py-2.5 ${isActive ? "text-green-700 font-extrabold" : "text-foreground/80"}`}
//                                             onClick={() => setMobileProductsOpen((v) => !v)}
//                                         >
//                                             <span>Products</span>
//                                             <motion.svg
//                                                 animate={{ rotate: mobileProductsOpen ? 180 : 0 }}
//                                                 transition={{ duration: 0.22 }}
//                                                 className="w-3.5 h-3.5 text-primary/60"
//                                                 fill="none"
//                                                 viewBox="0 0 24 24"
//                                                 stroke="currentColor"
//                                                 strokeWidth={2.5}
//                                             >
//                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//                                             </motion.svg>
//                                         </button>

//                                         <AnimatePresence>
//                                             {mobileProductsOpen && (
//                                                 <motion.div
//                                                     initial={{ opacity: 0, height: 0 }}
//                                                     animate={{ opacity: 1, height: "auto" }}
//                                                     exit={{ opacity: 0, height: 0 }}
//                                                     transition={{ duration: 0.22, ease: "easeOut" }}
//                                                     className="overflow-hidden"
//                                                 >
//                                                     {/* Mobile: two mini cards side by side */}
//                                                     <div className="grid grid-cols-2 gap-2 py-2 px-1">
//                                                         {PRODUCTS.map((p) => (
//                                                             <button
//                                                                 key={p.id}
//                                                                 onClick={() => handleProductClick(p.id)}
//                                                                 className="flex flex-col items-center text-center rounded-xl px-3 py-3 bg-emerald-50 border border-emerald-100 hover:bg-white hover:border-emerald-300 transition-all"
//                                                             >
//                                                                 <div className="w-14 h-14 rounded-lg overflow-hidden mb-2 border border-emerald-100">
//                                                                     <img
//                                                                         src={p.image}
//                                                                         alt={p.name}
//                                                                         className="w-full h-full object-cover"
//                                                                     />
//                                                                 </div>
//                                                                 <p className="text-xs font-bold text-gray-800 leading-snug">{p.name}</p>
//                                                                 <p className="text-[10px] text-green-700/70 mt-0.5">{p.tagline}</p>
//                                                             </button>
//                                                         ))}
//                                                     </div>
//                                                 </motion.div>
//                                             )}
//                                         </AnimatePresence>
//                                     </div>
//                                 );
//                             }

//                             if (key === "about us") return <Link key={l} to="/about" onClick={() => setMenuOpen(false)} className={common}>{l}</Link>;
//                             if (key === "home") return <Link key={l} to="/" onClick={() => setMenuOpen(false)} className={common}>{l}</Link>;
//                             if (key === "leadership") return <Link key={l} to="/leadership" onClick={() => setMenuOpen(false)} className={common}>{l}</Link>;
//                             if (key === "contact us") return <Link key={l} to="/contact" onClick={() => setMenuOpen(false)} className={common}>{l}</Link>;
//                             return <a key={l} href={`#${key}`} onClick={() => setMenuOpen(false)} className={common}>{l}</a>;
//                         })}

//                         <Link
//                             to="/contact"
//                             onClick={() => setMenuOpen(false)}
//                             className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-5 py-2 text-sm hover:bg-primary transition-colors mt-3"
//                         >
//                             Get a quote
//                         </Link>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </header>
//     );
// }