'use strict'

export const footerList = () => {
	const footerSections = document.querySelectorAll('.footer__nav-column-section')

	// FUNCTIONS
	function getDataIdFooter() {
		footerSections.forEach((el, i) => el.setAttribute('data-id', `${i + 1}`))
	}
	getDataIdFooter()

	footerSections.forEach(el =>
		el.addEventListener('click', () => {
			if (window.innerWidth > 834) {
				return
			} else {
				el.classList.toggle('footer__nav-column-section--active')
			}
		})
	)
}
