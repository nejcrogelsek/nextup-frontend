import { FC, useEffect } from 'react'
import ProfilePage from '../../components/profile/Profile'
import { Footer, Redirect } from '../../components/shared'
import { requireAuthentication } from '../../HOC/requireAuthentication/requireAuthentication'
import { GetServerSideProps } from 'next'

interface Props {
	token: string
}

const Profile: FC<Props> = ({ token }: Props) => {

	if (!token) {
		return <Redirect to='/signup' />
	}

	return (
		<>
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
