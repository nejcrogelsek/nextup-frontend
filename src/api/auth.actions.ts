import axios from './axios'
import {
	IAuthReturnData,
	IAccessToken,
	SignInData,
	SignUpData,
} from '../interfaces/auth.interface'
import { AxiosError, AxiosResponse } from 'axios'
import { IUser } from '../interfaces/user.interface'

export const login = async (
	dataset: SignInData
): Promise<AxiosResponse<SignInData> | AxiosError> => {
	const data = {
		username: dataset.email,
		password: dataset.password,
	}
	return axios.post('/auth/login', data).catch((err) => {
		return err.response.data
	})
}

export const generateUploadUrl = async (): Promise<AxiosResponse<Response>> => {
	return axios.get('users/upload')
}

export const uploadImage = async (
	url: string,
	file: File
): Promise<AxiosResponse<void>> => {
	return axios.put(url, file, {
		headers: { 'Content-Type': 'multipart/form-data' },
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

export const refreshTokenFC = async (
	name: string,
	sub: number,
	token: string
): Promise<AxiosResponse<IAccessToken>> => {
	return axios.post(
		'/auth/refresh-token',
		{ name: name, sub: sub },
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	)
}

export const accessTokenFC = async (
	token: string
): Promise<AxiosResponse<IUser>> => {
	return axios.get('/auth/protected', {
		headers: { Authorization: `Bearer ${token}` },
	})
}
