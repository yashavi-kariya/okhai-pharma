import { motion } from "framer-motion";
import { MeshBlobs, GridLines } from "./animated-bg";
import SiteNav from "./SiteHeader";
// Fallback to existing placeholder while leader images are added to assets/leaders/
import parthImg from "@/assets/leaders/1.png";
import lakhamanImg from "@/assets/leaders/2.png";
import satyenImg from "@/assets/leaders/3.png";
import "../responsive.css";

const EASE = [0.22, 1, 0.36, 1];

const leaders = [
    {
        n: "MR. PARTH VISANA",
        r: "Director",
        img: parthImg,
        content: `
EDUCATION : He has Graduated in Food Processing and technology from A.D.Patel institute of Technology.

PROFESSIONAL SUMMARY : Mr Parth is a highly experienced businessman with a robust background in cement industry raw material supplier as well as treated hazardous chemical waste. With over 6 years of experience. MR.Visana also owner of the “ Neja Multispeciality hospital “ at Bagvadar, Porbandar. Known for strategic long term planning and financial literacy is his strength. He has successfully led numerous projects and teams to achieve organizational goals and drive growth.

CURRENT PROFESSIONAL ROLES :
1. Founder and partner of NEJA ASSOCIATES, a Raw-material supplier firm.
2. Founder and partner of NEJA HEALTHCARE HOSPITALS LLP .
3. Proprietor of Parth Roadways.
        `,
    },
    {
        n: "MR. Lakhaman Odedra",
        r: "Director",
        img: lakhamanImg,
        content: `
EDUCATION: He has Graduated in Bachelor of Arts .

PROFESSIONAL SUMMARY:
Mr Lakhaman is a highly experienced businessman with a powerful background, as well as authorise transporter in saurashtra cement Ltd (Hathi cement) . MR. Odedra also Known for strategic deep-rooted planning , management skills and leader is his strength. He has successfully led numerous projects .

CURRENT PROFESSIONAL ROLES:
Chairman : Agricultural Produce Market Committee Of porbandar district, Gujarat.
1. Founder and partner of Okhai Enterprise .
2. Founder and partner of Divine Project .
3. Founder and partner of Subh Enterprise .
        `,
    },
    {
        n: "Mr. Satyen Chudasama",
        r: "General Manager - Operation",
        img: satyenImg,
        content: `
EDUCATION : BSc in chemistry, Post Diploma in industrial safety,Post Diploma in Environment Technology and Management

Experience : 30 + years in chemical industry (dyes intermediate products and green fields projects)

He is working with Okhai Pharma intermediate pvt Ltd as a GM operation.
        `,
    },
];

export default function LeadershipPage() {
    const container = {
        hidden: {},
        show: { transition: { staggerChildren: 0.12 } },
    };

    const item = {
        hidden: (i) => ({ opacity: 0, y: 24, scale: 0.98, rotate: i % 2 === 0 ? -4 : 4 }),
        show: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { duration: 0.7, ease: EASE } },
    };

    return (
        <div className="min-h-screen bg-background">
            <SiteNav />
            <main>
                <section className="lead-hero relative pt-24 pb-12 bg-gradient-to-r from-primary/20 to-background">
                    <MeshBlobs className="opacity-30" />
                    <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center py-20">
                        <h1 className="text-5xl font-display text-foreground">Leadership</h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            The people behind the molecule — experienced professionals guiding our quality, operations and growth.
                        </p>
                    </div>
                </section>

                <section className="py-16 px-6 lg:px-10">
                    <motion.div className="mx-auto max-w-7xl space-y-28" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        {leaders.map((l, i) => (
                            <motion.div key={l.n} custom={i} variants={item} className="relative">
                                <div className={`leader-block grid items-center gap-8 ${i % 2 === 0 ? 'lg:grid-cols-[1fr_520px]' : 'lg:grid-cols-[520px_1fr]'}`}>
                                    <motion.div className="leader-text p-6"
                                        whileHover={{ scale: 1.01 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className="text-xs uppercase tracking-[0.2em] text-primary">{l.r}</div>
                                        <h2 className="mt-3 text-3xl font-display leading-tight">{l.n}</h2>
                                        <div className="mt-4 text-muted-foreground leading-relaxed whitespace-pre-line">{l.content}</div>
                                    </motion.div>

                                    <motion.div className="leader-image p-6 flex items-center justify-center"
                                        whileHover={{ scale: 1.06, rotate: i % 2 === 0 ? -1 : 1 }}
                                        transition={{ duration: 0.45 }}
                                    >
                                        <div className="relative">
                                            <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-primary/30 to-mint blur-3xl opacity-60" />
                                            <div className="relative rounded-full w-80 h-80 md:w-96 md:h-96 overflow-hidden border-8 border-background shadow-elevated transform transition-transform duration-500">
                                                <img src={l.img} alt={l.n} className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>
            </main>
        </div>
    );
}
