'use strict'

export const storeSlides = () => {
	const carouselSlider = () => {
		const container = document.querySelector('.carousel-store__container')
		const slides = document.querySelectorAll('.carousel-store__card')
		const nextButton = document.querySelector('.carousel-store__next')
		const prevButton = document.querySelector('.carousel-store__previous')

		let index = 0
		prevButton.style.display = 'none'

		const slideWidth = slides[0].getBoundingClientRect().width
		const containerWidth = container.getBoundingClientRect().width
		const shiftSlide = slides.length - Math.round(containerWidth / slideWidth)

		const moveToNextSlide = () => {
			if (index >= shiftSlide - 1) {
				nextButton.style.display = 'none'
			}

			if (index >= shiftSlide) {
				return
			} else {
				index++
				prevButton.style.display = 'block'
			}
			container.style.transition = 'transform 1s'
			container.style.transform = `translateX(-${slideWidth * index}px)`
		}

		const moveToPreviousSlide = () => {
			if (index <= 0 + 1) {
				prevButton.style.display = 'none'
			}

			if (index <= 0) {
				return
			} else {
				index--
				nextButton.style.display = 'block'
			}

			container.style.transition = 'transform 1s'
			container.style.transform = `translateX(${-slideWidth * index}px)`
		}

		nextButton.addEventListener('click', moveToNextSlide)
		prevButton.addEventListener('click', moveToPreviousSlide)
	}

	const iPhoneSlider = () => {
		const container = document.querySelector('.iPhone-store__devices-cards')
		const slides = document.querySelectorAll('.iPhone-store__devices-card')
		const nextButton = document.querySelector('.iPhone-store__next')
		const prevButton = document.querySelector('.iPhone-store__previous')

		let index = 0
		prevButton.style.display = 'none'

		const slideWidth = slides[0].getBoundingClientRect().width + 21
		const containerWidth = container.getBoundingClientRect().width
		const shiftSlide = slides.length - Math.round(containerWidth / slideWidth)

		const moveToNextSlide = () => {
			if (index >= shiftSlide - 1) {
				nextButton.style.display = 'none'
			}

			if (index >= shiftSlide) {
				return
			} else {
				index++
				prevButton.style.display = 'block'
			}
			container.style.transition = 'transform 1s'
			container.style.transform = `translateX(-${slideWidth * index}px)`
		}

		const moveToPreviousSlide = () => {
			if (index <= 0 + 1) {
				prevButton.style.display = 'none'
			}

			if (index <= 0) {
				return
			} else {
				index--
				nextButton.style.display = 'block'
			}

			container.style.transition = 'transform 1s'
			container.style.transform = `translateX(${-slideWidth * index}px)`
		}

		nextButton.addEventListener('click', moveToNextSlide)
		prevButton.addEventListener('click', moveToPreviousSlide)
	}

	const accSlider = () => {
		const container = document.querySelector('.acc-store__accessories-cards')
		const slides = document.querySelectorAll('.acc-store__accessories-card')
		const nextButton = document.querySelector('.acc-store__next')
		const prevButton = document.querySelector('.acc-store__previous')

		let index = 0
		prevButton.style.display = 'none'

		const slideWidth = slides[0].getBoundingClientRect().width + 21
		const containerWidth = container.getBoundingClientRect().width
		const shiftSlide = slides.length - Math.round(containerWidth / slideWidth)

		const moveToNextSlide = () => {
			if (index >= shiftSlide - 1) {
				nextButton.style.display = 'none'
			}

			if (index >= shiftSlide) {
				return
			} else {
				index++
				prevButton.style.display = 'block'
			}
			container.style.transition = 'transform 1s'
			container.style.transform = `translateX(-${slideWidth * index}px)`
		}

		const moveToPreviousSlide = () => {
			if (index <= 0 + 1) {
				prevButton.style.display = 'none'
			}

			if (index <= 0) {
				return
			} else {
				index--
				nextButton.style.display = 'block'
			}

			container.style.transition = 'transform 1s'
			container.style.transform = `translateX(${-slideWidth * index}px)`
		}

		nextButton.addEventListener('click', moveToNextSlide)
		prevButton.addEventListener('click', moveToPreviousSlide)
	}

	carouselSlider()
	iPhoneSlider()
	accSlider()
}
