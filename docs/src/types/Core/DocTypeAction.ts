
export interface DocTypeAction{
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
	/**	Label : Data	*/
	label: string
	/**	Action Type : Select	*/
	action_type: "Server Action" | "Route"
	/**	Action / Route : Small Text	*/
	action: string
	/**	Group : Data	*/
	group?: string
	/**	Hidden : Check	*/
	hidden?: 0 | 1
	/**	Custom : Check	*/
	custom?: 0 | 1
}