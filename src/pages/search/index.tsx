import { FC } from 'react'
import SearchPage from '../../components/search/Search'
import { Footer, Header } from '../../components/shared'

const Search: FC = () => {
	return (
		<>
			<Header />
			<SearchPage />
			<Footer />
		</>
	)
}

export default Search
