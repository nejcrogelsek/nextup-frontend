import { FC } from 'react'
import LoginPage from '../../components/login/Login'
import { Footer, Redirect } from '../../components/shared'
import { observer } from 'mobx-react'
import userStore from '../../stores/user.store'
import router from 'next/router'

const Login: FC = () => {

	if (userStore.user) {
		return <Redirect to='/profile' />
	}
	return (
		<>
			<LoginPage />
			<Footer />
		</>
	)
}

export default observer(Login)
