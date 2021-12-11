import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import LoginForm from '../forms/LoginForm'
import { ValidationToast } from '../shared'

const LoginPage: FC = () => {
	const router = useRouter()
	const { message } = router.query
	const [success, setSuccess] = useState<string | null>(null)

	useEffect(() => {
		if (message) {
			setSuccess(message.toString())
		}
	}, [message])
	return (
		<>
			<ValidationToast success={success} setSuccess={setSuccess} />
			<div className='login-container flex justify-center items-center pt-24 bg-alternative app-padding'>
				<div className='max-w-lg w-full'>
					<h1 className="text-4xl font-normal mb-2 text-primary">Welcome back!</h1>
					<p className='text-xl'>We are glad that you are back.</p>
					<LoginForm />
				</div>
			</div>
		</>
	)
}

export default LoginPage
