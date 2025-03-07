
export interface CommitSettings{
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
	/**	Show System Apps : Check	*/
	show_system_apps?: 0 | 1
	/**	Commit Docs Header : Data	*/
	commit_docs_header?: string
	/**	Commit Docs Description : Small Text	*/
	commit_docs_description?: string
}