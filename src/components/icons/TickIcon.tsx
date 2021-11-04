import { Dispatch, FC, SetStateAction } from 'react'
interface Props {
	onClick?: Dispatch<SetStateAction<string | null>>
	width?: string
	height?: string
	fill?: string
	className?: string
}

const TickIcon: FC<Props> = ({ onClick, width, height, fill, className }: Props) => {
	const handleClick = () => {
		if (onClick) {
			onClick(null)
		}
	}
	return (
		<svg
			onClick={handleClick}
			width={width ? width : '16'}
			height={height ? height : '16'}
			fill={fill ? fill : 'currentColor'}
			className={className ? `bi bi-check-lg ${className}` : 'bi bi-check-lg" '}
			xmlns="http://www.w3.org/2000/svg">
			<path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
		</svg>

	)
}

export default TickIcon
