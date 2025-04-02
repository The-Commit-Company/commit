
export interface CommitOrganization{
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
	/**	Organization Name : Data	*/
	organization_name: string
	/**	Github Org : Data	*/
	github_org: string
	/**	Image : Attach Image	*/
	image?: string
	/**	About : Data	*/
	about?: string
}