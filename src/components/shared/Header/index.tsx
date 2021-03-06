import { FC, useEffect, useState } from 'react'
import { Logo } from '..'
import MenuIcon from '../../icons/MenuIcon'
import NavDesktop from './Desktop'
import NavMobile from './Mobile'

const Header: FC = () => {
	const [isMobile, setIsMobile] = useState(true)
	const [toggle, setToggle] = useState(false)

	const checkIfMobile = () => {
		if (window.innerWidth < 1024) {
			setIsMobile(true)
		} else {
			setIsMobile(false)
			setToggle(false)
		}
	}

	useEffect(() => {
		checkIfMobile()
		window.addEventListener('resize', checkIfMobile)
		return () => {
			window.removeEventListener('resize', checkIfMobile)
		}
	}, [])

	const toggleNav = () => {
		setToggle(!toggle)
	}
	return (
		<>
			<header className='absolute top-0 left-0 right-0 h-24 max-w-screen-xl mx-auto app-padding md:flex md:items-center z-50'>
				<div className="flex justify-between items-center w-full h-24 lg:w-max">
					<Logo />
					<div className="cursor-pointer lg:hidden" onClick={() => toggleNav()}>
						<MenuIcon />
					</div>
				</div>
				{isMobile ? (
					<NavMobile toggleNav={toggleNav} toggle={toggle} />
				) : (
					<NavDesktop />
				)}
			</header>
			<div className={toggle ? 'pointer-events-all w-full h-screen opacity-10 bg-black fixed transition z-10' : 'pointer-events-none w-full h-screen opacity-0 bg-black fixed transition z-10'} onClick={() => toggleNav()}></div>
		</>
	)
}

export default Header
