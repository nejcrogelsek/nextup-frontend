import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { observer } from 'mobx-react-lite'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { login } from '../../../api/auth.actions'
import { motion } from 'framer-motion'
import CloseIcon from '../../icons/CloseIcon'
import { IEvent } from '../../../interfaces/event.interface'

const AddEventForm: FC = () => {
	const [success, setSuccess] = useState<string | null>(null)
	const validationSchema = Yup.object().shape({
		title: Yup.string().required('Title is required'),
		location: Yup.string().required('Location is required'),
		date_start: Yup.string().required('Date is required'),
		time_start: Yup.string().required('Time is required'),
		max_visitors: Yup.string().required('Number of visitors is required'),
		description: Yup.string().notRequired(),
		image: Yup.string().notRequired()
	})
	const [error, setError] = useState<any | null>(null)
	const [onErrorEmail, setOnErrorEmail] = useState<string | null>(null)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IEvent>({
		resolver: yupResolver(validationSchema),
		mode: 'onChange',
	})

	const onSubmit = handleSubmit((dataset) => {
		signin(dataset)
	})

	const signin = async (dataset: IEvent) => {
		console.log('Event ADDED')
		console.log(dataset)
	}

	return (
		<form className='form' onSubmit={onSubmit}>
			{error && (
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
					<div className='form-validation-error'>
						{error.statusCode === 401 ? `User with email: ${onErrorEmail} does not exist.` : error.message}
						<CloseIcon onClick={setError} className='form-validation-close-icon' />
					</div>
				</motion.div>
			)}
			{success && (
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
					<div className='form-validation-success'>
						{success}
						<CloseIcon onClick={setSuccess} className='form-validation-close-icon' />
					</div>
				</motion.div>
			)}
			<div className='form-element'>
				<label className='form-label' htmlFor='title'>Event name</label>
				<input
					{...register('title')}
					type='text'
					name='title'
					className={errors.title ? 'form-control form-control-is-invalid' : 'form-control'}
				/>
				{errors.title && <div className='form-error-text'>{errors.title.message}</div>}
			</div>
			<div className='form-element'>
				<label className='form-label' htmlFor='location'>Location</label>
				<input
					{...register('location')}
					type='text'
					name='location'
					className={errors.location ? 'form-control form-control-is-invalid' : 'form-control'}
				/>
				{errors.location && <div className='form-error-text'>{errors.location.message}</div>}
			</div>
			<div className='flex justify-between items-center'>
				<div className='form-element'>
					<label className='form-label' htmlFor='date_start'>Date</label>
					<input
						{...register('date_start')}
						type='text'
						name='date_start'
						className={errors.date_start ? 'form-control form-control-is-invalid' : 'form-control'}
					/>
					{errors.date_start && <div className='form-error-text min-h-8'>{errors.date_start.message}</div>}
				</div>
				<div className='form-element mx-4'>
					<label className='form-label' htmlFor='time_start'>Hour</label>
					<input
						{...register('time_start')}
						type='text'
						name='time_start'
						className={errors.time_start ? 'form-control form-control-is-invalid' : 'form-control'}
					/>
					{errors.time_start && <div className='form-error-text min-h-8'>{errors.time_start.message}</div>}
				</div>
				<div className='form-element'>
					<label className='form-label' htmlFor='max_visitors'>Max. users</label>
					<input
						{...register('max_visitors')}
						type='number'
						name='max_visitors'
						className={errors.max_visitors ? 'form-control form-control-is-invalid' : 'form-control'}
					/>
					{errors.max_visitors && <div className='form-error-text min-h-8'>{errors.max_visitors.message}</div>}
				</div>
			</div>
			<div className='form-element'>
				<label className='form-label' htmlFor='description'>Description</label>
				<textarea
					{...register('description')}
					name='description'
					className={errors.description ? 'form-control h-28 lg:h-20 form-control-is-invalid resize-none' : 'form-control resize-none h-28 lg:h-20'}
				></textarea>
				{errors.description && <div className='form-error-text min-h-8'>{errors.description.message}</div>}
			</div>
			<div className='form-element hidden'>
				<label className='form-label' htmlFor='image'>Image</label>
				<input
					{...register('image')}
					type='text'
					name='image'
					value='undefined'
					onChange={() => null}
				/>
			</div>
			<div className='form-buttons'>
				<button className='form-button-revert mb-5' type='button'>
					Add image
				</button>
				<button className='form-button' type='submit'>
					Sign in
				</button>
			</div>
		</form>
	)
}

export default observer(AddEventForm)
