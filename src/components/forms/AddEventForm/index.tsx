import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { observer } from 'mobx-react-lite'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { motion } from 'framer-motion'
import CloseIcon from '../../icons/CloseIcon'
import { AddEventDto, IEventUpdate } from '../../../interfaces/event.interface'
import eventStore from '../../../stores/event.store'
import { createEvent, generateUploadUrl, updateEvent, uploadImage } from '../../../pages/api/event.actions'

const AddEventForm: FC = () => {
	const validationSchema = Yup.object().shape({
		title: Yup.string().required('Title is required'),
		location: Yup.string().required('Location is required'),
		date_start: Yup.date().required('Date is required'),
		time_start: Yup.string().required('Time is required').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Example: 20:40'),
		max_visitors: Yup.number().required('Number of visitors is required').positive().integer().min(1),
		description: Yup.string().required('Description is required')
	})

	const [error, setError] = useState<any | null>(null)
	const [file, setFile] = useState<File | null>(null)
	const [success, setSuccess] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<AddEventDto>({
		resolver: yupResolver(validationSchema),
		mode: 'onChange',
	})

	const onSubmit = handleSubmit((dataset) => {
		handleAdd(dataset)
	})

	const handleAdd = async (dataset: AddEventDto) => {
		if (file !== null) {
			setIsLoading(true)
			const { data } = await generateUploadUrl()
			await uploadImage(data.url, file)
			const imageUrl = data.url.split('?')
			const token: string | null = localStorage.getItem('user')
			if (token) {
				const res = await createEvent(dataset, imageUrl[0], token)
				if (res.request) {
					const data = JSON.parse(res.request.response)
					eventStore.addEvent(data._id, data.user_id)
					setSuccess('Event successfully added.')
					reset()
				} else {
					setError(res)
				}
			} else {
				setError({ statusCode: 401, message: 'Unauthorized access.' })
			}
			setIsLoading(false)
		} else {
			setError({ statusCode: 400, message: 'You need to upload an event image.' })
		}
	}

	const handleUpdate = async (dataset: IEventUpdate) => {
		if (file !== null) {
			const { data } = await generateUploadUrl()
			await uploadImage(data.url, file)
			const imageUrl: string[] = data.url.split('?')
			dataset.event_image = imageUrl[0]
		}
		const token: string | null = localStorage.getItem('user')
		if (token) {
			const res = await updateEvent(dataset, token)
			if (res.request) {
				setFile(null)
				reset()
				eventStore.updateEvent(res.request, 'userStore.user.id')
				setSuccess('Event successfully updated.')
			}
		}
	}

	const fileSelected = async (e: any) => {
		const file = e.target.files[0]
		if (file && file.type.substr(0, 5) === 'image') {
			setFile(file)
		} else {
			setFile(null)
		}
	}

	return (
		<>
			{isLoading ? <div className='fixed left-0 right-0 top-0 bottom-0 w-full h-screen bg-primary bg-opacity-25 z-50'>
				<div className='flex w-full h-full justify-center items-center'>
					<div className="flex justify-center items-center">
						<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
					</div>
				</div>
			</div> : null}
			<form className='form max-w-full' onSubmit={onSubmit}>
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
							type='date'
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
							min={1}
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
				<div className='form-buttons'>
					<div className='form-element event-image'>
						<label className='form-button-revert mb-5' htmlFor='image'>Add image</label>
						<input
							type='file'
							name='image'
							accept='image/*'
							onChange={fileSelected}
						/>
					</div>
					<button className='form-button' type='submit'>
						Submit
					</button>
				</div>
			</form>
		</>
	)
}

export default observer(AddEventForm)
