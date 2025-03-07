
export interface CommitDocsGroupItem{
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
	/**	Parent Label : Data	*/
	parent_label: string
	/**	Docs Page : Link - Commit Docs Page	*/
	docs_page: string
	/**	Hide on Sidebar : Check	*/
	hide_on_sidebar?: 0 | 1
}