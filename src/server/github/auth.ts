export function getGitHubToken() {
	const token = process.env.GITHUB_TOKEN?.trim()
	if (token) {
		return token
	}

	return ''
}
