"use client";

import { ThemeSwitch } from "@/components/theme-switch";
import { Toaster } from "sonner";

export function AppChrome() {
    return (
        <>
            <ThemeSwitch />
            <Toaster />
        </>
    );
}
