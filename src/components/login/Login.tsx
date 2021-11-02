import { FC } from 'react'
import LoginForm from '../forms/LoginForm'

const LoginPage: FC = () => {
	return (
		<div className='main-container flex justify-center items-center pt-24 bg-alternative'>
			<div className='max-w-lg w-full'>
				<h1 className="text-4xl font-normal mb-2 text-primary">Welcome back!</h1>
				<p className='text-xl'>We are glad that you are back.</p>
				<LoginForm />
			</div>
		</div>
	)
}

export default LoginPage
