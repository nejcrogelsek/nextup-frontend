import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { Redirect } from "../../components/shared"


export const requireAuthentication = (gssp: GetServerSideProps) => {
	return async (ctx: GetServerSidePropsContext) => {
		const { req } = ctx

		console.log('requireAuthentication RUNNING...')

		if (req.headers.cookie) {
			const token: string | null = req.headers.cookie.slice(6, req.headers.cookie.length)
			console.log(token)
			if (!token) {
				return <Redirect to='/signup' />
			}
		}

		return await gssp(ctx)
	}
}
