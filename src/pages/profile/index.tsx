import { FC } from 'react'
import ProfilePage from '../../components/profile/Profile'
import { Footer, Header } from '../../components/shared'

const Profile: FC = () => {
	return (
		<>
			<Header />
			<ProfilePage />
			<Footer />
		</>
	)
}

export default Profile
