import { configure, makeAutoObservable } from 'mobx'
import { IUser } from '../interfaces/user.interface'

export const initialUser = {
	id: 1,
	email: 'nejc@gmail.com',
	first_name: 'Nejc',
	last_name: 'Rogelšek',
	profile_image: 'undefined',
	confirmed: true
}

configure({
	enforceActions: 'never',
})

class UserStore {
	user: IUser | null = null

	constructor() {
		makeAutoObservable(this)
	}

	register(user: IUser) {
		this.user = user
	}

	login(user: IUser) {
		this.user = user
	}

	update(user: IUser) {
		this.user = user
	}

	logout() {
		this.user = null
	}
}
const userStore = new UserStore()
export default userStore
