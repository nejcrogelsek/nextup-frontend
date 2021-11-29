import { FC } from 'react'
import LoginPage from '../../components/login/Login'
import { Footer } from '../../components/shared'
import { observer } from 'mobx-react'
import userStore from '../../stores/user.store'
import router from 'next/router'

const Login: FC = () => {

	if (userStore.user) {
		router.push('/profile')
	}
	return (
		<>
			<LoginPage />
			<Footer />
		</>
	)
}

export default observer(Login)
