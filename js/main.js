const topNav = document.querySelector('.nav-top')
const navBtn = document.querySelector('.nav-bar__burger')
const navBag = document.querySelector('.nav-bar__bag')
const allNavItems = document.querySelectorAll('.nav-top__item')

const showMenu = () => {
	topNav.classList.toggle('nav-hidden')
	navBag.classList.toggle('bag-hidden')
	navBtn.classList.toggle('click-btn')

	allNavItems.forEach(item => {
		item.addEventListener('click', () => {
			topNav.classList.remove('nav-hidden')
			navBag.classList.remove('bag-hidden')
			navBtn.classList.remove('click-btn')
		})
	})

	handleNavItemsAnimation()
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
