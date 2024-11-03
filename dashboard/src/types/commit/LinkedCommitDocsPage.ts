
export interface LinkedCommitDocsPage{
	name: string
	creation: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	Commit Docs Page : Link - Commit Docs Page	*/
	commit_docs_page: string
}