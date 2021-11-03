import { Dispatch, FC, SetStateAction } from 'react'
interface Props {
	onClick?: Dispatch<SetStateAction<string | null>>
	width?: string
	height?: string
	fill?: string
	className?: string
}

const LocationIcon: FC<Props> = ({ onClick, width, height, fill, className }: Props) => {
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
			className={className ? `bi bi-geo-alt-fill ${className}` : 'bi bi-geo-alt-fill'}
			viewBox="0 0 16 16">
			<path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
		</svg>
	)
}

export default LocationIcon
