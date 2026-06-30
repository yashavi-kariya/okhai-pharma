import { motion } from "framer-motion";
import { MeshBlobs } from "./animated-bg";
import SiteNav from "./SiteHeader";
import parthImg from "@/assets/leaders/1.png";
import lakhamanImg from "@/assets/leaders/2.png";
import satyenImg from "@/assets/leaders/3.png";
import "../responsive.css";

const EASE = [0.22, 1, 0.36, 1];

const leaders = [
    {
        n: "Mr. Parth Visana",
        r: "Director",
        img: parthImg,
        photoTop: "34%",
        photoOffset: "-55px",
        education: "Graduated in Food Processing and Technology from A.D. Patel Institute of Technology.",
        summary:
            "Highly experienced businessman with a robust background in cement industry raw material supply as well as treated hazardous chemical waste. 6+ years of experience. Also owner of the Neja Multispeciality Hospital, Bagvadar, Porbandar. Known for strategic long-term planning and financial literacy.",
        roles: [
            "Founder and partner of NEJA ASSOCIATES, a Raw-material supplier firm.",
            "Founder and partner of NEJA HEALTHCARE HOSPITALS LLP.",
            "Proprietor of Parth Roadways.",
        ],
    },
    {
        n: "Mr. Lakhaman Odedra",
        r: "Director",
        img: lakhamanImg,
        photoTop: "42%",
        photoOffset: "-48px",
        education: "Graduated in Bachelor of Arts.",
        summary:
            "Highly experienced businessman with a powerful background, as well as authorised transporter in Saurashtra Cement Ltd (Hathi Cement). Known for strategic deep-rooted planning, management skills and leadership. Has successfully led numerous projects.",
        roles: [
            "Chairman: Agricultural Produce Market Committee of Porbandar district, Gujarat.",
            "Founder and partner of Okhai Enterprise.",
            "Founder and partner of Divine Project.",
            "Founder and partner of Subh Enterprise.",
        ],
    },
    {
        n: "Mr. Satyen Chudasama",
        r: "General Manager – Operation",
        img: satyenImg,
        photoTop: "27%",
        photoOffset: "-60px",
        education:
            "BSc in Chemistry, Post Diploma in Industrial Safety, Post Diploma in Environment Technology and Management.",
        summary:
            "30+ years of experience in chemical industry (dyes intermediate products and green fields projects). Currently working with Okhai Pharma Intermediate Pvt. Ltd. as GM Operation.",
        roles: [],
    },
];
function DotGrid() {
    const dots = [];
    for (let r = 0; r < 6; r++)
        for (let c = 0; c < 7; c++)
            dots.push(<circle key={`${r}-${c}`} cx={10 + c * 17} cy={10 + r * 17} r={2} />);
    return (
        <svg
            style={{ position: "absolute", bottom: 10, right: 10, pointerEvents: "none" }}
            width="125" height="105" viewBox="0 0 125 105" aria-hidden="true"
        >
            <g fill="#5aaa28" opacity="0.18">{dots}</g>
        </svg>
    );
}

/* ── Text variants ── */
const textItem = {
    hidden: { opacity: 0, x: -14 },
    show: (d) => ({ opacity: 1, x: 0, transition: { duration: 0.46, ease: EASE, delay: d } }),
};

export default function LeadershipPage() {
    return (
        <div className="min-h-screen bg-background">
            <SiteNav />
            <main>
                {/* ── Top intro UI ── */}
                <section className="lead-hero relative overflow-hidden bg-gradient-to-r from-[#c8dfbe] via-[#e4e9df] to-[#d6e7c9] pt-24 pb-20">
                    <MeshBlobs className="absolute inset-0 opacity-20" />
                    <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10 text-center">
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                            className="text-sm uppercase tracking-[0.35em] text-[#689c4e] font-semibold"
                        >
                            Our Leadership
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75, ease: EASE, delay: 0.2 }}
                            className="mt-6 text-5xl md:text-6xl font-display font-semibold text-foreground leading-tight"
                        >
                            The People Behind <span className="text-primary">Our Promise</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75, ease: EASE, delay: 0.3 }}
                            className="mx-auto mt-6 max-w-3xl text-base md:text-lg leading-8 text-muted-foreground"
                        >
                            Driven by expertise. United by purpose. Our leadership team brings deep industry knowledge, strategic vision, and a commitment to excellence in everything we do.
                        </motion.p>
                    </div>
                </section>

                {/* ── Leader cards ── */}
                <section className="py-20 px-4 lg:px-8" style={{ background: "#f3f8ee" }}>
                    <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", flexDirection: "column", gap: "2.8rem" }}>
                        {leaders.map((l, i) => {
                            // Card 1,3 → photo RIGHT side; Card 2 → photo LEFT side
                            const photoRight = i % 2 === 0;

                            return (
                                <motion.div
                                    key={l.n}
                                    initial={{ opacity: 0, y: 44 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, ease: EASE }}
                                    style={{
                                        position: "relative",
                                        background: "#ffffff",
                                        borderRadius: 24,
                                        border: "1px solid #d4e8b8",
                                        display: "flex",
                                        flexDirection: photoRight ? "row" : "row-reverse",
                                        alignItems: "stretch",
                                        minHeight: 340,
                                        overflow: "hidden",
                                        boxShadow: "0 4px 40px rgba(60,110,20,0.07), 0 1px 3px rgba(0,0,0,0.04)",
                                    }}
                                >
                                    {/* ── Person icon — absolute top-right of the whole white card ── */}
                                    <div style={{
                                        position: "absolute",
                                        top: 20,
                                        right: 22,
                                        zIndex: 20,
                                    }}>
                                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                                            stroke="#85c455" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="8" r="4" />
                                            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                                        </svg>
                                    </div>

                                    {/* ══ TEXT COLUMN ══ */}
                                    <div style={{
                                        flex: "1 1 0",
                                        padding: "2.4rem 2.6rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        /* right padding larger when photo is on right so text doesn't go under the overflowing circle */
                                        paddingRight: photoRight ? "3rem" : "2.6rem",
                                        paddingLeft: photoRight ? "2.6rem" : "3rem",
                                    }}>
                                        {/* Role label */}
                                        <motion.p
                                            custom={0.08} variants={textItem}
                                            initial="hidden" whileInView="show" viewport={{ once: true }}
                                            style={{ fontSize: 11, letterSpacing: "0.2em", color: "#4a8820", textTransform: "uppercase", fontWeight: 700, margin: 0 }}
                                        >
                                            {l.r}
                                        </motion.p>

                                        {/* Name */}
                                        <motion.h2
                                            custom={0.14} variants={textItem}
                                            initial="hidden" whileInView="show" viewport={{ once: true }}
                                            style={{ fontSize: "1.8rem", fontWeight: 700, color: "#182e0e", margin: "0.28rem 0 0.45rem", lineHeight: 1.2 }}
                                        >
                                            {l.n}
                                        </motion.h2>

                                        {/* Animated green underline */}
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            whileInView={{ scaleX: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.42, ease: EASE, delay: 0.2 }}
                                            style={{ width: 44, height: 3, background: "#4a8820", borderRadius: 2, marginBottom: "1.3rem", transformOrigin: "left" }}
                                        />

                                        {/* Education */}
                                        <motion.p
                                            custom={0.24} variants={textItem}
                                            initial="hidden" whileInView="show" viewport={{ once: true }}
                                            style={{ fontSize: 13.5, color: "#3a5228", lineHeight: 1.78, margin: "0 0 0.65rem" }}
                                        >
                                            <strong style={{ color: "#1d3410", fontWeight: 700, textTransform: "uppercase", fontSize: 11.5, letterSpacing: "0.05em" }}>Education: </strong>
                                            {l.education}
                                        </motion.p>

                                        {/* Summary */}
                                        <motion.p
                                            custom={0.32} variants={textItem}
                                            initial="hidden" whileInView="show" viewport={{ once: true }}
                                            style={{ fontSize: 13.5, color: "#3a5228", lineHeight: 1.78, margin: "0 0 0.65rem" }}
                                        >
                                            <strong style={{ color: "#1d3410", fontWeight: 700, textTransform: "uppercase", fontSize: 11.5, letterSpacing: "0.05em" }}>
                                                {l.roles.length ? "Professional Summary: " : "Experience: "}
                                            </strong>
                                            {l.summary}
                                        </motion.p>

                                        {/* Roles */}
                                        {l.roles.length > 0 && (
                                            <motion.div
                                                custom={0.38} variants={textItem}
                                                initial="hidden" whileInView="show" viewport={{ once: true }}
                                            >
                                                <p style={{ fontSize: 11.5, fontWeight: 700, color: "#1d3410", margin: "0.2rem 0 0.5rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                                                    Current Professional Roles:
                                                </p>
                                                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                                    {l.roles.map((role, ri) => (
                                                        <motion.li
                                                            key={role}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            whileInView={{ opacity: 1, x: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 0.36, ease: EASE, delay: 0.42 + ri * 0.08 }}
                                                            style={{ fontSize: 13.5, color: "#3a5228", padding: "0.22rem 0", display: "flex", gap: 9, alignItems: "flex-start" }}
                                                        >
                                                            <span style={{ color: "#4a8820", fontWeight: 700, flexShrink: 0, marginTop: 3 }}>✓</span>
                                                            {role}
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* ══ PHOTO COLUMN ══
                                        - Fixed width green panel
                                        - Circle photo is absolutely centered and overflows the panel on the text side
                                        - Leaf badge bottom-right of circle
                                    */}
                                    <div style={{
                                        position: "relative",
                                        width: 320,
                                        flexShrink: 0,
                                        background: "linear-gradient(150deg, #eaf4dc 0%, #d8edba 60%, #cce8a8 100%)",
                                        /* rounded only on the outer edge */
                                        borderRadius: photoRight ? "0 22px 22px 0" : "22px 0 0 22px",
                                        overflow: "visible",
                                    }}>
                                        {/* Dot grid inside green panel */}
                                        <DotGrid />

                                        {/* Circle photo — overflows ~70px onto text column */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.85 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true, margin: "-40px" }}
                                            transition={{ duration: 0.62, ease: EASE, delay: 0.12 }}
                                            whileHover={{ scale: 1.04, transition: { duration: 0.35 } }}
                                            style={{
                                                position: "absolute",
                                                top: l.photoTop,
                                                /* overflow into text side */
                                                left: photoRight ? l.photoOffset : "auto",
                                                right: photoRight ? "auto" : l.photoOffset,
                                                transform: "translateY(-42%)",
                                                zIndex: 10,
                                                width: 270,
                                                height: 270,
                                            }}
                                        >
                                            {/* Thin outer green ring stroke */}
                                            <div style={{
                                                width: 270,
                                                height: 270,
                                                borderRadius: "50%",
                                                border: "2px solid #85c455",
                                                padding: 5,
                                                background: "transparent",
                                                boxSizing: "border-box",
                                            }}>
                                                {/* White gap then photo */}
                                                <div style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    borderRadius: "50%",
                                                    border: "5px solid #fff",
                                                    overflow: "hidden",
                                                    background: "#d0e8b0",
                                                    boxSizing: "border-box",
                                                }}>
                                                    <img
                                                        src={l.img}
                                                        alt={l.n}
                                                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Leaf badge — bottom-right of circle */}
                                            <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                whileInView={{ scale: 1, opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.38, ease: EASE, delay: 0.5 }}
                                                style={{
                                                    position: "absolute",
                                                    bottom: 8,
                                                    right: 8,
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: "50%",
                                                    background: "#fff",
                                                    border: "1.5px solid #b8dca0",
                                                    boxShadow: "0 2px 10px rgba(0,0,0,0.10)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: 24,
                                                    zIndex: 11,
                                                }}
                                            >
                                                🌿
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            </main>
        </div>
    );
}
// import { motion } from "framer-motion";
// import { MeshBlobs, GridLines } from "./animated-bg";
// import SiteNav from "./SiteHeader";
// // Fallback to existing placeholder while leader images are added to assets/leaders/
// import parthImg from "@/assets/leaders/1.png";
// import lakhamanImg from "@/assets/leaders/2.png";
// import satyenImg from "@/assets/leaders/3.png";
// import "../responsive.css";

// const EASE = [0.22, 1, 0.36, 1];

// const leaders = [
//     {
//         n: "MR. PARTH VISANA",
//         r: "Director",
//         img: parthImg,
//         content: `
// EDUCATION : He has Graduated in Food Processing and technology from A.D.Patel institute of Technology.

// PROFESSIONAL SUMMARY : Mr Parth is a highly experienced businessman with a robust background in cement industry raw material supplier as well as treated hazardous chemical waste. With over 6 years of experience. MR.Visana also owner of the “ Neja Multispeciality hospital “ at Bagvadar, Porbandar. Known for strategic long term planning and financial literacy is his strength. He has successfully led numerous projects and teams to achieve organizational goals and drive growth.

// CURRENT PROFESSIONAL ROLES :
// 1. Founder and partner of NEJA ASSOCIATES, a Raw-material supplier firm.
// 2. Founder and partner of NEJA HEALTHCARE HOSPITALS LLP .
// 3. Proprietor of Parth Roadways.
//         `,
//     },
//     {
//         n: "MR. Lakhaman Odedra",
//         r: "Director",
//         img: lakhamanImg,
//         content: `
// EDUCATION: He has Graduated in Bachelor of Arts .

// PROFESSIONAL SUMMARY:
// Mr Lakhaman is a highly experienced businessman with a powerful background, as well as authorise transporter in saurashtra cement Ltd (Hathi cement) . MR. Odedra also Known for strategic deep-rooted planning , management skills and leader is his strength. He has successfully led numerous projects .

// CURRENT PROFESSIONAL ROLES:
// Chairman : Agricultural Produce Market Committee Of porbandar district, Gujarat.
// 1. Founder and partner of Okhai Enterprise .
// 2. Founder and partner of Divine Project .
// 3. Founder and partner of Subh Enterprise .
//         `,
//     },
//     {
//         n: "Mr. Satyen Chudasama",
//         r: "General Manager - Operation",
//         img: satyenImg,
//         content: `
// EDUCATION : BSc in chemistry, Post Diploma in industrial safety,Post Diploma in Environment Technology and Management

// Experience : 30 + years in chemical industry (dyes intermediate products and green fields projects)

// He is working with Okhai Pharma intermediate pvt Ltd as a GM operation.
//         `,
//     },
// ];

// export default function LeadershipPage() {
//     const container = {
//         hidden: {},
//         show: { transition: { staggerChildren: 0.12 } },
//     };

//     const item = {
//         hidden: (i) => ({ opacity: 0, y: 24, scale: 0.98, rotate: i % 2 === 0 ? -4 : 4 }),
//         show: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { duration: 0.7, ease: EASE } },
//     };

//     return (
//         <div className="min-h-screen bg-background">
//             <SiteNav />
//             <main>
//                 <section className="lead-hero relative pt-24 pb-12 bg-gradient-to-r from-primary/20 to-background">
//                     <MeshBlobs className="opacity-30" />
//                     <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center py-20">
//                         <h1 className="text-5xl font-display text-foreground">Leadership</h1>
//                         <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
//                             The people behind the molecule — experienced professionals guiding our quality, operations and growth.
//                         </p>
//                     </div>
//                 </section>

//                 <section className="py-16 px-6 lg:px-10">
//                     <motion.div className="mx-auto max-w-7xl space-y-28" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
//                         {leaders.map((l, i) => (
//                             <motion.div key={l.n} custom={i} variants={item} className="relative">
//                                 <div className={`leader-block grid items-center gap-8 ${i % 2 === 0 ? 'lg:grid-cols-[1fr_520px]' : 'lg:grid-cols-[520px_1fr]'}`}>
//                                     <motion.div className="leader-text p-6"
//                                         whileHover={{ scale: 1.01 }}
//                                         transition={{ duration: 0.4 }}
//                                     >
//                                         <div className="text-xs uppercase tracking-[0.2em] text-primary">{l.r}</div>
//                                         <h2 className="mt-3 text-3xl font-display leading-tight">{l.n}</h2>
//                                         <div className="mt-4 text-muted-foreground leading-relaxed whitespace-pre-line">{l.content}</div>
//                                     </motion.div>

//                                     <motion.div className="leader-image p-6 flex items-center justify-center"
//                                         whileHover={{ scale: 1.06, rotate: i % 2 === 0 ? -1 : 1 }}
//                                         transition={{ duration: 0.45 }}
//                                     >
//                                         <div className="relative">
//                                             <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-primary/30 to-mint blur-3xl opacity-60" />
//                                             <div className="relative rounded-full w-80 h-80 md:w-96 md:h-96 overflow-hidden border-8 border-background shadow-elevated transform transition-transform duration-500">
//                                                 <img src={l.img} alt={l.n} className="w-full h-full object-cover" />
//                                             </div>
//                                         </div>
//                                     </motion.div>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </motion.div>
//                 </section>
//             </main>
//         </div>
//     );
// }
