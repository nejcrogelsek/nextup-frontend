import { FC } from 'react'
import SignupForm from '../forms/SignupForm'

const SignupPage: FC = () => {
	return (
		<div className='main-container flex justify-center items-center pt-24 bg-alternative'>
			<div className='max-w-lg w-full'>
				<h1 className="text-4xl font-normal mb-2 text-primary">Hello!</h1>
				<p className='text-xl'>Get started with your free account today.</p>
				<SignupForm />
			</div>
		</div>
	)
}

export default SignupPage
