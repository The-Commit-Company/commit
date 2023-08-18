
export interface DocPerm{
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
	/**	Role : Link - Role	*/
	role: string
	/**	If user is the owner : Check - Apply this rule if the User is the Owner	*/
	if_owner?: 0 | 1
	/**	Level : Int	*/
	permlevel?: number
	/**	Select : Check	*/
	select?: 0 | 1
	/**	Read : Check	*/
	read?: 0 | 1
	/**	Write : Check	*/
	write?: 0 | 1
	/**	Create : Check	*/
	create?: 0 | 1
	/**	Delete : Check	*/
	delete?: 0 | 1
	/**	Submit : Check	*/
	submit?: 0 | 1
	/**	Cancel : Check	*/
	cancel?: 0 | 1
	/**	Amend : Check	*/
	amend?: 0 | 1
	/**	Report : Check	*/
	report?: 0 | 1
	/**	Export : Check	*/
	export?: 0 | 1
	/**	Import : Check	*/
	import?: 0 | 1
	/**	Share : Check	*/
	share?: 0 | 1
	/**	Print : Check	*/
	print?: 0 | 1
	/**	Email : Check	*/
	email?: 0 | 1
}