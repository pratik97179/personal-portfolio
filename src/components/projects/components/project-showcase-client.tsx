"use client";

import { memo, useCallback, useEffect, useState } from "react";
import type { IProject } from "../types";
import { ProjectRow } from "./project-row";

type Props = {
    projects: IProject[];
};

const DESKTOP_MQ = "(min-width: 1024px)";

export const ProjectShowcaseClient = memo(function ProjectShowcaseClient({
    projects,
}: Props) {
    const [expandedName, setExpandedName] = useState<string | null>(null);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(DESKTOP_MQ);
        const sync = () => {
            const desktop = media.matches;
            setIsDesktop(desktop);
            if (desktop) setExpandedName(null);
        };
        sync();
        media.addEventListener("change", sync);
        return () => media.removeEventListener("change", sync);
    }, []);

    const handleToggle = useCallback((name: string) => {
        setExpandedName((current) => (current === name ? null : name));
    }, []);

    if (projects.length === 0) return null;

    return (
        <div className="flex flex-col border-t border-border">
            {projects.map((project) => (
                <ProjectRow
                    key={project.name}
                    project={project}
                    isDesktop={isDesktop}
                    isExpanded={expandedName === project.name}
                    onToggle={() => handleToggle(project.name)}
                />
            ))}
        </div>
    );
});
