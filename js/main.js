const topNav = document.querySelector('.nav__list')
const navBtn = document.querySelector('.nav__burger')
const allNavItems = document.querySelectorAll('.nav__list-item')

const showMenu = () => {
	topNav.classList.toggle('hidden')
	navBtn.classList.toggle('click-btn')

	allNavItems.forEach(item => {
		item.addEventListener('click', () => {
			topNav.classList.remove('hidden')
			navBtn.classList.remove('click-btn')
		})
	})

	// handleNavItemsAnimation()
}

// const handleNavItemsAnimation = () => {
// 	let delayTime = 0
// 	allNavItems.forEach(item => {
// 		item.classList.toggle('nav-item-animation')
// 		item.style.animationDelay = delayTime / 10 + 's'
// 		delayTime++
// 	})
// }

navBtn.addEventListener('click', showMenu)
