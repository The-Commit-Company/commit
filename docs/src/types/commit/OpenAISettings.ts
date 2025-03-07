
export interface OpenAISettings{
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
	/**	Organization : Data	*/
	organization: string
	/**	API Key : Password	*/
	api_key: string
	/**	Project : Data	*/
	project?: string
}