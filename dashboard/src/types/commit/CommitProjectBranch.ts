
export interface CommitProjectBranch{
	creation: string
	name: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	Commit Project : Link - Commit Project	*/
	project: string
	/**	Branch Name : Data	*/
	branch_name: string
	/**	Path to folder : Data	*/
	path_to_folder?: string
	/**	Commit Hash : Data	*/
	commit_hash?: string
	/**	App Name : Data	*/
	app_name?: string
	/**	Last fetched : Datetime	*/
	last_fetched?: string
	/**	Modules : Long Text	*/
	modules?: string
	/**	Module - Doctypes Map : JSON	*/
	module_doctypes_map?: any
	/**	Doctype - Module Map : JSON	*/
	doctype_module_map?: any
	/**	Whitelisted APIs : JSON	*/
	whitelisted_apis?: any
	frequency?: "Daily" | "Weekly" | "Monthly" 
}