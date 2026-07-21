import type { Project } from "@/server/db/project-schema";
import { Suspense } from "react";
import { STATIC_PROJECTS } from "../data/static-projects";
import { enrichProjectsWithGitData } from "../server/github";
import { getProjects } from "../server/queries";
import type { IProject, TPreview } from "../types";
import { ProjectRowSkeleton } from "./project-row-skeleton";
import { ProjectShowcaseClient } from "./project-showcase-client";

type Props = {
    visibleRowCount?: number;
};

function withQueryParam(url: string, key: string, value: string) {
    try {
        const parsed = new URL(url);
        parsed.searchParams.set(key, value);
        return parsed.toString();
    } catch {
        return url;
    }
}

function mapDbProjectToIProject(dbProject: Project): IProject {
    const embedUrl = dbProject.demoBox ?? undefined;
    const themedEmbedUrl =
        dbProject.title === "Dora" && embedUrl
            ? withQueryParam(embedUrl, "theme", "claude-dark")
            : embedUrl;

    const preview: TPreview = dbProject.demoUrl
        ? {
              type: "iframe",
              url: dbProject.demoUrl,
              embedUrl: themedEmbedUrl,
          }
        : { type: "none" };

    return {
        name: dbProject.title,
        description: dbProject.desc,
        additionalDescription: dbProject.additionalDesc ?? undefined,
        type: dbProject.native ? "desktop" : "utility",
        status: "active",
        github: dbProject.gitUrl ?? "",
        tech: dbProject.labels,
        preview,
        spotlight: dbProject.featured,
    };
}

function ShowcaseSkeleton({ rowCount }: { rowCount: number }) {
    return (
        <div className="flex flex-col border-t border-border">
            {Array.from({ length: rowCount }).map((_, i) => (
                <ProjectRowSkeleton key={i} />
            ))}
        </div>
    );
}

async function ProjectShowcaseAsync() {
    const sourceProjects =
        STATIC_PROJECTS.length > 0
            ? STATIC_PROJECTS
            : (await getProjects()).map(mapDbProjectToIProject);

    let enrichedProjects = sourceProjects;

    try {
        enrichedProjects = await enrichProjectsWithGitData(sourceProjects);
    } catch (error) {
        console.error(
            "[ProjectShowcase] Git enrichment failed, using static data:",
            error,
        );
    }

    return <ProjectShowcaseClient projects={enrichedProjects} />;
}

export function ProjectShowcase({
    visibleRowCount = STATIC_PROJECTS.length || 3,
}: Props) {
    return (
        <Suspense fallback={<ShowcaseSkeleton rowCount={visibleRowCount} />}>
            <ProjectShowcaseAsync />
        </Suspense>
    );
}
