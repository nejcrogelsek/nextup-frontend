import { configure, makeAutoObservable } from 'mobx'
import { IUser } from '../interfaces/user.interface'

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
