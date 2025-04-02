import { LinkedCommitDocsPage } from './LinkedCommitDocsPage'

export interface CommitDocsPage{
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
	/**	Title : Data	*/
	title: string
	/**	Commit Docs : Link - Commit Docs	*/
	commit_docs: string
	/**	Route : Data	*/
	route?: string
	/**	Icon : Data - "Supports only icons from the lucid-react library. Enter the icon name in the format 'libraryPrefix/IconName' (e.g., 'Fa/FaFileExcel') to display it beside the title in the sidebar."
	*/
	icon?: string
	/**	Published : Check	*/
	published?: 0 | 1
	/**	Allow Guest : Check	*/
	allow_guest?: 0 | 1
	/**	Badge : Data - This is badge field, eg: GET , POST etc.	*/
	badge?: string
	/**	Badge Color : Data - Add Tailwind colours like red, green, blue, yellow, purple, pink, indigo, cyan, teal, lime, orange, gray etc.	*/
	badge_color?: string
	/**	Is Group Page : Check - When enabled, this page can hold and display nested sub-pages, creating a structured hierarchy in the sidebar.	*/
	is_group_page?: 0 | 1
	/**	Content : Markdown Editor	*/
	content?: string
	/**	Linked Pages : Table - Linked Commit Docs Page	*/
	linked_pages?: LinkedCommitDocsPage[]
}