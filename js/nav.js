'use strict'
export const navAnimation = () => {
	const topNav = document.querySelector('.nav-top')
	const navBar = document.querySelector('.nav-bar')
	const navBag = document.querySelector('.nav-bar__bag')
	const navBtn = document.querySelector('.nav-bar__burger')
	const navBarClose = document.querySelector('.nav-bar__input-close')
	const navSearch = document.querySelector('.nav-bar__search')
	const bagCart = document.querySelector('.bag-cart')
	const allNavItems = document.querySelectorAll('.nav-top__item')

	const showMenu = () => {
		topNav.classList.toggle('nav-hidden')
		navBag.classList.toggle('bag-hidden')
		navBtn.classList.toggle('click-btn')
		bagCart.classList.toggle('cart-movRight')

		allNavItems.forEach(item => {
			item.addEventListener('click', () => {
				topNav.classList.remove('nav-hidden')
				navBag.classList.remove('bag-hidden')
				navBtn.classList.remove('click-btn')
			})
		})

		handleNavItemsAnimation()
	}

	const showSearchInput = () => {
		navBar.classList.toggle('nav-bar--active')
	}

	const handleNavItemsAnimation = () => {
		let delayTime = 0
		allNavItems.forEach(item => {
			item.classList.toggle('nav-item-animation')
			item.style.animationDelay = delayTime / 15 + 's'
			delayTime++
		})
	}

	navBtn.addEventListener('click', showMenu)
	navSearch.addEventListener('click', showSearchInput)
	navBarClose.addEventListener('click', showSearchInput)
}
