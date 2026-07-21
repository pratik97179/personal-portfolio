import { Section } from "@/components/ui/section";
import type { ExperienceItemType } from "@/components/ui/work-experience";
import { WorkExperience } from "@/components/ui/work-experience";

const WORK_EXPERIENCE: ExperienceItemType[] = [
    {
        id: "first-demat",
        companyName: "First Demat",
        companyDescription:
            "India's platform for opening a free Demat account and starting an investment journey with confidence. Built by fintech technologists and market professionals for everyone — from first-time investors to seasoned traders.",
        companyMeta:
            "Financial Services · Ranchi, Jharkhand · Founded 2024 · firstdemat.com",
        positions: [
            {
                id: "first-demat-frontend-lead",
                title: "Frontend Lead",
                employmentPeriod: "Nov 2025 — present",
                employmentType: "Full-time",
                location: "Ranchi, India",
                icon: "code",
                description: `
- Defined the frontend architecture and engineering foundations
- Built a configurable WebSocket client package for direct binary feed consumption
- Established an organization-wide design system and reusable components
- Created a compile-time safe architecture through generated contracts`,
                skills: [
                    "Next.js",
                    "WebSocket",
                    "TypeScript",
                    "Offline-first",
                    "CI/CD",
                ],
                isExpanded: true,
            },
        ],
        isCurrentEmployer: true,
    },
    {
        id: "5paisa",
        companyName: "5paisa Capital Ltd.",
        companyDescription:
            "Tech-first discount broker built by traders, for traders. Since 2016: Equity, F&O, ETFs, Mutual Funds, IPOs, Smallcase, Stock SIP, and Commodities — with fast execution, real-time analytics, and advanced charting.",
        companyMeta:
            "Financial Services · Mumbai, Maharashtra · Founded 2016 · 47L+ investors · 5paisa.com",
        positions: [
            {
                id: "5paisa-software-developer",
                title: "Software Developer",
                employmentPeriod: "Oct 2024 — Sept 2025",
                employmentType: "Full-time",
                location: "Bangalore, India",
                icon: "business",
                description: `
- Owned F&O and Mutual Funds in the Flutter rewrite of the 5paisa app, replacing separate Android and iOS codebases.
- Ran a dual-channel WebSocket setup with reconnect, fallback, and lifecycle-aware connections; bridged Kotlin and Swift for SDKs and platform-specific flows.
- Brought average screen load from 1.7s to 0.95s with caching, pagination, and tighter request handling; cut session drops by 90%; kept 85%+ coverage on critical modules with unit, widget, and golden tests.`,
                skills: ["Flutter", "Kotlin", "Swift", "WebSocket", "TDD"],
            },
        ],
    },
    {
        id: "antino-labs",
        companyName: "Antino Labs",
        companyDescription:
            "AI consulting and digital transformation company building user-centric products for global enterprises — from AI agents and custom LLM integrations to design, automation, and end-to-end product development.",
        companyMeta:
            "IT Services · Gurgaon, Haryana · Founded 2018 · 600+ engineers · antino.com",
        positions: [
            {
                id: "antino-senior-engineer",
                title: "Senior Software Engineer",
                employmentPeriod: "Mar 2024 — Oct 2024",
                employmentType: "Full-time",
                location: "Bangalore, India",
                icon: "design",
                description: `
- Worked on Flash.co, a cross-platform order-tracking and rewards app on Flutter (1M+ downloads).
- Reworked fl_chart for frame-synced real-time charts; wired native WebViews through platform channels; drove layouts and feature flags from the server.
- Got about 4x smoother chart transitions on lower-end devices, 35% fewer frame drops on heavy screens, and an 18% lift in feature engagement from server-driven UI.`,
                skills: ["Flutter", "fl_chart", "Platform Channels", "SDR"],
            },
        ],
    },
    {
        id: "tech-alchemy",
        companyName: "Tech Alchemy",
        companyDescription:
            "London-based product team combining product thinking with deep technical expertise across AI and blockchain. Helps ambitious teams launch, scale, and evolve software — from early MVPs to established platforms.",
        companyMeta:
            "Software Development · London · Founded 2016 · 200+ people · techalchemy.com",
        positions: [
            {
                id: "tech-alchemy-engineer",
                title: "Software Engineer",
                employmentPeriod: "Jul 2021 — Feb 2024",
                employmentType: "Full-time",
                location: "Remote, India",
                icon: "code",
                description: `
- Shipped Are You In?, Perro, and Fight Out on Flutter, React, and Next.js.
- Built deep linking and magic-link onboarding with token auth; integrated Web3Auth for embedded wallets; wrote a custom media player with buffering, background play, and lifecycle-aware controls.
- Improved API response times by 60% and graph rendering by 4.3x with caching and virtualization; used Docker locally and TDD on the modules that mattered most.`,
                skills: [
                    "Flutter",
                    "React",
                    "Next.js",
                    "Web3Auth",
                    "Docker",
                    "TDD",
                ],
            },
        ],
    },
    {
        id: "naai",
        companyName: "Naai",
        companyDescription:
            "Salon booking and discovery product — geo-based salon search, payments, and booking flows for customers and salon partners.",
        companyMeta: "Consumer · India · Freelance",
        positions: [
            {
                id: "naai-freelance",
                title: "Software Engineer",
                employmentPeriod: "Before Jul 2021",
                employmentType: "Freelance",
                location: "India",
                icon: "code",
                description: `
- Built Naai, a Flutter salon booking and discovery app, with Provider/MVVM, Firebase, and a Node.js + MongoDB backend.
- Shipped a token-based, theme-aware design system; integrated Razorpay (retries, invoices, webhook verification) and Mapbox for nearby salon search and navigation.
- Cut UI rework by 40% through the shared component system; moved booking APIs onto Node.js + MongoDB for lower latency and better failover.`,
                skills: [
                    "Flutter",
                    "Provider",
                    "MVVM",
                    "Firebase",
                    "MongoDB",
                    "Node.js",
                    "Mapbox",
                    "Razorpay",
                ],
            },
        ],
    },
    {
        id: "education",
        companyName: "Maharaja Agrasen Institute of Technology, GGSIPU",
        positions: [
            {
                id: "education-btech-it",
                title: "B.Tech — Information Technology",
                employmentPeriod: "2017 — 2021",
                employmentType: "Graduated",
                location: "Delhi, India",
                icon: "education",
                description:
                    "Bachelor of Technology in Information Technology — foundations in software engineering, systems, and building production-ready applications.",
                skills: [
                    "Information Technology",
                    "Software Engineering",
                    "Systems",
                ],
            },
        ],
    },
];

export function WorkExperienceSection() {
    return (
        <Section animatedStripes title="Professional Experience">
            <WorkExperience experiences={WORK_EXPERIENCE} />
        </Section>
    );
}
