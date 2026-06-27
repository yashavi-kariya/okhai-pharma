// import { useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import { GridLines, Particles } from "../components/animated-bg";
// import leafDetail from "@/assets/leaf-detail.jpg";
// import "../responsive.css";

// const EASE = [0.22, 1, 0.36, 1];
// const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
// const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

// const missionCards = [
//     { t: "Our Mission", d: "Manufacture and supply high-purity nicotine and derivatives with a focus on quality, safety and environmental responsibility." },
//     { t: "Our Vision", d: "Be the global benchmark for nicotine intermediates, driving sustainable growth through innovation and ethical practice." },
// ];

// /* ─── useAboutReveal ────────────────────────────────────────────────── */
// function useAboutReveal() {
//     const imageRef = useRef(null);
//     const contentRef = useRef(null);

//     const imageInView = useInView(imageRef, { once: true, margin: "-100px" });
//     const contentInView = useInView(contentRef, { once: true, margin: "-100px" });

//     const imageAnim = {
//         initial: { opacity: 0, x: -40 },
//         animate: imageInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 },
//         transition: { duration: 0.8, ease: EASE },
//     };

//     const contentAnim = {
//         initial: "hidden",
//         animate: contentInView ? "show" : "hidden",
//         variants: stagger,
//     };

//     return { imageRef, contentRef, imageAnim, contentAnim };
// }

// /* ─── About ─────────────────────────────────────────────────────────── */
// export default function About() {
//     const { imageRef, contentRef, imageAnim, contentAnim } = useAboutReveal();

//     return (
//         <section id="about" className="about-section relative py-16 px-6 lg:px-10 overflow-hidden">
//             <GridLines className="opacity-60" />
//             <Particles count={20} />

//             <div className="about-grid mx-auto max-w-7xl grid lg:grid-cols-12 gap-16 items-center">

//                 <motion.div ref={imageRef} className="about-image lg:col-span-5 relative" {...imageAnim}>
//                     <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-elevated">
//                         <img src={leafDetail} alt="Fresh tobacco leaf" className="w-full h-full object-cover" loading="lazy" decoding="async" />
//                     </div>
//                     {/* <div className="about-floatcard absolute -bottom-6 -right-6 max-w-[260px] rounded-2xl bg-background border border-border p-5 shadow-soft">
//                         <div className="text-xs uppercase tracking-wider text-primary">Sustainably sourced</div>
//                         <div className="mt-2 font-display text-lg leading-snug">From farm to pharma, ethically grown.</div>
//                     </div> */}
//                 </motion.div>

//                 <motion.div ref={contentRef} className="about-content lg:col-span-7" {...contentAnim}>
//                     <motion.div variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-primary">About Okhai Pharma</motion.div>
//                     <motion.h2 variants={fadeUp} className="mt-4 text-4xl md:text-5xl font-display leading-tight">
//                         A name India trusts for <em className="italic text-primary"> pure nicotine</em>.
//                     </motion.h2>
//                     <motion.p variants={fadeUp} className="mt-6 text-lg text-muted-foreground leading-relaxed">
//                         Okhai Pharma is a leading name in the Indian chemical industry, recognized as an eminent manufacturer, exporter, and supplier of Pure Nicotine and Nicotine Derivatives. With a commitment to quality, innovation, and sustainability, we serve a diverse range of industries including pharmaceuticals and research sectors.
//                     </motion.p>
//                     <motion.div variants={fadeUp} className="about-cards mt-10 grid sm:grid-cols-2 gap-6">
//                         {missionCards.map((m) => (
//                             <div key={m.t} className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-soft transition-all">
//                                 <div className="font-display text-xl text-foreground">{m.t}</div>
//                                 <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{m.d}</p>
//                             </div>
//                         ))}
//                     </motion.div>
//                 </motion.div>

//             </div>
//         </section>
//     );
// }

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GridLines, Particles } from "../components/animated-bg";
import leafDetail from "@/assets/leaf-detail.jpg";
import logo from "@/assets/logo.png"; // adjust path if your logo filename differs
import "../responsive.css";

const EASE = [0.22, 1, 0.36, 1];
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

/* ─── Icons ─────────────────────────────────────────────────────────── */
function MissionIcon() {
    return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4" />
            <path d="M24 6 L28 20 L42 24 L28 28 L24 42 L20 28 L6 24 L20 20 Z"
                fill="currentColor" fillOpacity="0.95" />
        </svg>
    );
}

function VisionIcon() {
    return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4" />
            <rect x="8" y="20" width="12" height="10" rx="3" fill="currentColor" fillOpacity="0.95" />
            <rect x="28" y="20" width="12" height="10" rx="3" fill="currentColor" fillOpacity="0.95" />
            <path d="M20 25 H28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="14" cy="25" r="3" fill="currentColor" fillOpacity="0.5" />
            <circle cx="34" cy="25" r="3" fill="currentColor" fillOpacity="0.5" />
            <path d="M14 20 L12 14 M34 20 L36 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

/* ─── Card data ──────────────────────────────────────────────────────── */
const cards = [
    {
        key: "mission",
        icon: <MissionIcon />,
        label: "Company's Mission",
        body: "At Okhai Pharma, our mission is to manufacture and supply high-purity nicotine and its derivatives with a focus on quality, safety, and environmental responsibility. We are committed to delivering reliable and compliant products that meet global standards across the pharmaceutical and research industries. Through innovation, skilled expertise, and ethical practices, we aim to build lasting partnerships and exceed customer expectations. Our goal is to drive sustainable growth while contributing positively to the communities and sectors we serve.",
        gradient: "from-primary via-primary/90 to-primary/80",
        delay: 0,
    },
    {
        key: "vision",
        icon: <VisionIcon />,
        label: "Company's Vision",
        body: "Our vision is to be a globally trusted leader in nicotine manufacturing, known for excellence, innovation, and responsible practices. We aim to deliver world-class nicotine derivatives that support advancements in healthcare and science. By embracing cutting-edge technology and sustainable methods, we strive to redefine industry benchmarks. We are committed to creating value for all stakeholders while minimizing our environmental impact — shaping a future driven by precision, purpose, and global responsibility.",
        gradient: "from-[#7a6528] via-[#8c7530] to-[#6b5820]",
        delay: 0.14,
    },
];

/* ─── StandaloneCard ─────────────────────────────────────────────────── */
function StandaloneCard({ card }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.75, ease: EASE, delay: card.delay }}
            whileHover={{ y: -5, scale: 1.01, transition: { duration: 0.28 } }}
            className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${card.gradient} shadow-elevated text-white`}
        >
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -top-14 -right-14 w-56 h-56 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-white/5 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 w-32 h-32 rounded-tl-[3rem] bg-white/5" />

            {/* Inner layout: icon left, text right on md+ */}
            <div className="relative flex flex-col md:flex-row gap-8 p-8 md:p-10 items-start">

                {/* Icon box */}
                <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, ease: EASE, delay: card.delay + 0.2 }}
                    className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-white shadow-soft"
                >
                    {card.icon}
                </motion.div>

                {/* Text */}
                <div className="flex-1">
                    <h3 className="font-display text-2xl font-semibold text-white mb-4 leading-snug">
                        {card.label}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed text-white/85">
                        {card.body}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── useAboutReveal ────────────────────────────────────────────────── */
function useAboutReveal() {
    const imageRef = useRef(null);
    const contentRef = useRef(null);

    const imageInView = useInView(imageRef, { once: true, margin: "-100px" });
    const contentInView = useInView(contentRef, { once: true, margin: "-100px" });

    const imageAnim = {
        initial: { opacity: 0, x: -40 },
        animate: imageInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 },
        transition: { duration: 0.8, ease: EASE },
    };

    const contentAnim = {
        initial: "hidden",
        animate: contentInView ? "show" : "hidden",
        variants: stagger,
    };

    return { imageRef, contentRef, imageAnim, contentAnim };
}

/* ─── About ─────────────────────────────────────────────────────────── */
export default function About() {
    const { imageRef, contentRef, imageAnim, contentAnim } = useAboutReveal();

    return (
        <section id="about" className="about-section relative py-16 px-6 lg:px-10 overflow-hidden">
            <GridLines className="opacity-60" />
            <Particles count={20} />

            <div className="mx-auto max-w-7xl space-y-16">

                {/* ── Row 1: image + intro text ── */}
                <div className="about-grid grid lg:grid-cols-12 gap-16 items-center">

                    {/* Left: leaf image */}
                    <motion.div ref={imageRef} className="about-image lg:col-span-5 relative" {...imageAnim}>
                        <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-elevated">
                            <img src={leafDetail} alt="Fresh tobacco leaf"
                                className="w-full h-full object-cover" loading="lazy" decoding="async" />
                        </div>
                    </motion.div>

                    {/* Right: logo + heading + paragraph */}
                    <motion.div ref={contentRef} className="about-content lg:col-span-7" {...contentAnim}>

                        {/* Company logo above heading */}
                        <motion.div variants={fadeUp} className="mb-6">
                            <img
                                src={logo}
                                alt="Okhai Pharma logo"
                                className="h-14 w-auto object-contain"
                                loading="lazy"
                                decoding="async"
                            />
                        </motion.div>

                        <motion.div variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-primary">
                            About Okhai Pharma
                        </motion.div>

                        <motion.h2 variants={fadeUp} className="mt-4 text-4xl md:text-5xl font-display leading-tight">
                            A name India trusts for{" "}
                            <em className="italic text-primary"> pure nicotine</em>.
                        </motion.h2>

                        <motion.p variants={fadeUp} className="mt-6 text-lg text-muted-foreground leading-relaxed">
                            Okhai Pharma is a leading name in the Indian chemical industry, recognized as an eminent
                            manufacturer, exporter, and supplier of Pure Nicotine and Nicotine Derivatives. With a
                            commitment to quality, innovation, and sustainability, we serve a diverse range of industries
                            including pharmaceuticals and research sectors.
                        </motion.p>
                    </motion.div>
                </div>

                {/* ── Row 2: Mission & Vision as separate cards spanning full width ── */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {cards.map((card) => (
                        <StandaloneCard key={card.key} card={card} />
                    ))}
                </div>

            </div>
        </section>
    );
}