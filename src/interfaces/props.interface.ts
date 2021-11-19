export interface EventBoxProps {
	className?: string
	id: string
	title: string
	event_image: string
	date_start: Date
	time_start: string
	location: string
	max_visitors: number
	description: string,
	type?: string
	user_id: string
}