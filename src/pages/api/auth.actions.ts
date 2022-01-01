import axios from './axios'
import {
	IAuthReturnData,
	IAccessToken,
	SignInData,
	SignUpData,
} from '../../interfaces/auth.interface'
import { AxiosError, AxiosResponse } from 'axios'
import { IUser } from '../../interfaces/user.interface'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const generateUploadUrl = async (): Promise<AxiosResponse<Response>> => {
	return axios.get('/public/upload')
}

export const uploadImage = async (
	url: string,
	file: File
): Promise<AxiosResponse<void>> => {
	return axios.put(url, file, {
		headers: { 'Content-Type': 'multipart/form-data' },
	})
}

export const login = async (
	dataset: SignInData
): Promise<AxiosResponse<SignInData> | AxiosError> => {
	return axios.post('/auth/login', dataset).catch((err) => {
		return err.response.data
	})
}

export const createUser = async (
	dataset: SignUpData,
	image_url: string
): Promise<AxiosResponse<IAuthReturnData> | AxiosError> => {
	const data = {
		profile_image: image_url,
		email: dataset.email,
		first_name: dataset.first_name,
		last_name: dataset.last_name,
		password: dataset.password,
		confirm_password: dataset.confirm_password,
	}
	return axios.post('/auth/register', data).catch((err) => {
		return err.response.data
	})
}

export const loginWithFirebase = async (
	dataset: SignInData
): Promise<AxiosResponse<SignInData> | AxiosError> => {
	const email: string = dataset.email
	const password: string = dataset.password
}

export const createUserWithFirebase = async (
	dataset: SignUpData,
	image_url: string
): Promise<AxiosResponse<IAuthReturnData> | AxiosError> => {
	const data = {
		profile_image: image_url,
		email: dataset.email,
		first_name: dataset.first_name,
		last_name: dataset.last_name,
		password: dataset.password,
		confirm_password: dataset.confirm_password,
	}
	return axios.post('/auth/register', data).catch((err) => {
		return err.response.data
	})
}

export const refreshTokenFC = async (
	email: string,
	id: string,
	token: string
): Promise<AxiosResponse<IAccessToken>> => {
	return axios.post(
		'/private/refresh-token',
		{ email: email, id: id },
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	)
}

export const accessTokenFC = async (
	token: string
): Promise<AxiosResponse<IUser>> => {
	return axios.get('/private/protected', {
		headers: { Authorization: `Bearer ${token}` },
	})
}
