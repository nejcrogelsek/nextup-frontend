export interface IEvent {
	id: number
	image: string
	title: string
	date_start: Date
	time_start: string
	location: string
	max_visitors: number
	description: string
	user_id: number
}

export interface AddEventDto {
	title: string
	date_start: Date
	time_start: string
	location: string
	max_visitors: number
	description: string
}