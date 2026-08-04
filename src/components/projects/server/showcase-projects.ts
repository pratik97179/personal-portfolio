import type { Project } from '@/server/db/project-schema'
import { STATIC_PROJECTS } from '../data/static-projects'
import { enrichProjectsWithGitData } from '../server/github'
import { getProjects } from '../server/queries'
import type { IProject, TPreview } from '../types'

function withQueryParam(url: string, key: string, value: string) {
	try {
		const parsed = new URL(url)
		parsed.searchParams.set(key, value)
		return parsed.toString()
	} catch {
		return url
	}
}

function mapDbProjectToIProject(dbProject: Project): IProject {
	const embedUrl = dbProject.demoBox ?? undefined
	const themedEmbedUrl =
		dbProject.title === 'Dora' && embedUrl
			? withQueryParam(embedUrl, 'theme', 'claude-dark')
			: embedUrl

	const preview: TPreview = dbProject.demoUrl
		? {
				type: 'iframe',
				url: dbProject.demoUrl,
				embedUrl: themedEmbedUrl
			}
		: { type: 'none' }

	return {
		name: dbProject.title,
		description: dbProject.desc,
		additionalDescription: dbProject.additionalDesc ?? undefined,
		type: dbProject.native ? 'desktop' : 'utility',
		status: 'active',
		github: dbProject.gitUrl ?? '',
		tech: dbProject.labels,
		preview,
		spotlight: dbProject.featured
	}
}

/** Shared project source for home teaser + After Hours catalog. */
export async function getShowcaseProjects(): Promise<IProject[]> {
	const sourceProjects =
		STATIC_PROJECTS.length > 0
			? STATIC_PROJECTS
			: (await getProjects()).map(mapDbProjectToIProject)

	try {
		return await enrichProjectsWithGitData(sourceProjects)
	} catch (error) {
		console.error(
			'[getShowcaseProjects] Git enrichment failed, using static data:',
			error
		)
		return sourceProjects
	}
}
