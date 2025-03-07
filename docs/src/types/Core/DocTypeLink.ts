
export interface DocTypeLink{
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
	/**	Link DocType : Link - DocType	*/
	link_doctype: string
	/**	Link Fieldname : Data	*/
	link_fieldname: string
	/**	Parent DocType : Link - DocType	*/
	parent_doctype?: string
	/**	Table Fieldname : Data	*/
	table_fieldname?: string
	/**	Group : Data	*/
	group?: string
	/**	Hidden : Check	*/
	hidden?: 0 | 1
	/**	Is Child Table : Check	*/
	is_child_table?: 0 | 1
	/**	Custom : Check	*/
	custom?: 0 | 1
}