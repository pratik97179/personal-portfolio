import { githubUsername } from '@/core/config/site'
const REPO_SEGMENT_PATTERN = /^[A-Za-z0-9._-]+$/

function getAllowedOwner() {
	return githubUsername.toLowerCase()
}

export function isAllowedGitHubRepo(owner: string, repo: string) {
	return (
		owner.toLowerCase() === getAllowedOwner() &&
		REPO_SEGMENT_PATTERN.test(owner) &&
		REPO_SEGMENT_PATTERN.test(repo)
	)
}
