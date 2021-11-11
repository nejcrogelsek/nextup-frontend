import axios from '../pages/api/axios'
import { configure, makeAutoObservable } from 'mobx'
import { AddEventDto, IEvent, IEventAdd, IEventUpdate } from '../interfaces/event.interface'

// just for development
export const initialEvent = {
	image: 'undefined',
	title: 'Party weed us',
	date_start: new Date(Date.now()),
	time_start: '16:20',
	location: 'Lublana kapatej',
	max_visitors: 420,
	description: 'lorem ipsum hehe',
}

configure({
	enforceActions: 'never',
})

class EventStore {
	userEvents: IEvent[] = []
	upcomingEvents: IEvent[] | null = null
	recentEvents: IEvent[] | null = null
	newEvent: IEventAdd | null = null

	constructor() {
		makeAutoObservable(this)
	}

	async getEvents() {
		await axios
			.get('/events')
			.then((res) => {
				this.recentEvents = res.data
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

	async getUpcomingEvents() {
		await axios
			.get('/events/upcoming')
			.then((res) => {
				this.upcomingEvents = res.data
			})
	}

	addEvent() {
		this.userEvents?.push({ id: 1, user_id: 1, ...this.newEvent })
	}

	updateEvent(event: IEvent, id: number) {
		const filterEvent = this.userEvents?.filter(ev => ev.id !== id)
		filterEvent.push({ id: 1, user_id: 1, ...event })
		this.userEvents = filterEvent
	}

}
const eventStore = new EventStore()
export default eventStore
