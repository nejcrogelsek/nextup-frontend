import { FC, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { SignUpData } from '../../../interfaces/auth.interface'
import Link from 'next/link'
import { observer } from 'mobx-react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { generateUploadUrl, uploadImage, createUser } from '../../../pages/api/auth.actions'
import { motion } from 'framer-motion'
import CloseIcon from '../../icons/CloseIcon'
import { Avatar } from '@material-ui/core'
import userStore, { initialUser } from '../../../stores/user.store'

const SignupForm: FC = () => {
	const validationSchema = Yup.object().shape({
		email: Yup.string().required('Email is required').email('Email is invalid'),
		first_name: Yup.string().required('First name is required'),
		last_name: Yup.string().required('Last name is required'),
		password: Yup.string()
			.required('Password is required')
			.matches(
				/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
				'Password must have at least 1 upper & lower case letter, 1 number or special character and it must be long more than 5 characters.'
			)
			.min(6, 'Password must be at least 6 characters'),
		confirm_password: Yup.string()
			.required('Passwords must match')
			.oneOf([Yup.ref('password'), null], 'Passwords must match'),
	})

	const [error, setError] = useState<any | null>(null)
	const [success, setSuccess] = useState<string | null>(null)
	const [file, setFile] = useState<File | null>(null)
	const [preview, setPreview] = useState<string | null>(null)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SignUpData>({
		resolver: yupResolver(validationSchema),
		mode: 'onChange',
	})

	const onSubmit = handleSubmit((dataset) => {
		signup(dataset)
	})

	const signup = async (dataset: SignUpData) => {
		if (file !== null) {
			const { data } = await generateUploadUrl()
			uploadImage(data.url, file)
			const imageUrl = data.url.split('?')

			const res = await createUser(dataset, imageUrl[0])
			if (res.request) {
				setSuccess('Check your inbox and verify your email.')
				setPreview(null)
				setFile(null)
				reset()
			} else {
				setError(res)
			}
		} else {
			setError({ statusCode: 400, message: 'You need to upload a profile image.' })
		}
		// just for development
		userStore.login(initialUser)
	}

	const fileSelected = async (e: any) => {
		const file = e.target.files[0]
		if (file && file.type.substr(0, 5) === 'image') {
			setFile(file)
		} else {
			setFile(null)
		}
	}

	useEffect(() => {
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setPreview(reader.result as string)
			}
			reader.readAsDataURL(file)
		} else {
			setPreview(null)
		}
	}, [file])

	return (
		<form className='form' onSubmit={onSubmit}>
			{error && (
				<motion.div initial={{ opacity: 0, transform: 'translateX(20%)' }} animate={{ opacity: 1, transform: 'translateX(0%)' }} className='fixed right-4 bottom-12 w-96 z-50'>
					<div className='form-validation-error'>
						{error.message}
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
			<div className='form-element-image'>
				<label className='form-label-image' htmlFor='email'>
					<Avatar src={preview as string} />
				</label>
				<input
					type='file'
					accept='image/*'
					name='file'
					onChange={fileSelected}
					className='form-control-image'
				/>
			</div>
			<div className="flex">
				<div className='form-element mr-2'>
					<label className='form-label' htmlFor='first_name'>First Name</label>
					<input
						{...register('first_name')}
						id='first_name'
						type='text'
						name='first_name'
						className={errors.first_name ? 'form-control form-control-is-invalid' : 'form-control'}
					/>
					{errors.first_name && <div className='form-error-text'>{errors.first_name.message}</div>}
				</div>
				<div className='form-element ml-2'>
					<label className='form-label' htmlFor='email'>Last Name</label>
					<input
						{...register('last_name')}
						id='last_name'
						type='text'
						name='last_name'
						className={errors.last_name ? 'form-control form-control-is-invalid' : 'form-control'}
					/>
					{errors.last_name && <div className='form-error-text'>{errors.last_name.message}</div>}
				</div>
			</div>
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
			<div className='form-element'>
				<label className='form-label' htmlFor='password'>Confirm Password</label>
				<input
					{...register('confirm_password')}
					type='password'
					name='confirm_password'
					className={errors.confirm_password ? 'form-control form-control-is-invalid' : 'form-control'}
				/>
				{errors.confirm_password && (
					<div className='form-error-text'>{errors.confirm_password.message}</div>
				)}
			</div>
			<div className='form-buttons'>
				<button className='form-button' type='submit'>
					Sign up
				</button>
			</div>
			<div className='form-goto'>
				<p className='form-goto-p'>Already have an account?</p>
				<Link href='/login'><a className='form-goto-a'>Sign in</a></Link>
			</div>
		</form>
	)
}

export default observer(SignupForm)
