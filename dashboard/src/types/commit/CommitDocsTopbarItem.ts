
export interface CommitDocsTopbarItem{
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
	/**	Label : Data	*/
	label?: string
	/**	URL : Data - Link to the page you want to open. Leave blank if you want to make it a group parent.	*/
	url?: string
	/**	Open URL in a New Tab : Check	*/
	open_in_new_tab?: 0 | 1
	/**	Hide On Navbar : Check	*/
	hide_on_navbar?: 0 | 1
	/**	Parent Label : Select - If you set this, this Item will come in a drop-down under the selected parent.	*/
	parent_label?: string
	/**	Icon : Data	*/
	icon?: string
}