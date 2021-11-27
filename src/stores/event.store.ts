import axios from '../pages/api/axios'
import { configure, makeAutoObservable } from 'mobx'
import { IEvent, IEventAdd, IEventPage, IEventUpdate } from '../interfaces/event.interface'

configure({
	enforceActions: 'never',
})

class EventStore {
	userEvents: IEvent[] = []
	viewedEvent: IEventPage | null = null
	upcomingEvents: IEvent[] = []
	searchResults: IEvent[] | null = null
	recentEvents: IEvent[] = []
	newEvent: IEventAdd | null = null
	isUpdating: boolean = false
	updatedEvent: IEventUpdate | null = null

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
		this.userEvents?.push({ _id: event_id, user_id: user_id, date_start: this.newEvent.date_start, description: this.newEvent.description, event_image: this.newEvent.description, location: this.newEvent.location, max_visitors: this.newEvent.max_visitors, time_start: this.newEvent.time_start, title: this.newEvent.title, url: this.newEvent.url })
	}

	updateEvent(event: IEvent, event_id: string, user_id: string) {
		const filterEvent = this.userEvents?.filter(ev => ev._id !== event_id)
		filterEvent.push({ _id: event_id, user_id: user_id, ...event })
		this.userEvents = filterEvent
	}

}
const eventStore = new EventStore()
export default eventStore
