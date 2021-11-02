import { FC } from 'react'
import SignupPage from '../components/signup/Signup'
import { Footer, Header } from '../components/shared'

const Signup: FC = () => {
	return (
		<>
			<Header />
			<SignupPage />
			<Footer />
		</>
	)
}

export default Signup
