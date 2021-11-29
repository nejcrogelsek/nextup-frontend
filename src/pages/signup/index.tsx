import { FC } from 'react'
import SignupPage from '../../components/signup/Signup'
import { Footer, Redirect } from '../../components/shared'
import { observer } from 'mobx-react'
import userStore from '../../stores/user.store'

const Signup: FC = () => {

	if (userStore.user) {
		return <Redirect to='/profile' />
	}

	return (
		<>
			<SignupPage />
			<Footer />
		</>
	)
}

export default observer(Signup)
