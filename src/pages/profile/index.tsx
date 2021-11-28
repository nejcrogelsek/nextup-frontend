import { FC } from 'react'
import LoginPage from '../../components/login/Login'
import ProfilePage from '../../components/profile/Profile'
import { Footer } from '../../components/shared'
import userStore from '../../stores/user.store'

const Profile: FC = () => {
	return (
		<>
			{userStore.user ? <ProfilePage /> : <LoginPage />}
			<Footer />
		</>
	)
}

export default Profile
