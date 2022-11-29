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
const autoSlider = () => {
	const slideContainer = document.querySelector('.slider__track-container')
	const slides = document.querySelector('.slider__slides')
	const nextBtn = document.querySelector('.slider__next')
	const prevBtn = document.querySelector('.slider__previous')
	const dotContainer = document.querySelector('.slider__nav-dots-contaner')
	const interval = 3000

	let slide = document.querySelectorAll('.slider__slide')
	let index = 1
	let slideId

	// CLONING SLIDE
	const firstClone = slide[0].cloneNode(true)
	const lastClone = slide[slide.length - 1].cloneNode(true)

	firstClone.id = 'first-clone'
	lastClone.id = 'last-clone'

	slides.append(firstClone)
	slides.prepend(lastClone)

	const slideWidth = slide[index].clientWidth

	slides.style.transform = `translateX(${-slideWidth * index}px)`

	const getSlides = () => document.querySelectorAll('.slider__slide')

	slides.addEventListener('transitionend', () => {
		slide = getSlides()
		if (slide[index].id === firstClone.id) {
			slides.style.transition = 'none'
			index = 1
			slides.style.transform = `translate(${-slideWidth * index}px)`
		}

		if (slide[index].id === lastClone.id) {
			slides.style.transition = 'none'
			index = slide.length - 2
			slides.style.transform = `translate(${-slideWidth * index}px)`
		}
	})

	// FUNCTIONS
	const getDataSlide = () => {
		slide.forEach((e, i) => e.classList.add(`slider__slide--${i + 1}`))
	}

	const activateSlide = slide => {
		document.querySelectorAll('.slider__slide').forEach(e => e.classList.remove('slider__slide--active'))

		document.querySelector(`.slider__slide--${slide}`).classList.add('slider__slide--active')
	}

	const createDots = () => {
		slide.forEach((_, i) => {
			dotContainer.insertAdjacentHTML('beforeend', `<button class="slider__nav-dot"data-slide="${i + 1}"></button>`)
		})
	}

	const activateDot = slide => {
		document.querySelectorAll('.slider__nav-dot').forEach(dot => dot.classList.remove('slider__nav-dot--active'))

		document.querySelector(`.slider__nav-dot[data-slide="${slide}"]`).classList.add('slider__nav-dot--active')
	}

	const goToSLide = slide => {
		slides.style.transform = `translate(${-slideWidth * slide}px)`
	}

	const startSlide = () => {
		slideId = setInterval(() => {
			moveToNextSlide()
		}, interval)
	}

	const init = () => {
		getDataSlide()
		activateSlide(1)
		createDots()
		goToSLide(1)
		activateDot(1)
		startSlide()
	}

	// NEXT SLIDE
	const moveToNextSlide = () => {
		if (index >= slide.length - 1) {
			return
		} else {
			index++
		}
		slides.style.transition = '.7s ease-out'
		slides.style.transform = `translate(${-slideWidth * index}px)`

		if (index >= slide.length - 1) {
			activateDot(1)
			activateSlide(1)
		} else {
			activateDot(index)
			activateSlide(index)
		}
	}

	// PREV SLIDE
	const moveToPreviousSlide = () => {
		if (index <= 0) return
		index--
		slides.style.transition = '.7s ease-out'
		slides.style.transform = `translateX(${-slideWidth * index}px)`

		if (index <= 0) {
			activateDot(slide.length - 2)
			activateSlide(slide.length - 2)
		} else {
			activateDot(index)
			activateSlide(index)
		}
	}

	init()

	// EVENT HANDLERS
	slideContainer.addEventListener('mouseenter', () => {
		clearInterval(slideId)
	})

	slideContainer.addEventListener('mouseleave', startSlide)
	nextBtn.addEventListener('click', moveToNextSlide)
	prevBtn.addEventListener('click', moveToPreviousSlide)

	document.addEventListener('keydown', e => {
		e.key === 'ArrowLeft' && moveToPreviousSlide()
		e.key === 'ArrowRight' && moveToNextSlide()
	})

	dotContainer.addEventListener('click', e => {
		if (e.target.classList.contains('slider__nav-dot')) {
			const { slide } = e.target.dataset
			goToSLide(slide)
			activateDot(slide)

			console.log(e.target.dataset)
		}
	})
}
autoSlider()
