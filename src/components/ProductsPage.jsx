import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { FloatingLeaves, MeshBlobs, Particles } from "./animated-bg";
import SiteNav from "./SiteHeader";
import "../responsive.css";
import product1 from "@/assets/products/product1.png";
import product2 from "@/assets/products/product2.png";

// Leaf card wrapper with animated organic shape
const LeafCard = ({ children, className, animated = true, delay = 0 }) => {
    const variants = {
        hidden: { opacity: 0, y: 32, scale: 0.95, rotate: -6 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            transition: {
                duration: 0.75,
                delay,
                ease: "easeOut"
            }
        },
        hover: {
            y: -10,
            scale: 1.03,
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.div
            variants={animated ? variants : undefined}
            initial={animated ? "hidden" : undefined}
            whileInView={animated ? "visible" : undefined}
            whileHover={animated ? "hover" : undefined}
            viewport={{ once: true, margin: "-120px" }}
            className={`relative overflow-hidden ${className}`}
        >
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 500"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.14" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
                    </linearGradient>
                </defs>
                <path
                    d="M200 12 C300 62 360 170 320 270 C290 340 240 430 200 488 C160 430 110 340 80 270 C40 170 100 62 200 12 Z"
                    fill="url(#leafGradient)"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    opacity="0.18"
                />
                <path
                    d="M202 18 C210 68 220 140 200 218 C180 296 190 368 188 438"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.18"
                    fill="none"
                />
                <path
                    d="M198 28 C206 80 215 156 200 226"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    opacity="0.12"
                    fill="none"
                />
            </svg>
            <div className="relative z-10 w-full h-full">{children}</div>
        </motion.div>
    );
};

export default function ProductsPage() {
    const [searchParams] = useSearchParams();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(
        searchParams.get("product") || "sulfate40"
    );
    const detailRef = useRef(null);

    // When the URL search param changes (e.g. navigating from the navbar dropdown),
    // update the selected product and scroll to its details section.
    useEffect(() => {
        const productParam = searchParams.get("product");
        if (productParam && (productParam === "sulfate40" || productParam === "alkaloid")) {
            setSelected(productParam);
            // Small delay so the component has time to update before scrolling
            const timer = setTimeout(() => {
                detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 120);
            return () => clearTimeout(timer);
        }
    }, [searchParams]);

    const handleProductSelect = (product) => {
        setSelected(product);
        requestAnimationFrame(() => {
            detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(91,184,154,0.16),transparent_30%),linear-gradient(180deg,#f8fbf7_0%,#eff9f3_100%)] text-foreground overflow-hidden">
            <SiteNav />
            <motion.main
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
                className="relative pt-28 pb-20 overflow-hidden"
            >
                <MeshBlobs className="absolute inset-0" />
                <Particles className="absolute inset-0" />
                <FloatingLeaves className="absolute inset-0" />
                <motion.div
                    className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(76,142,102,0.24),transparent_45%)]"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute left-8 top-24 h-80 w-80 rounded-full bg-linear-to-br from-emerald-200/50 to-transparent blur-3xl"
                    animate={{ y: [0, -24, 0], x: [0, 12, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute right-10 top-28 h-96 w-96 rounded-full bg-linear-to-br from-amber-100/60 to-transparent blur-3xl"
                    animate={{ y: [0, 18, 0], x: [0, -18, 0] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                />

                <section className="relative flex min-h-[calc(100vh-7rem)] items-center overflow-hidden pb-16">
                    <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(91,184,154,0.18),transparent_55%)]" />
                    <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="relative overflow-hidden rounded-[2.5rem] border border-border/70 bg-white/90 backdrop-blur-xl shadow-elevated p-8 lg:p-10"
                        >
                            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.95fr] items-start">
                                <motion.div variants={itemVariants} className="space-y-10">
                                    <motion.div
                                        variants={itemVariants}
                                        className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Products
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="space-y-6">
                                        <motion.h1
                                            className="text-4xl md:text-5xl font-display tracking-tight text-foreground"
                                            animate={{
                                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                            }}
                                            transition={{ duration: 6, repeat: Infinity }}
                                        >
                                            Precision nicotine products with safety and compliance built in.
                                        </motion.h1>
                                        <motion.p
                                            variants={itemVariants}
                                            className="max-w-2xl text-muted-foreground text-lg leading-8"
                                        >
                                            Select either Nicotine Sulphate or Nicotine Alkaloid and review the key applications, storage instructions, and handling guidelines for each product.
                                        </motion.p>
                                    </motion.div>
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="rounded-[2rem] border border-border/70 bg-white/95 p-6 shadow-elevated flex flex-col justify-between"
                                    whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                                >
                                    {/* <div className="space-y-5">
                                        <motion.div variants={itemVariants}>
                                            <p className="text-xs uppercase tracking-[0.28em] text-primary/80">
                                                Product selector
                                            </p>
                                            <h2 className="mt-4 text-2xl font-semibold text-foreground">
                                                Choose a product to explore
                                            </h2>
                                        </motion.div>

                                        <motion.div
                                            variants={itemVariants}
                                            className="rounded-[2rem] border border-border/70 bg-background/80 p-5"
                                        >
                                            <p className="text-sm text-muted-foreground">
                                                Compare two leading nicotine product grades and view their applications, features, and storage guidance.
                                            </p>
                                        </motion.div>
                                    </div> */}

                                    {/* <motion.div variants={itemVariants} className="mt-6 grid gap-3 sm:grid-cols-2">
                                        <motion.button
                                            onClick={() => handleProductSelect("sulfate40")}
                                            className={`rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${selected === "sulfate40" ? "bg-foreground text-background shadow-elevated ring-4 ring-primary/15" : "bg-white text-foreground hover:bg-foreground/10"}`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Nicotine Sulphate 40%
                                        </motion.button>
                                        <motion.button
                                            onClick={() => handleProductSelect("alkaloid")}
                                            className={`rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${selected === "alkaloid" ? "bg-foreground text-background shadow-elevated ring-4 ring-primary/15" : "bg-white text-foreground hover:bg-foreground/10"}`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Nicotine Alkaloid 90% / 95%
                                        </motion.button>
                                    </motion.div> */}
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section ref={detailRef} className="scroll-mt-24 mx-auto max-w-7xl px-6 lg:px-10 pt-10">
                    <AnimatePresence mode="wait">
                        <motion.article
                            key={selected}
                            initial={{ opacity: 0, y: 24, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -24, scale: 0.98 }}
                            transition={{ duration: 0.55, ease: "easeOut" }}
                            className="relative rounded-[2rem] border border-border/70 bg-white/95 p-10 shadow-elevated backdrop-blur-xl overflow-hidden"
                        >
                            {/* Animated gradient background */}
                            <motion.div
                                className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent"
                                animate={{
                                    backgroundPosition: ["0% 0%", "100% 100%"],
                                }}
                                transition={{ duration: 10, repeat: Infinity }}
                                style={{ backgroundSize: "200% 200%" }}
                            />
                            <div className="space-y-10 relative z-10">
                                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-start">
                                    <div className="rounded-[2rem] border border-border/70 bg-background/90 p-4 shadow-soft overflow-hidden">
                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                key={selected}
                                                src={selected === "sulfate40" ? product1 : product2}
                                                alt={selected === "sulfate40" ? "Nicotine Sulphate 40%" : "Nicotine Alkaloid 90% / 95%"}
                                                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                                                transition={{ duration: 0.45, ease: "easeOut" }}
                                                className="w-full rounded-[1.75rem] object-cover"
                                            />
                                        </AnimatePresence>
                                    </div>

                                    <div className="space-y-6">
                                        <h2 className="text-4xl md:text-5xl font-display text-primary">
                                            {selected === "sulfate40" ? "Nicotine Sulphate 40%" : "Nicotine alkaloid 90% / 95%"}
                                        </h2>
                                        <p className="text-muted-foreground leading-8 text-lg">
                                            {selected === "sulfate40"
                                                ? "Nicotine Sulphate 40% is a high-purity, water-soluble nicotine ingredient (40% active) widely used in pharmaceutical formulations, nicotine refinement and scientific research. Manufactured under strict quality controls for consistent, reproducible results."
                                                : "Okhaipharma specializes in supplying premium Nicotine Alkaloids, the most abundant and potent alkaloid extracted from the Nicotiana tabacum plant. We offer two highly concentrated grades: 90% and 95%, serving as the essential building blocks for sophisticated nicotine-based products globally."
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="h-px w-full bg-primary/20" />
                                {selected === "sulfate40" ? (
                                    <div className="space-y-14">
                                        <div className="space-y-6">
                                            <h3 className="text-3xl font-semibold text-primary">Applications of Nicotine Sulphate 40%</h3>
                                            <p className="text-muted-foreground leading-8">Nicotine Sulphate 40% serves as a reliable reagent for research, an intermediate in chemical manufacturing, and a feedstock for nicotine refinement.</p>
                                            <ul className="list-disc pl-5 space-y-3 text-muted-foreground">
                                                <li><strong>Scientific Research:</strong> Reliable reagent for pharmacology, toxicology and neuroscience studies.</li>
                                                <li><strong>Chemical Manufacturing:</strong> Intermediate in the synthesis of nicotine-based compounds.</li>
                                                <li><strong>Nicotine Refinement:</strong> Feedstock for producing high-purity nicotine (up to 99%).</li>
                                            </ul>
                                        </div>
                                        <div className="space-y-6">
                                            <h3 className="text-3xl font-semibold text-primary">Key Features</h3>
                                            <ul className="list-disc pl-5 space-y-3 text-muted-foreground">
                                                <li><strong>Trusted Sourcing:</strong> Raw tobacco procured from certified Indian producers for quality and traceability.</li>
                                                <li><strong>Strict Quality Control:</strong> Each batch undergoes testing to meet defined specifications.</li>
                                                <li><strong>Versatile Applications:</strong> Suitable for R&D, formulation and manufacturing workflows.</li>
                                                <li><strong>Handling Support:</strong> Guidance available for safe use and application.</li>
                                                <li><strong>Customer Service:</strong> Ongoing support for purchasing, storage and regulatory queries.</li>
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-14">
                                        <div className="space-y-6">
                                            <h3 className="text-3xl font-semibold text-primary">Unmatched Quality and Purity Assurance</h3>
                                            <div className="space-y-5 text-muted-foreground leading-8">
                                                <p>We guarantee superior product quality through strict manufacturing protocols. Our alkaloids are produced in an ISO-approved facility utilising proprietary purification processes that ensure exceptionally high purity levels. The resulting product features near-zero foreign residues and the lowest possible impurity profile, providing consistency and minimising yield loss during your formulation processes.</p>
                                                <p><strong>The 95% grade</strong> is specifically tailored for pharmaceutical applications, consistently exceeding the rigorous standards required for API (Active Pharmaceutical Ingredient) use.</p>
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <h3 className="text-3xl font-semibold text-primary">Rigorous Testing and Core Applications</h3>
                                            <div className="space-y-5 text-muted-foreground leading-8">
                                                <p>Every single batch of our Nicotine Alkaloids undergoes a comprehensive Quality Testing System. We utilize state-of-the-art analytical equipment, including HPLC and GC Chromatographs, to meticulously examine and verify purity, ensuring reliable potency and quality that surpass industry benchmarks.</p>
                                                <div className="rounded-[2rem] border border-border/70 bg-background/70 p-6">
                                                    <h4 className="font-semibold mb-4">This high-purity compound is critical for:</h4>
                                                    <ul className="list-disc pl-5 space-y-3 text-muted-foreground">
                                                        <li><strong>Nicotine Replacement Therapy (NRT):</strong> The base ingredient for transdermal patches, gums, and lozenges.</li>
                                                        <li><strong>E-Liquid Manufacturing:</strong> Ensuring product safety and consistent nicotine concentration in vaping products.</li>
                                                        <li><strong>Scientific Research:</strong> Used in pharmacological and neurological studies.</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="h-px w-full bg-primary/20" />

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-3xl font-semibold text-primary mb-2">Storage Guidelines</h3>
                                        <p className="text-muted-foreground leading-8">Proper storage of this product is crucial to ensure safety, maintain efficacy, and comply with regulations.</p>
                                    </div>
                                    <motion.div className="grid gap-6 xl:grid-cols-3" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                                        <LeafCard className="bg-linear-to-br from-lime-50 via-emerald-100 to-teal-100 p-8 text-foreground rounded-[2.5rem] shadow-soft border border-emerald-200" delay={0}>
                                            <h4 className="font-semibold mb-4 text-lg text-foreground">Storage Conditions</h4>
                                            <ul className="list-disc pl-5 space-y-3 text-sm leading-7 text-muted-foreground">
                                                <li><strong>Temperature:</strong> Store in a cool, dry, well-ventilated area below 25°C.</li>
                                                <li><strong>Humidity:</strong> Keep in a low-humidity environment to prevent degradation.</li>
                                                <li><strong>Light Protection:</strong> Avoid direct sunlight to preserve stability.</li>
                                            </ul>
                                        </LeafCard>
                                        <LeafCard className="bg-linear-to-br from-emerald-50 via-emerald-100 to-cyan-100 p-8 text-foreground rounded-[2.5rem] shadow-soft border border-cyan-200" delay={0.1}>
                                            <h4 className="font-semibold mb-4 text-lg text-foreground">Container Requirements</h4>
                                            <ul className="list-disc pl-5 space-y-3 text-sm leading-7 text-muted-foreground">
                                                <li><strong>Original Packaging:</strong> Use the original sealed container to prevent leaks and exposure.</li>
                                                <li><strong>Material Compatibility:</strong> Prefer corrosion-resistant materials; avoid reactive metals/plastics.</li>
                                                <li><strong>Labeling:</strong> Ensure visible labels with usage, hazards, and regulatory details.</li>
                                            </ul>
                                        </LeafCard>
                                        <LeafCard className="bg-linear-to-br from-slate-50 via-slate-100 to-sky-100 p-8 text-foreground rounded-[2.5rem] shadow-soft border border-slate-200" delay={0.2}>
                                            <h4 className="font-semibold mb-4 text-lg text-foreground">Segregation & Security</h4>
                                            <ul className="list-disc pl-5 space-y-3 text-sm leading-7 text-muted-foreground">
                                                <li>Store separately from food, beverages, and medical supplies.</li>
                                                <li>Restrict access and use locked storage for high-risk materials.</li>
                                                <li>Keep away from flammable or reactive chemicals.</li>
                                            </ul>
                                        </LeafCard>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.article>
                    </AnimatePresence>
                </section>

                <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="space-y-10"
                    >
                        <motion.div
                            className="text-center space-y-4"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            <motion.p variants={itemVariants} className="text-sm uppercase tracking-[0.28em] text-primary/80">Safety & handling</motion.p>
                            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-display text-foreground">Storage, fire control and disposal guidance</motion.h2>
                        </motion.div>
                        <motion.div
                            className="grid gap-6 md:grid-cols-3"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            <LeafCard className="bg-linear-to-br from-red-50 via-red-100 to-orange-100 p-8 text-foreground rounded-[2.5rem] shadow-glow border border-red-200" delay={0}>
                                <h3 className="text-2xl font-semibold mb-4">Spill and Leak Prevention</h3>
                                <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground leading-7">
                                    <li>Place containers on a spill-proof surface or use secondary containment (e.g., trays) to catch leaks.</li>
                                    <li>Regularly inspect containers for signs of damage, corrosion, or leakage.</li>
                                </ul>
                            </LeafCard>
                            <LeafCard className="bg-linear-to-br from-yellow-50 via-yellow-100 to-amber-100 p-8 text-foreground rounded-[2.5rem] shadow-glow border border-yellow-200" delay={0.1}>
                                <h3 className="text-2xl font-semibold text-foreground mb-4">Fire Safety</h3>
                                <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground leading-7">
                                    <li><strong>Fire Risk:</strong> Nicotine sulfate is not highly flammable, but vapors may be hazardous if heated.</li>
                                    <li>Store away from open flames, heat sources, and ignition points.</li>
                                    <li>Keep appropriate fire extinguishing equipment nearby.</li>
                                </ul>
                            </LeafCard>
                            <LeafCard className="bg-linear-to-br from-green-50 via-green-100 to-emerald-100 p-8 text-foreground rounded-[2.5rem] shadow-glow border border-green-200" delay={0.2}>
                                <h3 className="text-2xl font-semibold mb-4">Disposal Considerations</h3>
                                <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground leading-7">
                                    <li><strong>Expired Products:</strong> Do not store beyond the product's expiration date. Follow local hazardous waste disposal rules.</li>
                                    <li><strong>Empty Containers:</strong> Rinse thoroughly if allowed, then dispose as required.</li>
                                </ul>
                            </LeafCard>
                        </motion.div>
                    </motion.div>
                </section>
            </motion.main>
        </div>
    );
}