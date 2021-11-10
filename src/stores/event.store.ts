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
	userEvents: IEvent[] | null = [
		{ id: 1, user_id: 1, description: 'Iaculis volutpat eget massa s ed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', event_image: '/event5.png', title: 'Party with Eminem', date_start: new Date(Date.now()), time_start: '20:00', location: '6391 Elgin St. Celina, Delaware', max_visitors: 100 },
		{ id: 2, user_id: 1, description: 'Iaculis volutpat eget massa sed vestibulum. Urna maecenas hendrerit pharetra, amet ut amet. Facilisi ullamcorper elementum, pellentesque et mi urna sit arcu. In at mauris sodales quis. Sem imperdiet a amet sit. Platea nunc viverra tincidunt dui amet. Lacus, condimentum suspendisse nunc pharetra, ornare maecenas tortor ultricies. Tincidunt amet dictum sagittis.', event_image: '/event2.png', title: 'Ultra Split privat party', date_start: new Date(Date.now()), time_start: '22:00', location: '4140 Parker Rd. Allentown, 31134', max_visitors: 300 }
	]
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

	async getUserEvents(user_id: number, token: string) {
		await axios
			.get(`/events/${user_id}`, {
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
