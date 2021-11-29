import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

interface Props {
	to: string
}

const Redirect: FC<Props> = ({ to }: Props) => {
	const router = useRouter()

	useEffect(() => {
		router.push(to)
	}, [to])

	return null
}

export default Redirect
