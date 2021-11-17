import axios from '../pages/api/axios'
import { configure, makeAutoObservable } from 'mobx'
import { IEvent, IEventAdd, IEventPage } from '../interfaces/event.interface'

configure({
	enforceActions: 'never',
})

class EventStore {
	userEvents: IEvent[] = []
	viewedEvent: IEventPage | null = null
	upcomingEvents: IEvent[] = []
	recentEvents: IEvent[] = []
	newEvent: IEventAdd | null = null

	constructor() {
		makeAutoObservable(this)
	}

	async getEvents() {
		await axios
			.get('/public/events')
			.then((res) => {
				this.recentEvents = res.data
			})
	}

	async getUpcomingEvents() {
		await axios
			.get('/public/events/upcoming')
			.then((res) => {
				this.upcomingEvents = res.data
			})
	}

	async getUserEvents(token: string) {
		await axios
			.get(`/events/added-events`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				this.userEvents = res.data
			})
	}

	async getRecent(token: string) {
		await axios
			.get('/events/recent', {
				params: { _limit: 9 },
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				this.recentEvents = res.data
			})
	}

	addEvent(event_id: string, user_id: string) {
		this.userEvents?.push({ _id: event_id, user_id: user_id, ...this.newEvent })
	}

	updateEvent(event: IEvent, id: string) {
		const filterEvent = this.userEvents?.filter(ev => ev._id !== id)
		filterEvent.push({ _id: '1', user_id: 1, ...event })
		this.userEvents = filterEvent
	}

}
const eventStore = new EventStore()
export default eventStore
