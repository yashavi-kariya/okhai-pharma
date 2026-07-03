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

const leaderCardVariants = {
    // Start with center card visible and side cards tucked behind it (overlapping)
    hidden: (index) => ({
        opacity: index === 1 ? 1 : 0,
        x: 0,
        y: index === 1 ? 0 : 8,
        scale: index === 1 ? 1 : 0.96,
    }),
    visible: (index) => ({
        opacity: 1,
        x: index === 0 ? -60 : index === 2 ? 60 : 0,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.72,
            delay: index === 1 ? 0 : 0.20,
            ease: EASE,
        },
    }),
};

/* ─── LeaderCard ────────────────────────────────────────────────────── */
function LeaderCard({ leader, index }) {
    return (
        <motion.div
            className="home-leader-card"
            variants={leaderCardVariants}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            whileHover={{ y: -10, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="home-leader-card-media">
                <div className="home-leader-card-avatar">
                    <img src={leader.img} alt={leader.n} />
                </div>
            </div>
            <div className="home-leader-card-body">
                <div>
                    <h3>{leader.n}</h3>
                    <p className="home-leader-card-role">{leader.r}</p>
                    <span className="home-leader-card-underline" />
                </div>
                <p className="home-leader-card-description">{leader.b}</p>
                <div className="home-leader-card-focus">{leader.focus}</div>
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
                </div>

                <div className="leaders-grid mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {leaders.map((leader, i) => (
                        <LeaderCard key={leader.n} leader={leader} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}