import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import leafDetail from "@/assets/leaf-detail.jpg";
import leafIcon from "@/assets/leaf.png";
import aboutImg from "@/assets/aboutimg.png";
import companyLogo from "@/assets/logo.png";
import { MeshBlobs, DotGrid, GridLines, FloatingLeaves, SweepBeam, Particles } from "./animated-bg";
import SiteNav from "./SiteHeader";
import "../responsive.css";

const EASE = [0.22, 1, 0.36, 1];
const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};
const slowStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18 } },
};

function useAboutReveal() {
    const imageRef = useRef(null);
    const contentRef = useRef(null);

    const imageAnim = {
        initial: { opacity: 0, y: 40, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.75, ease: EASE },
    };

    const contentAnim = {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.75, ease: EASE, delay: 0.12 },
    };

    return { imageRef, contentRef, imageAnim, contentAnim };
}

function AboutHero() {
    const { imageRef, contentRef, imageAnim, contentAnim } = useAboutReveal();

    return (
        <section id="about-hero" className="about-section relative overflow-hidden bg-background px-6 py-20 lg:px-10">
            <GridLines className="opacity-25" />
            <Particles count={16} className="opacity-15" />
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
                    <motion.div ref={contentRef} className="lg:col-span-6" {...contentAnim}>
                        <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-background/80 px-5 py-3 text-sm uppercase tracking-[0.24em] text-primary shadow-soft backdrop-blur-sm">
                            About Okhai Pharma
                        </div>
                        <motion.h1 variants={fadeUp} className="mt-6 text-4xl font-display leading-tight text-foreground md:text-5xl lg:text-6xl">
                            A strong Indian manufacturer with a <span className="text-primary">global quality promise</span>.
                        </motion.h1>
                        <motion.p variants={fadeUp} className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                            Okhai Pharma is recognized as an eminent manufacturer, exporter and supplier of premium nicotine derivatives. We deliver strict quality, traceability, and reproducible batches for research, pharmaceutical and agrochemical customers.
                        </motion.p>
                        <motion.div variants={fadeUp} className="mt-8 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-3xl border border-primary/10 bg-white/90 p-6 shadow-soft">
                                <div className="text-xs uppercase tracking-[0.2em] text-primary">Trusted globally</div>
                                <div className="mt-3 text-xl font-semibold text-foreground">Trusted quality</div>
                            </div>
                            <div className="rounded-3xl border border-primary/10 bg-white/90 p-6 shadow-soft">
                                <div className="text-xs uppercase tracking-[0.2em] text-primary">Safety standard</div>
                                <div className="mt-3 text-xl font-semibold text-foreground">Responsible manufacture</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div ref={imageRef} className="lg:col-span-6 relative" {...imageAnim}>
                        <div className="relative mx-auto max-w-md rounded-[3rem] border border-primary/10 bg-white/90 p-6 shadow-elevated backdrop-blur-xl">
                            <div className="absolute -right-8 top-8 rounded-full border border-primary/20 bg-white p-4 shadow-soft">
                                <div className="text-[10px] uppercase tracking-[0.24em] text-primary">Trusted</div>
                                <div className="mt-1 text-sm font-semibold text-foreground">Globally</div>
                            </div>
                            <motion.div
                                className="overflow-hidden rounded-[2.5rem] bg-slate-100"
                                initial={{ y: 20, opacity: 0.8, scale: 0.98 }}
                                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.9, ease: EASE }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <img src={aboutImg} alt="About Okhai Pharma" className="w-full h-full object-cover" loading="lazy" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function AboutValues() {
    const values = [
        {
            title: "High-Quality Product",
            description: "Our Nicotine Sulphate 40% is manufactured under strict quality controls to ensure superior effectiveness in pest management.",
        },
        {
            title: "Fast Action",
            description: "It provides rapid pest control, offering immediate relief for your crops and plants.",
        },
        {
            title: "Expert Support",
            description: "Our team offers professional guidance on proper usage and application to maximize results.",
        },
        {
            title: "Reliable Delivery",
            description: "Timely and efficient delivery to ensure you get the product when you need it most.",
        },
        {
            title: "Cost-Effective",
            description: "Our product offers excellent value with a high concentration of active ingredients for long-lasting results.",
        },
    ];

    return (
        <section id="values" className="values-section relative py-20 px-6 lg:px-10 overflow-hidden bg-background">
            <MeshBlobs className="opacity-20" />
            <DotGrid className="opacity-20" />
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
                    <motion.div className="lg:col-span-7" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                        <div className="text-xs uppercase tracking-[0.2em] text-primary">Why choose us</div>
                        <h2 className="mt-4 text-4xl font-display leading-tight text-foreground md:text-5xl">
                            What makes Okhai Pharma the trusted partner for <span className="text-primary">nicotine derivatives</span>.
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-justify">
                            Okhai Pharma stands as a trusted name in the manufacturing and supply of Nicotine Sulphate 40%, delivering high quality, consistency, and reliability. With years of expertise in nicotine chemistry, we offer pharmaceutical-grade formulations developed under stringent quality controls and regulatory compliance. Our product is crafted using premium raw materials in advanced, advance facilities, ensuring high purity, solubility, and stability.
                        </p>
                        <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-justify">
                            What sets Okhai Pharma apart is our commitment to precision, safety, and innovation—key factors for pharmaceutical and research applications. Whether for drug development, toxicology studies, or scientific research, our Nicotine Sulphate 40% supports accurate and reproducible results. We also prioritize eco-conscious manufacturing practices, offering a biodegradable and safe formulation.
                        </p>
                        <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-justify">
                            With responsive customer service, global export capabilities, and adherence to international standards, Okhai Pharma is the preferred partner for institutions and companies seeking dependable nicotine derivatives. Choose Okhai Pharma for quality you can trust, batch after batch.
                        </p>
                    </motion.div>

                    <motion.div className="lg:col-span-5 space-y-4" variants={slowStagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
                        {values.map((value) => (
                            <motion.div key={value.title} variants={fadeUp} className="flex items-start gap-4 rounded-[2rem] border border-primary/10 bg-white/90 p-6 shadow-soft">
                                <img src={leafIcon} alt="Leaf icon" className="h-10 w-10 shrink-0 object-contain" />
                                <div>
                                    <div className="text-sm uppercase tracking-[0.2em] text-primary">{value.title}</div>
                                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default function About() {
    return (
        <div className="min-h-screen bg-background">
            <SiteNav />
            <main>
                <AboutHero />
                <AboutValues />
            </main>
        </div>
    );
}
