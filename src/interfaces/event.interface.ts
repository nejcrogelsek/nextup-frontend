export interface IEvent {
	_id: string
	event_image: string
	title: string
	date_start: Date
	time_start: string
	location: string
	max_visitors: number
	description: string
	user_id: string
}

export interface IEventPage {
	id: string
	event_image: string
	title: string
	date_start: Date
	time_start: string
	location: string
	max_visitors: number
	description: string
}

export interface IEventAdd {
	title: string
	date_start: Date
	time_start: string
	location: string
	max_visitors: number
	description: string
	event_image: string
}

export interface IEventUpdate {
	title: string
	date_start: Date
	time_start: string
	location: string
	max_visitors: number
	description: string
	event_image?: string
}

export interface AddEventDto {
	title: string
	date_start: Date
	time_start: string
	location: string
	max_visitors: number
	description: string
}