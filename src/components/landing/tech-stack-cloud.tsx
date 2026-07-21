"use client";

import { cn } from "@/shared/lib/cn";
import { Layers, Network, Plus } from "lucide-react";
import {
    motion,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import {
    SiDocker,
    SiFlutter,
    SiGithubactions,
    SiKotlin,
    SiNextdotjs,
    SiReact,
    SiSwift,
    SiTypescript,
} from "react-icons/si";

type TechItem = {
    name: string;
    label: string;
    Icon:
        | React.ComponentType<{ className?: string }>
        | React.ComponentType<{ className?: string }>[];
};

const LOGOS: TechItem[] = [
    { name: "flutter", label: "Flutter", Icon: SiFlutter },
    { name: "react", label: "React", Icon: SiReact },
    { name: "next", label: "Next.js", Icon: SiNextdotjs },
    { name: "typescript", label: "TypeScript", Icon: SiTypescript },
    { name: "native", label: "Kotlin / Swift", Icon: [SiKotlin, SiSwift] },
    {
        name: "architecture",
        label: "System Design / Architecture",
        Icon: [Network, Layers],
    },
    {
        name: "realtime",
        label: "WebSockets / Offline-first",
        Icon: [SiReact, SiFlutter],
    },
    {
        name: "tools",
        label: "Docker / CI/CD",
        Icon: [SiDocker, SiGithubactions],
    },
];

const CARD_STYLES = [
    {
        className:
            "relative border-r border-b bg-secondary dark:bg-secondary/30",
        decorators: (
            <Plus
                className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 text-muted-foreground/50"
                strokeWidth={1}
                aria-hidden="true"
            />
        ),
    },
    {
        className: "border-b md:border-r",
        decorators: null,
    },
    {
        className:
            "relative border-r border-b md:bg-secondary dark:md:bg-secondary/30",
        decorators: (
            <>
                <Plus
                    className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 text-muted-foreground/50"
                    strokeWidth={1}
                    aria-hidden="true"
                />
                <Plus
                    className="-bottom-[12.5px] -left-[12.5px] absolute z-10 hidden size-6 md:block text-muted-foreground/50"
                    strokeWidth={1}
                    aria-hidden="true"
                />
            </>
        ),
    },
    {
        className:
            "relative border-b bg-secondary md:bg-background dark:bg-secondary/30 md:dark:bg-background",
        decorators: null,
    },
    {
        className:
            "relative border-r border-b bg-secondary md:border-b-0 md:bg-background dark:bg-secondary/30 md:dark:bg-background",
        decorators: (
            <Plus
                className="-right-[12.5px] -bottom-[12.5px] md:-left-[12.5px] absolute z-10 size-6 md:hidden text-muted-foreground/50"
                strokeWidth={1}
                aria-hidden="true"
            />
        ),
    },
    {
        className:
            "border-b bg-background md:border-r md:border-b-0 md:bg-secondary dark:md:bg-secondary/30",
        decorators: null,
    },
    {
        className: "border-r border-b md:border-b-0",
        decorators: null,
    },
    {
        className: "bg-secondary dark:bg-secondary/30 border-b md:border-b-0",
        decorators: null,
    },
];

type TechStackCloudProps = React.ComponentProps<"div">;

export function TechStackCloud({ className, ...props }: TechStackCloudProps) {
    return (
        <div
            className={cn(
                "relative grid grid-cols-2 md:grid-cols-4",
                className,
            )}
            {...props}
        >
            <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-dvw border-t" />

            {LOGOS.map(function (logo, i) {
                const style = CARD_STYLES[i] || {
                    className: "border-r border-b",
                    decorators: null,
                };
                return (
                    <TechCard
                        key={logo.name}
                        logo={logo}
                        className={style.className}
                    >
                        {style.decorators}
                    </TechCard>
                );
            })}

            <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-dvw border-b" />
        </div>
    );
}

type TechCardProps = React.ComponentProps<"div"> & {
    logo: TechItem;
};

function TechCard({ logo, className, children, ...props }: TechCardProps) {
    const Icons = Array.isArray(logo.Icon) ? logo.Icon : [logo.Icon];
    const containerRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const { scrollY } = useScroll();

    const rawRotation = useTransform(
        [scrollYProgress, scrollY],
        ([p, y]: number[]) => {
            if (y < 50) return 0;

            const range = 0.2;
            const start = 0.4;

            const progress = Math.min(Math.max((p - start) / range, 0), 1);
            return progress * (Icons.length - 1) * 180;
        },
    );

    const steppedRotation = useTransform(
        rawRotation,
        (v) => Math.round(v / 180) * 180,
    );

    const rotationX = useSpring(steppedRotation, {
        stiffness: 222,
        damping: 45,
    });

    useMotionValueEvent(rotationX, "change", (latest) => {
        const newIndex = Math.floor((latest + 90) / 180) % Icons.length;
        if (newIndex !== index) {
            setIndex(newIndex);
        }
    });

    const ActiveIcon = Icons[index];

    return (
        <div
            ref={containerRef}
            className={cn(
                "flex items-center justify-center bg-background px-4 py-8 md:p-8 relative overflow-hidden group min-h-[120px]",
                className,
            )}
            style={{ perspective: "1000px" }}
            {...props}
        >
            <div className="relative flex w-full flex-col items-center justify-end gap-2 h-16">
                <div className="relative mb-1 flex h-10 w-10 shrink-0 items-center justify-center">
                    <motion.div
                        style={{
                            rotateX: rotationX,
                            transformStyle: "preserve-3d",
                        }}
                        className="flex h-full w-full items-center justify-center"
                    >
                        <div
                            className="flex h-full w-full items-center justify-center"
                            style={{
                                backfaceVisibility: "hidden",
                                transform:
                                    index % 2 === 1
                                        ? "rotateX(180deg)"
                                        : "none",
                            }}
                        >
                            <ActiveIcon
                                className="block h-8 w-8 shrink-0 text-foreground/60 transition-colors duration-200 group-hover:text-foreground md:h-10 md:w-10"
                                aria-hidden="true"
                            />
                        </div>
                    </motion.div>
                </div>

                <div className="h-4 w-full px-1 text-center text-[10px] font-medium leading-4 text-muted-foreground">
                    <span className="block truncate">{logo.label}</span>
                </div>
            </div>

            {children}
        </div>
    );
}
