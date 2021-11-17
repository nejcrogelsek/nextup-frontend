import { FC } from 'react'
import SignupPage from '../../components/signup/Signup'
import { Footer, Header } from '../../components/shared'
import userStore from '../../stores/user.store'
import ProfilePage from '../../components/profile/Profile'
import { observer } from 'mobx-react'

const Signup: FC = () => {
	return (
		<>
			{userStore.user ? <ProfilePage /> : <SignupPage />}
			<Footer />
		</>
	)
}

export default observer(Signup)
