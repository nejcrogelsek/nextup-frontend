import { GetServerSideProps } from 'next'
import { FC } from 'react'
import ProfilePage from '../../components/profile/Profile'
import { Footer } from '../../components/shared'
import { requireAuthentication } from '../../HOC/requireAuthentication/requireAuthentication'

const Profile: FC = () => {
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
			props: {}
		}
	}
)
