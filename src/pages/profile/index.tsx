import { FC, useEffect } from 'react'
import ProfilePage from '../../components/profile/Profile'
import { Footer, Redirect } from '../../components/shared'
import userStore from '../../stores/user.store'
import { requireAuthentication } from '../../HOC/requireAuthentication/requireAuthentication'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

interface Props {
	token: string
}

const Profile: FC<Props> = ({ token }: Props) => {
	const router = useRouter()

	if (!token) {
		return <Redirect to='/signup' />
	}

	useEffect(() => {
		if (!token) {
			router.push('/signup')
		}
	}, [token])

	return (
		<>
			<div className='fixed text-red-800 top-0 left-0 z-50'>
				{token}
			</div>
			<ProfilePage />
			<Footer />
		</>
	)
}

export default Profile

export const getServerSideProps: GetServerSideProps = requireAuthentication(
	async (ctx) => {
		return {
			props: { token: ctx.req.cookies.token || '' }
		}
	}
)
