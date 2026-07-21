import { visit } from 'unist-util-visit'

export function rehypeExtractCodeMeta() {
	return (tree: any) => {
		visit(tree, 'element', (node: any) => {
			if (
				node.tagName === 'pre' &&
				node.children &&
				node.children.length > 0
			) {
				const codeNode = node.children[0]
				if (codeNode && codeNode.tagName === 'code') {
					if (codeNode.data && codeNode.data.meta) {
						codeNode.properties.metastring = codeNode.data.meta
					}
					else if (codeNode.properties && codeNode.properties.title) {
						codeNode.properties.metastring = `title="${codeNode.properties.title}"`
					}
				}
			}
		})
	}
}
