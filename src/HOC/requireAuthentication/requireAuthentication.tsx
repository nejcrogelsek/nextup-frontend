import { GetServerSideProps, GetServerSidePropsContext } from "next"


export const requireAuthentication = (gssp: GetServerSideProps) => {
	return async (ctx: GetServerSidePropsContext) => {
		const { req } = ctx

		if (req.headers.cookie) {
			const token: string | null = req.headers.cookie.slice(6, req.headers.cookie.length)
			console.log(token)
			if (!token) {
				console.log('returning')
				return {
					redirect: {
						permanent: false,
						destination: '/signup'
					}
				}
			}
		}

		return await gssp(ctx)
	}
}
