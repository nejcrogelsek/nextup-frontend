import axios from './axios'
import { AxiosError, AxiosResponse } from 'axios'
import { AddEventDto, IEvent, IEventAdd, IEventUpdate } from '../interfaces/event.interface'
import eventStore from '../stores/event.store'

export const generateUploadUrl = async (): Promise<AxiosResponse<Response>> => {
	return axios.get('events/upload')
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
	eventStore.addEvent()
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
