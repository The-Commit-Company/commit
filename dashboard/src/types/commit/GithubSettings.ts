
export interface GithubSettings{
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
	/**	Github App name : Data	*/
	github_app_name?: string
	/**	Client ID : Data	*/
	client_id: string
	/**	Client Secret : Password	*/
	client_secret?: string
	/**	Authorization URI : Small Text	*/
	authorization_uri: string
	/**	Token URI : Data	*/
	token_uri: string
	/**	Redirect URI : Data - This is the Callback URI registered in your Github App.	*/
	redirect_uri?: string
	/**	Scopes : JSON	*/
	scopes?: any
}