
export interface File{
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
	/**	File Name : Data	*/
	file_name?: string
	/**	File Description : Small Text	*/
	file_description?: string
	/**	Is Private : Check	*/
	is_private?: 0 | 1
	/**	File Type : Data	*/
	file_type?: string
	/**	Is Home Folder : Check	*/
	is_home_folder?: 0 | 1
	/**	Is Attachments Folder : Check	*/
	is_attachments_folder?: 0 | 1
	/**	File Size : Int	*/
	file_size?: number
	/**	File URL : Code	*/
	file_url?: string
	/**	Thumbnail URL : Small Text	*/
	thumbnail_url?: string
	/**	Folder : Link - File	*/
	folder?: string
	/**	Is Folder : Check	*/
	is_folder?: 0 | 1
	/**	Attached To DocType : Link - DocType	*/
	attached_to_doctype?: string
	/**	Attached To Name : Data	*/
	attached_to_name?: string
	/**	Attached To Field : Data	*/
	attached_to_field?: string
	/**	old_parent : Data	*/
	old_parent?: string
	/**	Content Hash : Data	*/
	content_hash?: string
	/**	Uploaded To Dropbox : Check	*/
	uploaded_to_dropbox?: 0 | 1
	/**	Uploaded To Google Drive : Check	*/
	uploaded_to_google_drive?: 0 | 1
}