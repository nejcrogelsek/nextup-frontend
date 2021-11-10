import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SignInData } from '../../../interfaces/auth.interface'
import Link from 'next/link'
import { observer } from 'mobx-react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { login } from '../../../pages/api/auth.actions'
import { motion } from 'framer-motion'
import CloseIcon from '../../icons/CloseIcon'
import userStore, { initialUser } from '../../../stores/user.store'

const LoginForm: FC = () => {
	const [success, setSuccess] = useState<string | null>(null)
	const validationSchema = Yup.object().shape({
		email: Yup.string().required('Email is required').email('Email is invalid'),
		password: Yup.string().required('Password is required'),
	})
	const [error, setError] = useState<any | null>(null)
	const [onErrorEmail, setOnErrorEmail] = useState<string | null>(null)
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
		const res = await login(dataset)
		if (res.request) {
			const data = JSON.parse(res.request.response)
			userStore.login(data.user)
			localStorage.setItem('user', data.access_token)
			reset()
		} else {
			setError(res)
			setOnErrorEmail(dataset.email)
		}
		// just for development
		userStore.login(initialUser)
	}

	return (
		<form className='form' onSubmit={onSubmit}>
			{error && (
				<motion.div initial={{ opacity: 0, transform: 'translateX(20%)' }} animate={{ opacity: 1, transform: 'translateX(0%)' }} className='fixed right-4 bottom-12 w-96 z-50'>
					<div className='form-validation-error'>
						{error.statusCode === 401 ? `User with email: ${onErrorEmail} does not exist.` : error.message}
						<CloseIcon onClick={setError} className='form-validation-close-icon' />
					</div>
				</motion.div>
			)}
			{success && (
				<motion.div initial={{ opacity: 0, transform: 'translateX(20%)' }} animate={{ opacity: 1, transform: 'translateX(0%)' }} className='fixed right-4 bottom-12 w-96 z-50'>
					<div className='form-validation-success'>
						{success}
						<CloseIcon onClick={setSuccess} className='form-validation-close-icon' />
					</div>
				</motion.div>
			)}
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
	)
}

export default observer(LoginForm)
