import axios from './axios'
import { AxiosError, AxiosResponse } from 'axios'
import { AddEventDto, IEvent, IEventAdd, UpdateEventDto } from '../../interfaces/event.interface'
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
	dataset: AddEventDto,
	image: string,
	token: string
): Promise<AxiosResponse<IEvent> | AxiosError> => {
	const data: UpdateEventDto = {
		_id: eventStore.updatedEvent.id,
		user_id: eventStore.updatedEvent.user_id,
		title: dataset.title,
		location: dataset.location,
		date_start: dataset.date_start,
		time_start: dataset.time_start,
		max_visitors: dataset.max_visitors,
		description: dataset.description,
		event_image: image
	}
	return axios.patch('/events', data, {
		headers: { Authorization: `Bearer ${token}` },
	}).catch((err) => {
		return err.response.data
	})
}

export const bookedEvents = async (
	event_id: string,
	token: string,
): Promise<AxiosResponse<boolean>> => {
	return axios.get(`/events/reservations/${event_id}`, {
		headers: { Authorization: `Bearer ${token}` },
	})
}
export const getEventByUrl = async (
	url: string,
): Promise<AxiosResponse<IEvent>> => {
	return axios.get(`/public/events/url/${url}`)
}
export const searchEvent = async (
	searchTerm: string,
	dateTerm: string,
): Promise<AxiosResponse<IEvent[] | AxiosError>> => {
	return axios.post('/public/events/search', { search_term: searchTerm, date_term: dateTerm })
		.catch((err) => {
			return err.response.data
		})
}

export const bookEventReservation = async (
	event_id: string,
	token: string
): Promise<AxiosResponse<IEvent> | AxiosError> => {
	return axios.post('/events/book', { event_id }, {
		headers: { Authorization: `Bearer ${token}` },
	}).catch((err) => {
		return err.response.data
	})
}

export const deleteReservation = async (
	event_id: string,
	token: string,
): Promise<AxiosResponse<boolean>> => {
	return axios.delete(`/events/reservations/${event_id}`, {
		headers: { Authorization: `Bearer ${token}` },
	}).catch((err) => {
		return err.response.data
	})
}

export const numOfVisitors = async (
	event_id: string,
	token: string,
): Promise<AxiosResponse<boolean>> => {
	return axios.get(`/events/${event_id}/visitors`, {
		headers: { Authorization: `Bearer ${token}` },
	})
}