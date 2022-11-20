//////////////////////// NAV ////////////////////////////
/////////////////////////////////////////////////////////

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

////////////////////// SLIDER ///////////////////////////
/////////////////////////////////////////////////////////

const slides = document.querySelectorAll('.slider__slide')
const leftBtn = document.querySelector('.slider__previous')
const rightBtn = document.querySelector('.slider__next')

let curSlide = 0
const maxSlide = slides.length

const goToSLide = slide => {
	slides.forEach((s, i) => (s.style.transform = `translate(${100 * (i - slide)}%)`))
}

goToSLide(0)

// NEXT SLIDE
const nextSlide = () => {
	if (curSlide === maxSlide - 1) {
		curSlide = 0
	} else {
		curSlide++
	}

	goToSLide(curSlide)
}

// PREV SlIDE
const prevSlide = () => {
	if (curSlide === 0) {
		curSlide = maxSlide - 1
	} else {
		curSlide--
	}
	goToSLide(curSlide)
}

rightBtn.addEventListener('click', nextSlide)
leftBtn.addEventListener('click', prevSlide)
