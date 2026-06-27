import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import leafDetail from "@/assets/leaf-detail.jpg";
import leafIcon from "@/assets/leaf.png";
import labImg from "@/assets/lab.jpg";
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

function AboutHero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

}

function AboutStory() {
    return (
        <section id="story" className="about-section relative overflow-hidden bg-background px-6 py-20 lg:px-10">
            <img
                src={leafDetail}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-35"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-background/80" />
            <div className="absolute inset-0 bg-mint opacity-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(104,154,69,0.16),transparent_58%)]" />
            <DotGrid className="opacity-15" />
            <Particles count={14} />

            <motion.div
                className="relative z-10 mx-auto max-w-5xl text-center"
                variants={slowStagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
            >
                <motion.div variants={fadeUp} className="mx-auto inline-flex items-center justify-center rounded-full border border-primary/20 bg-background/70 px-8 py-5 shadow-soft backdrop-blur">
                    <img src={companyLogo} alt="Okhai Pharma Intermediates Pvt. Ltd." className="h-20 w-auto object-contain md:h-24" />
                </motion.div>
                <motion.div variants={fadeUp} className="mt-8 text-xs uppercase tracking-[0.24em] text-primary">About the company</motion.div>
                <motion.h2 variants={fadeUp} className="mx-auto mt-4 max-w-4xl text-4xl font-display leading-tight text-foreground md:text-5xl">
                    A strong Indian manufacturer with a <span className="text-primary">global quality promise</span>.
                </motion.h2>
                <motion.div variants={fadeUp} className="mx-auto mt-7 h-px w-48 bg-primary/40" />
                <div className="mx-auto mt-8 max-w-4xl space-y-5 text-lg leading-relaxed text-muted-foreground">
                    <motion.p variants={fadeUp}>
                        Okhai Pharma is recognized as an eminent manufacturer, exporter and supplier of pure nicotine and nicotine derivatives.
                        Our formulations are developed under stringent quality controls and regulatory compliance so customers get consistent, reproducible results.
                    </motion.p>
                    <motion.p variants={fadeUp}>
                        We serve pharmaceutical, research and agrochemical industries with products engineered for stability, traceability and safe handling.
                        Our manufacturing practices prioritize eco-conscious processes and secure batch documentation.
                    </motion.p>
                </div>
            </motion.div>
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
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-3xl">
                    <div className="text-xs uppercase tracking-[0.2em] text-primary">Why choose us</div>
                    <h2 className="mt-4 text-4xl md:text-5xl font-display leading-tight text-foreground">
                        What makes Okhai Pharma the trusted partner for <span className="text-primary">nicotine derivatives</span>.
                    </h2>
                </motion.div>
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-7 text-muted-foreground">
                        <p className="text-lg leading-relaxed">
                            <strong>Okhai Pharma Intermediates Pvt. Ltd.</strong> is leading manufacturers of <strong>Pure Nicotine &amp; Nicotine derivatives</strong> from India.
                        </p>
                        <p className="mt-6 text-lg leading-relaxed">
                            Okhai Pharma stands as a trusted name in the manufacturing and supply of Nicotine Sulphate 40%, delivering high quality, consistency, and reliability. With years of expertise in nicotine chemistry, we offer pharmaceutical-grade formulations developed under stringent quality controls and regulatory compliance. Our product is crafted using premium raw materials in advanced, state-of-the-art facilities ensuring high purity, solubility and stability.
                        </p>
                        <p className="mt-6 text-lg leading-relaxed">
                            What sets Okhai Pharma apart is our commitment to <strong>precision, safety, and innovation</strong> — key factors for pharmaceutical and research applications. Whether for drug development, toxicology studies, or scientific research, our Nicotine Sulphate 40% supports accurate and reproducible results. We also prioritize eco-conscious manufacturing practices, offering a biodegradable and safe formulation.
                        </p>
                        <p className="mt-6 text-lg leading-relaxed">
                            With responsive customer service, global export capabilities, and adherence to international standards, Okhai Pharma is the preferred partner for institutions and companies seeking dependable nicotine derivatives. Choose Okhai Pharma for quality you can trust, batch after batch.
                        </p>
                    </div>
                    <div className="lg:col-span-5">
                        <motion.div
                            className="space-y-4"
                            variants={slowStagger}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.35 }}
                        >
                            {values.map((v) => (
                                <motion.div key={v.title} variants={fadeUp} className="flex items-start gap-4">
                                    <img src={leafIcon} alt="" aria-hidden="true" className="size-8 object-contain flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-foreground">{v.title}:</div>
                                        <div className="text-sm text-muted-foreground mt-1">{v.description}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
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
                <AboutStory />
                <AboutValues />
                {/* <AboutTeam /> */}
            </main>
        </div>
    );
}
