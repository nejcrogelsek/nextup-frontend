export interface IEvent {
	id: number
	event_image: string
	title: string
	date_start: Date
	time_start: string
	location: string
	max_visitors: number
	description: string
	user_id: number
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