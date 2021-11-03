import { Dispatch, FC, SetStateAction } from 'react'
interface Props {
	onClick?: Dispatch<SetStateAction<string | null>>
	width?: string
	height?: string
	fill?: string
	className?: string
}

const PersonFillIcon: FC<Props> = ({ onClick, width, height, fill, className }: Props) => {
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
			className={className ? `bi bi-person-fill ${className}` : 'bi bi-person-fill'}
			viewBox="0 0 16 16">
			<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
		</svg>
	)
}

export default PersonFillIcon
