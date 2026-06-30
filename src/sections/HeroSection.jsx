import { useRef, useCallback, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MeshBlobs, DotGrid, FloatingLeaves, SweepBeam } from "../components/animated-bg";
import heroBg from "@/assets/hero-bg.jpg";
import product1 from "@/assets/products/product1.png";
import product2 from "@/assets/products/product2.png";
import "../responsive.css";
import { Link } from "react-router-dom";

const EASE = [0.22, 1, 0.36, 1];
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

/* ─── useTransparentImage ───────────────────────────────────────────── */
// Removes white background from an image using Canvas flood-fill from edges.
function useTransparentImage(src, tolerance = 30) {
    const [transparentSrc, setTransparentSrc] = useState(null);

    useEffect(() => {
        if (!src) return;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            const { width: w, height: h } = canvas;
            const imageData = ctx.getImageData(0, 0, w, h);
            const data = imageData.data; // [r,g,b,a, r,g,b,a, ...]

            const visited = new Uint8Array(w * h);

            const isWhitish = (idx) => {
                const r = data[idx], g = data[idx + 1], b = data[idx + 2];
                return r >= 255 - tolerance && g >= 255 - tolerance && b >= 255 - tolerance;
            };

            // BFS flood-fill seeded from all 4 border edges
            const queue = [];
            const enqueue = (x, y) => {
                const i = y * w + x;
                if (visited[i]) return;
                const idx = i * 4;
                if (!isWhitish(idx)) return;
                visited[i] = 1;
                queue.push(i);
            };

            for (let x = 0; x < w; x++) { enqueue(x, 0); enqueue(x, h - 1); }
            for (let y = 0; y < h; y++) { enqueue(0, y); enqueue(w - 1, y); }

            let head = 0;
            while (head < queue.length) {
                const i = queue[head++];
                const x = i % w, y = Math.floor(i / w);
                // Make pixel fully transparent
                data[i * 4 + 3] = 0;

                const neighbors = [
                    x > 0 && i - 1,
                    x < w - 1 && i + 1,
                    y > 0 && i - w,
                    y < h - 1 && i + w,
                ];
                for (const ni of neighbors) {
                    if (ni !== false && !visited[ni] && isWhitish(ni * 4)) {
                        visited[ni] = 1;
                        queue.push(ni);
                    }
                }
            }

            ctx.putImageData(imageData, 0, 0);
            setTransparentSrc(canvas.toDataURL("image/png"));
        };
        img.src = src;
    }, [src, tolerance]);

    return transparentSrc || src; // fallback to original while processing
}

/* ─── TransparentImg ────────────────────────────────────────────────── */
function TransparentImg({ src, alt, className, ...props }) {
    const processedSrc = useTransparentImage(src, 30);
    return <img src={processedSrc} alt={alt} className={className} {...props} />;
}

const heroProducts = [
    { src: product1, title: "Pure Nicotine USP", subtitle: "High-purity liquid nicotine" },
    { src: product2, title: "Nicotine Polacrilex", subtitle: "Designed for formulations" },
];

/* ─── useHeroSlider ─────────────────────────────────────────────────── */
function useHeroSlider() {
    const [activeIndex, setActiveIndex] = useState(0);

    const advance = useCallback(() => {
        setActiveIndex((i) => (i + 1) % heroProducts.length);
    }, []);

    useEffect(() => {
        const id = setInterval(advance, 5200);
        return () => clearInterval(id);
    }, [advance]);

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return { ref, activeIndex, bgY, bgOpacity };
}

/* ─── Hero ──────────────────────────────────────────────────────────── */
export default function Hero() {
    const { ref, activeIndex, bgY, bgOpacity } = useHeroSlider();

    return (
        <section id="top" ref={ref} className="hero-section relative min-h-screen bg-hero overflow-hidden pt-24">
            <motion.img src={heroBg} alt="" aria-hidden
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply"
                style={{ y: bgY, opacity: bgOpacity }} />
            <MeshBlobs />
            <DotGrid />
            <FloatingLeaves count={10} />
            <SweepBeam />
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background pointer-events-none" />

            <motion.div
                className="hero-grid relative mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-16 grid lg:grid-cols-12 gap-12 items-center"
                variants={stagger} initial="hidden" animate="show">

                <div className="hero-text lg:col-span-7">
                    <motion.span variants={fadeUp}
                        className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary-soft px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-primary">
                        <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                        Made in India · Exporting Globally
                    </motion.span>

                    <motion.h1 variants={fadeUp}
                        className="hero-title mt-6 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02] text-foreground">
                        High-purity <em className="italic text-primary">nicotine</em>,
                        <br /> engineered for <em className="italic">trust</em>.
                    </motion.h1>

                    <motion.div variants={fadeUp} className="hero-cta mt-10 flex flex-wrap gap-4">
                        <Link to="/products"
                            className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-medium hover:bg-primary transition-colors">
                            Explore products <span className="transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                        <a href="#contact"
                            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 backdrop-blur px-7 py-3.5 text-sm font-medium hover:border-primary hover:text-primary transition-colors">
                            Download brochure
                        </a>
                    </motion.div>
                </div>

                <motion.div variants={fadeUp} className="hero-visual lg:col-span-5 relative aspect-square">
                    <div className="absolute inset-0 rounded-full bg-mint opacity-10 blur-3xl" />
                    <div className="relative size-full rounded-[2.5rem] border border-border/60 bg-card/40 backdrop-blur-sm overflow-hidden shadow-elevated">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),transparent_40%)] opacity-80 pointer-events-none" />
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.8, ease: EASE }}
                                className="absolute inset-6 rounded-[2rem] overflow-hidden border border-white/10 bg-background/10 shadow-soft flex flex-col items-center justify-center p-4">
                                <TransparentImg
                                    src={heroProducts[activeIndex].src}
                                    alt={heroProducts[activeIndex].title}
                                    className="max-h-full w-full object-contain"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>

            </motion.div>
        </section>
    );
}