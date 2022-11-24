const slideContainer = document.querySelector('.container')
const slides = document.querySelector('.slides')
const nextBtn = document.querySelector('.next-btn')
const prevBtn = document.querySelector('.prev-btn')
const interval = 1000

let slide = document.querySelectorAll('.slide')
let index = 1
let slideId

const firstClone = slide[0].cloneNode(true)
const lastClone = slide[slide.length - 1].cloneNode(true)

firstClone.id = 'first-clone'
lastClone.id = 'last-clone'

slides.append(firstClone)
slides.prepend(lastClone)

const slideWidth = slide[index].clientWidth

slides.style.transform = `translateX(${-slideWidth * index}px)`

console.log(slide)

const startSlide = () => {
	slideId = setInterval(() => {
		moveToNextSlide()
	}, interval)
}

const getSlides = () => document.querySelectorAll('.slide')

slides.addEventListener('transitionend', () => {
	slide = getSlides()
	if (slide[index].id === firstClone.id) {
		slides.style.transition = 'none'
		index = 1
		slides.style.transform = `translateX(${-slideWidth * index}px)`
	}

	if (slide[index].id === lastClone.id) {
		slides.style.transition = 'none'
		index = slide.length - 2
		slides.style.transform = `translateX(${-slideWidth * index}px)`
	}
})

const moveToNextSlide = () => {
	slide = getSlides()
	if (index >= slide.length - 1) return
	index++
	slides.style.transition = '.7s ease-out'
	slides.style.transform = `translateX(${-slideWidth * index}px)`
}

const moveToPreviousSlide = () => {
	if (index <= 0) return
	index--
	slides.style.transition = '.7s ease-out'
	slides.style.transform = `translateX(${-slideWidth * index}px)`
}

slideContainer.addEventListener('mouseenter', () => {
	clearInterval(slideId)
})

slideContainer.addEventListener('mouseleave', startSlide)
nextBtn.addEventListener('click', moveToNextSlide)
prevBtn.addEventListener('click', moveToPreviousSlide)

startSlide()
