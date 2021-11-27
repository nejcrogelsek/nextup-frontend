export interface IEvent {
	_id: string
	event_image: string
	title: string
	date_start: string
	time_start: string
	location: string
	max_visitors: number
	description: string
	user_id: string
	url: string
}

export interface IEventPage {
	id: string
	event_image: string
	title: string
	date_start: string
	time_start: string
	location: string
	max_visitors: number
	description: string
	url: string
}

export interface IEventAdd {
	title: string
	date_start: string
	time_start: string
	location: string
	max_visitors: number
	description: string
	event_image: string
	url?: string
}

export interface IEventUpdate {
	id: string
	title: string
	date_start: string
	time_start: string
	location: string
	max_visitors: number
	description: string
	event_image?: string
	user_id: string
}

export interface AddEventDto {
	title: string
	date_start: string
	time_start: string
	location: string
	max_visitors: number
	description: string
}

export interface UpdateEventDto {
	_id: string
	title: string
	date_start: string
	time_start: string
	location: string
	max_visitors: number
	description: string
	event_image: string
	user_id: string
}