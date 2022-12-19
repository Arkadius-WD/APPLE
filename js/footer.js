'use strict'

export const footerList = () => {
	const footerIcon = document.querySelectorAll('.footer__nav-column-section-icon')

	// FUNCTIONS
	function getDataIdFooter() {
		footerIcon.forEach((el, i) => el.setAttribute('data-id', `${i + 1}`))
	}
	getDataIdFooter()

	footerIcon.forEach(el =>
		el.addEventListener('click', e => {
			e.target.classList.toggle('footer__nav-column-section-icon--active')
			console.log(e.target)
		})
	)
}
