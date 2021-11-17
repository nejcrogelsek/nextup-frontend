import { FC } from 'react'
import LoginPage from '../../components/login/Login'
import { Footer } from '../../components/shared'
import userStore from '../../stores/user.store'
import ProfilePage from '../../components/profile/Profile'
import { observer } from 'mobx-react'

const Login: FC = () => {
	return (
		<>
			{userStore.user ? <ProfilePage /> : <LoginPage />}
			<Footer />
		</>
	)
}

export default observer(Login)
