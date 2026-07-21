import { profile } from "@/core/config/profile";
import Image from "next/image";

export function Intro() {
    return (
        <header className="px-4 md:px-5">
            <div className="flex items-start gap-4 mb-4">
                <div suppressHydrationWarning className="shrink-0">
                    <Image
                        src={profile.avatarUrl}
                        alt={`${profile.name} - ${profile.title}`}
                        width={224}
                        height={224}
                        sizes="56px"
                        priority
                        quality={85}
                        className="w-14 h-14 rounded-full border-2 border-border/50 shadow-sm"
                    />
                </div>
                <div className="min-w-0">
                    <h1 className="text-xl font-semibold tracking-tight text-foreground">
                        {profile.name}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        {profile.title}
                    </p>
                </div>
            </div>

            <div className="max-w-none">
                <p className="text-sm text-muted-foreground/80 leading-relaxed font-mono tracking-tight">
                    Software engineer building products for{" "}
                    <em>mobile and the web</em>.{" "}
                    <strong>{profile.yearsExperience} years</strong> shipping
                    trading platforms, fintech apps, and consumer products used
                    by millions.
                </p>
            </div>
        </header>
    );
}
