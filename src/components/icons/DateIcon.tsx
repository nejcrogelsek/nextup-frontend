import { Dispatch, FC, SetStateAction } from 'react'
interface Props {
	onClick?: Dispatch<SetStateAction<string | null>>
	width?: string
	height?: string
	fill?: string
	className?: string
}

const DateIcon: FC<Props> = ({ onClick, width, height, fill, className }: Props) => {
	const handleClick = () => {
		if (onClick) {
			onClick(null)
		}
	}
	return (
		<svg
			onClick={handleClick}
			xmlns="http://www.w3.org/2000/svg"
			width={width ? width : '16'}
			height={height ? height : '16'}
			fill={fill ? fill : 'currentColor'}
			className={className ? `bi bi-calendar4-week ${className}` : 'bi bi-calendar4-week'}
			viewBox="0 0 16 16">
			<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z" />
			<path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
		</svg>
	)
}

export default DateIcon
