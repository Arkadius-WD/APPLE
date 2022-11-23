//////////////////////// NAV ////////////////////////////
/////////////////////////////////////////////////////////
const navAnimation = () => {
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
}
navAnimation()

////////////////////// SLIDER ///////////////////////////
/////////////////////////////////////////////////////////
const slider = () => {
	const slides = document.querySelectorAll('.slider__slide')
	const leftBtn = document.querySelector('.slider__previous')
	const rightBtn = document.querySelector('.slider__next')
	const dotContainer = document.querySelector('.slider__nav-dots-contaner')

	let curSlide = 0
	const maxSlide = slides.length

	//FUNCTIONS
	const createDots = () => {
		slides.forEach((_, i) => {
			dotContainer.insertAdjacentHTML('beforeend', `<button class="slider__nav-dot" data-slide="${i}"></button>`)
		})
	}

	const activateDot = slide => {
		document.querySelectorAll('.slider__nav-dot').forEach(dot => dot.classList.remove('slider__nav-dot--active'))

		document.querySelector(`.slider__nav-dot[data-slide="${slide}"]`).classList.add('slider__nav-dot--active')
	}

	const goToSLide = slide => {
		slides.forEach((s, i) => (s.style.transform = `translate(${100 * (i - slide)}%)`))
	}

	const init = () => {
		goToSLide(1)
		createDots()
		activateDot(1)
	}

	// NEXT SLIDE
	const nextSlide = () => {
		if (curSlide === maxSlide - 1) {
			curSlide = 0
		} else {
			curSlide++
		}

		goToSLide(curSlide)
		activateDot(curSlide)
	}

	// PREV SlIDE
	const prevSlide = () => {
		if (curSlide === 0) {
			curSlide = maxSlide - 1
		} else {
			curSlide--
		}
		goToSLide(curSlide)
		activateDot(curSlide)
	}

	init()

	// EVENT HANDLERS
	rightBtn.addEventListener('click', nextSlide)
	leftBtn.addEventListener('click', prevSlide)

	document.addEventListener('keydown', e => {
		e.key === 'ArrowLeft' && prevSlide()
		e.key === 'ArrowRight' && nextSlide()
	})

	dotContainer.addEventListener('click', e => {
		if (e.target.classList.contains('slider__nav-dot')) {
			const { slide } = e.target.dataset
			goToSLide(slide)
			activateDot(slide)
		}
	})
}
slider()