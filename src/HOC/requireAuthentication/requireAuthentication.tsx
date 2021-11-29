import { GetServerSideProps, GetServerSidePropsContext } from "next"


export const requireAuthentication = (gssp: GetServerSideProps) => {
	return async (ctx: GetServerSidePropsContext) => {
		const { req } = ctx

		if (req.headers.authorization) {
			const token: string | null = localStorage.getItem('user')
			if (!token) {
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
