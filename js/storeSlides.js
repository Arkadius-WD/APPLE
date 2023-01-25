'use strict'

export const storeSlides = () => {
	const container = document.querySelector('.carousel-store__container')
	const slides = Array.from(container.children)
	const nextButton = document.querySelector('.carousel-store__next')
	const prevButton = document.querySelector('.carousel-store__previous')

	const slideWidth = slides[0].getBoundingClientRect().width

	console.log(slideWidth)
}