import { motion } from 'framer-motion'
import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import CloseIcon from '../../icons/CloseIcon'

interface Props {
	error?: any | null
	setError?: Dispatch<any>
	success?: string | null
	setSuccess?: Dispatch<SetStateAction<string>>
}

const ValidationToast: FC<Props> = ({ error, success, setError, setSuccess }: Props) => {
	useEffect(() => {
		if (success) {
			setInterval(() => {
				setSuccess(null)
			}, 5000)
		} else if (error) {
			setInterval(() => {
				setError(null)
			}, 5000)
		}
	}, [success, error])
	return (
		<>
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
		</>
	)
}

export default ValidationToast
