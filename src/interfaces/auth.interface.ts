export type SignUpData = {
	email: string
	first_name: string
	last_name: string
	password: string
	confirm_password: string
}

export type SignInData = {
	email: string
	password: string
}

export type UserData = {
	id: number
	email: string
	first_name: string
	last_name: string
	profile_image: string
}

export interface UserProps {
	user: UserData
}

export interface AuthReturnData {
	user: {
		id: number
		email: string
		first_name: string
		last_name: string
		profile_image: string
		confirmed: boolean
	}
	access_token: string
}
export interface IAccessToken {
	access_token: string
}
