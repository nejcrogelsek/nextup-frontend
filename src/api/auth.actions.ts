import axios from './axios'
import {
	AuthReturnData,
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
	createUserDto: SignUpData,
	image_url: string
): Promise<AxiosResponse<AuthReturnData> | AxiosError> => {
	const data = {
		profile_image: image_url,
		email: createUserDto.email,
		first_name: createUserDto.first_name,
		last_name: createUserDto.last_name,
		password: createUserDto.password,
		confirm_password: createUserDto.confirm_password,
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
