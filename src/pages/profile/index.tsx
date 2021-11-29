import { GetServerSideProps } from 'next'
import { FC } from 'react'
import ProfilePage from '../../components/profile/Profile'
import { Footer, Redirect } from '../../components/shared'
import { requireAuthentication } from '../../HOC/requireAuthentication/requireAuthentication'
import userStore from '../../stores/user.store'

const Profile: FC = () => {

	if (!userStore.user) {
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
