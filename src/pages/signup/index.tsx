import { FC } from 'react'
import SignupPage from '../../components/signup/Signup'
import { Footer } from '../../components/shared'
import { observer } from 'mobx-react'
import userStore from '../../stores/user.store'
import router from 'next/router'

const Signup: FC = () => {

	if (userStore.user) {
		router.push('/profile')
	}

	return (
		<>
			<SignupPage />
			<Footer />
		</>
	)
}

export default observer(Signup)
