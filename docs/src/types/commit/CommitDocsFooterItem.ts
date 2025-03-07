
export interface CommitDocsFooterItem{
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
	/**	Label : Data	*/
	label: string
	/**	URL : Data	*/
	url: string
	/**	Hide on Footer : Check	*/
	hide_on_footer?: 0 | 1
}