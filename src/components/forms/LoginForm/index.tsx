import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SignInData } from '../../../interfaces/auth.interface'
import Link from 'next/link'
import { observer } from 'mobx-react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { login } from '../../../pages/api/auth.actions'
import userStore from '../../../stores/user.store'
import router from 'next/router'
import { ValidationToast } from '../../shared'

const LoginForm: FC = () => {
	const validationSchema = Yup.object().shape({
		email: Yup.string().required('Email is required').email('Email is invalid'),
		password: Yup.string().required('Password is required'),
	})
	const [error, setError] = useState<any | null>(null)
	const [success, setSuccess] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SignInData>({
		resolver: yupResolver(validationSchema),
		mode: 'onChange',
	})

	const onSubmit = handleSubmit((dataset) => {
		signin(dataset)
	})

	const signin = async (dataset: SignInData) => {
		setIsLoading(true)
		const res = await login(dataset)
		if (res.request) {
			const data = JSON.parse(res.request.response)
			userStore.login(data.user)
			localStorage.setItem('user', data.token)
			reset()
		} else {
			setError(res)
		}
		setIsLoading(false)
	}

	useEffect(() => {
		const name = router.query.message
		if (name) {
			setSuccess('Your email successfully validated. Now you can login.')
		}
	}, [])

	return (
		<>
			{isLoading ? <div className='fixed left-0 right-0 top-0 bottom-0 w-full h-screen bg-primary bg-opacity-25 z-50'>
				<div className='flex w-full h-full justify-center items-center'>
					<div className="flex justify-center items-center">
						<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
					</div>
				</div>
			</div> : null}
			<form className='form' onSubmit={onSubmit}>
				<ValidationToast error={error} setError={setError} success={success} setSuccess={setSuccess} />
				<div className='form-element'>
					<label className='form-label' htmlFor='email'>Email</label>
					<input
						{...register('email')}
						id='email'
						type='text'
						name='email'
						className={errors.email ? 'form-control form-control-is-invalid' : 'form-control'}
					/>
					{errors.email && <div className='form-error-text'>{errors.email.message}</div>}
				</div>
				<div className='form-element'>
					<label className='form-label' htmlFor='password'>Password</label>
					<input
						{...register('password')}
						type='password'
						name='password'
						className={errors.password ? 'form-control form-control-is-invalid' : 'form-control'}
					/>
					{errors.password && (
						<div className='form-error-text'>{errors.password.message}</div>
					)}
				</div>
				<div className='form-buttons'>
					<button className='form-button' type='submit'>
						Sign in
					</button>
				</div>
				<div className='form-goto'>
					<p className='form-goto-p'>Do you want to create an account?</p>
					<Link href='/signup'><a className='form-goto-a'>Sign up</a></Link>
				</div>
			</form>
		</>
	)
}

export default observer(LoginForm)
