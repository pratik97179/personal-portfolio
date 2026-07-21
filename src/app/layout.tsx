import { AppProviders } from "@/components/providers/providers";
import {
    PersonStructuredData,
    WebsiteStructuredData,
} from "@/components/seo/structured-data";
import { ThemeInitializer } from "@/components/theme-initializer";
import { profile } from "@/core/config/profile";
import { baseUrl } from "@/core/config/site";
import { cn } from "@/shared/lib/cn";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { ReactNode } from "react";
import "./global.css";

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
        default: `${profile.name} - ${profile.title}`,
        template: `%s | ${profile.name}`,
    },
    description: profile.bio,
    keywords: [
        profile.name,
        profile.title,
        "Software Engineer",
        "Flutter",
        "React",
        "Next.js",
        "TypeScript",
        "WebSockets",
        "Fintech",
        "India",
    ],
    authors: [{ name: profile.name, url: baseUrl }],
    creator: profile.name,
    publisher: profile.name,
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: `${profile.name} - ${profile.title}`,
        description: profile.bio,
        url: baseUrl,
        siteName: profile.name,
        locale: "en_US",
        type: "website",
        images: [
            {
                url: "/og",
                width: 1200,
                height: 630,
                alt: `${profile.name} - ${profile.title}`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: `${profile.name} - ${profile.title}`,
        description: profile.bio,
        images: ["/og"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/favicon.svg", type: "image/svg+xml" },
            { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
            { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
        ],
        shortcut: "/favicon.ico",
        apple: "/apple-icon.png",
    },
    manifest: "/manifest.webmanifest",
    other: {
        "dns-prefetch": ["//api.github.com", "//api.spotify.com"],
    },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cn(
                "bg-white text-black antialiased dark:bg-black dark:text-white",
                `${GeistSans.variable} ${GeistMono.variable} font-sans`,
            )}
        >
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||!t){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})()`,
                    }}
                />
                <link rel="dns-prefetch" href="//api.github.com" />
                <link rel="dns-prefetch" href="//api.spotify.com" />
                <link
                    rel="dns-prefetch"
                    href="//avatars.githubusercontent.com"
                />
                <link rel="dns-prefetch" href="//i.scdn.co" />
                <link rel="dns-prefetch" href="//yt3.googleusercontent.com" />
                <link
                    rel="preconnect"
                    href="https://avatars.githubusercontent.com"
                />
                <link rel="preconnect" href="https://i.scdn.co" />

                <ThemeInitializer />
                <WebsiteStructuredData />
                <PersonStructuredData />
            </head>
            <body
                className="antialiased bg-background text-foreground"
                suppressHydrationWarning
            >
                <AppProviders>{children}</AppProviders>
            </body>
        </html>
    );
}
