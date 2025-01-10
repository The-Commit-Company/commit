
export interface CommitProject{
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
	/**	Organization : Link - Commit Organization	*/
	org: string
	/**	Display Name : Data	*/
	display_name: string
	/**	Github Repo : Data	*/
	repo_name: string
	/**	App Name : Data	*/
	app_name?: string
	/**	Image : Attach Image	*/
	image?: string
	/**	Banner Image : Attach Image	*/
	banner_image?: string
	/**	Path to folder : Data	*/
	path_to_folder?: string
	/**	Description : Data	*/
	description?: string
}