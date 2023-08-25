
export interface DocTypeState{
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
	/**	Title : Data	*/
	title: string
	/**	Color : Select	*/
	color: "Blue" | "Cyan" | "Gray" | "Green" | "Light Blue" | "Orange" | "Pink" | "Purple" | "Red" | "Yellow"
	/**	Custom : Check	*/
	custom?: 0 | 1
}