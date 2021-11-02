import { FC } from 'react'
import LoginPage from '../components/login/Login'
import { Footer, Header } from '../components/shared'

const Login: FC = () => {
	return (
		<>
			<Header />
			<LoginPage />
			<Footer />
		</>
	)
}

export default Login
