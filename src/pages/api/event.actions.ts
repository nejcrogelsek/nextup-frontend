import axios from './axios'
import { AxiosError, AxiosResponse } from 'axios'
import { AddEventDto, IEvent, IEventAdd, IEventUpdate } from '../../interfaces/event.interface'
import eventStore from '../../stores/event.store'
import userStore from '../../stores/user.store'

export const generateUploadUrl = async (): Promise<AxiosResponse<Response>> => {
	return axios.get('/public/upload')
}

export const uploadImage = async (
	url: string,
	file: File
): Promise<AxiosResponse<void>> => {
	return axios.put(url, file, {
		headers: { 'Content-Type': 'multipart/form-data' },
	})
}

export const createEvent = async (
	dataset: AddEventDto,
	image_url: string,
	token: string
): Promise<AxiosResponse<IEvent> | AxiosError> => {
	const data: IEventAdd = {
		title: dataset.title,
		location: dataset.location,
		date_start: dataset.date_start,
		time_start: dataset.time_start,
		max_visitors: dataset.max_visitors,
		description: dataset.description,
		event_image: image_url
	}
	eventStore.newEvent = data
	return axios.post('/events', data, {
		headers: { Authorization: `Bearer ${token}` },
	}).catch((err) => {
		return err.response.data
	})
}

export const updateEvent = async (
	dataset: IEventUpdate,
	token: string
): Promise<AxiosResponse<IEvent> | AxiosError> => {
	return axios.patch('/events', { ...dataset }, {
		headers: { Authorization: `Bearer ${token}` },
	}).catch((err) => {
		return err.response.data
	})
}

export const bookEventReservation = async (
	event_id: string,
	token: string
): Promise<AxiosResponse<IEvent> | AxiosError> => {
	// id from user and viewedEvent is not saved when needed...probi console.log tam kjer ustavlam podatke
	console.log(userStore.user)
	console.log(JSON.parse(JSON.stringify(userStore.user)))
	console.log(eventStore.viewedEvent)
	console.log(JSON.parse(JSON.stringify(eventStore.viewedEvent)))
	return axios.post('/events/book', { event_id, user_id: '618d1c266c2cd45459c4ab5a' }, {
		headers: { Authorization: `Bearer ${token}` },
	}).catch((err) => {
		return err.response.data
	})
}