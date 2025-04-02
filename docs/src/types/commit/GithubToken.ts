import { OAuthScope } from '../Integrations/OAuthScope'

export interface GithubToken{
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
	/**	User : Link - User	*/
	user?: string
	/**	Token Type : Data	*/
	token_type?: string
	/**	Access Token : Data	*/
	access_token?: string
	/**	Expires In : Int	*/
	expires_in?: number
	/**	Refresh Token : Data	*/
	refresh_token?: string
	/**	Refresh Token Expire In : Int	*/
	refresh_token_expire_in?: number
	/**	Scopes : Table - OAuth Scope	*/
	scopes?: OAuthScope[]
}