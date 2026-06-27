import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MeshBlobs, GridLines } from "../components/animated-bg";
import leader1Img from "../assets/leaders/1.png";
import leader2Img from "../assets/leaders/2.png";
import leader3Img from "../assets/leaders/3.png";
import "../responsive.css";

const EASE = [0.22, 1, 0.36, 1];

const leaders = [
    { n: "Mr. Parth Visana", r: "Director", img: leader1Img, b: "Graduated in Food Processing and Technology from A.D. Patel Institute of Technology, experienced businessman with a robust background in various known industries.", yr: "Director", focus: "Business Strategy" },
    { n: "Mr. Lakhaman Odedra", r: "Director", img: leader2Img, b: "A highly experienced businessman with a powerful background. Associated with multiple businesses in various industries from last many decades.", yr: "Director", focus: "Global Operations" },
    { n: "Mr. Satyen Chudasama", r: "General Manager – Operations", img: leader3Img, b: "BSc in Chemistry, Post Diploma in Industrial Safety and Environment Technology and Management with 30+ years of experience in the chemical industry.", yr: "30+ yrs", focus: "Operations" },
];

/* ─── useLeadershipReveal ───────────────────────────────────────────── */
function useLeadershipReveal() {
    const headingRef = useRef(null);
    const taglineRef = useRef(null);

    const headingInView = useInView(headingRef, { once: true });
    const taglineInView = useInView(taglineRef, { once: true });

    const headingAnim = {
        initial: { opacity: 0, y: 24 },
        animate: headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
        transition: { duration: 0.7 },
    };

    const taglineAnim = {
        initial: { opacity: 0, y: 24 },
        animate: taglineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
        transition: { duration: 0.7, delay: 0.1 },
    };

    return { headingRef, taglineRef, headingAnim, taglineAnim };
}

/* ─── useLeaderCardReveal ───────────────────────────────────────────── */
function useLeaderCardReveal(index) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    const anim = {
        initial: { opacity: 0, y: 40 },
        animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
        transition: { duration: 0.7, delay: index * 0.1, ease: EASE },
    };

    return { ref, anim };
}

/* ─── LeaderCard ────────────────────────────────────────────────────── */
function LeaderCard({ leader, index }) {
    const { ref, anim } = useLeaderCardReveal(index);
    const initial = leader.n.split(" ").slice(-1)[0][0];

    return (
        <motion.div
            ref={ref}
            className="leader-card group relative"
            style={{ perspective: 1600, transformStyle: "preserve-3d" }}
            {...anim}
            whileHover={{ y: -10, scale: 1.025, rotateY: 6, rotateX: -3 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-primary/60 via-primary/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="absolute inset-x-6 top-4 h-24 rounded-[2rem] bg-primary/10 blur-2xl opacity-80 pointer-events-none" />
            <div className="absolute -right-8 top-12 h-24 w-24 rounded-full bg-primary/10 blur-3xl opacity-70 pointer-events-none" />
            <div className="absolute -left-8 bottom-10 h-24 w-24 rounded-full bg-primary/10 blur-3xl opacity-70 pointer-events-none" />
            <div className="relative rounded-[2rem] bg-card/90 border border-border/70 backdrop-blur-xl p-8 h-full flex flex-col overflow-hidden shadow-soft">
                <div className="relative mx-auto">
                    <motion.div
                        className="relative rounded-full w-28 h-28 md:w-32 md:h-32 overflow-hidden border-2 border-primary/20 bg-background shadow-2xl shadow-primary/10"
                        initial={{ scale: 0.92, rotate: -2 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.55, ease: EASE }}
                    >
                        <img src={leader.img} alt={leader.n} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                    </motion.div>
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-primary bg-background border border-primary/30 rounded-full px-3 py-1 whitespace-nowrap">
                        {leader.yr}
                    </span>
                </div>
                <div className="mt-8 text-center">
                    <h3 className="font-display text-xl md:text-2xl">{leader.n}</h3>
                    <div className="mt-1 text-sm italic text-primary">{leader.r}</div>
                </div>
                <div className="mt-4 flex items-center gap-2 justify-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    <span className="size-1 rounded-full bg-primary animate-pulse" />
                    {leader.focus}
                </div>
                <div className="mt-4 rounded-3xl border border-primary/15 bg-white/10 p-5 text-sm text-muted-foreground leading-relaxed text-center shadow-soft">
                    {leader.b}
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Leadership ────────────────────────────────────────────────────── */
export default function Leadership() {
    const { headingRef, taglineRef, headingAnim, taglineAnim } = useLeadershipReveal();

    return (
        <section id="leadership" className="leadership-section relative py-16 px-6 lg:px-10 overflow-hidden bg-gradient-to-b from-background via-primary-soft/20 to-background">
            <MeshBlobs className="opacity-40" />
            <GridLines className="opacity-30" />

            <div className="mx-auto max-w-7xl relative">
                <div className="leadership-header grid md:grid-cols-12 gap-10 items-end">
                    <motion.div ref={headingRef} className="md:col-span-7" {...headingAnim}>
                        <div className="flex items-center gap-3">
                            <span className="h-px w-12 bg-primary" />
                            <div className="text-xs uppercase tracking-[0.3em] text-primary">Leadership</div>
                        </div>
                        <h2 className="leadership-title mt-5 text-4xl md:text-6xl font-display leading-[1.05]">
                            The people behind <br className="hidden md:block" />
                            the <em className="italic text-primary">molecule</em>.
                        </h2>
                    </motion.div>
                    <motion.p ref={taglineRef} className="md:col-span-5 text-muted-foreground text-base leading-relaxed border-l-2 border-primary/40 pl-5" {...taglineAnim}>
                        A small, senior team — chemists, operators and global citizens —
                        united by one obsession: purer molecules, made responsibly.
                    </motion.p>
                </div>

                <div className="leaders-grid mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {leaders.map((leader, i) => (
                        <LeaderCard key={leader.n} leader={leader} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

