'use strict'

export const storeApp = () => {
	const productsDOM = document.querySelector('.products')
	const cartItems = document.querySelector('.nav-bar__bag-amount')
	const cartDOM = document.querySelector('.bag-cart')
	const cartContent = document.querySelector('.bag-cart__content')
	const cartTotal = document.querySelector('.bag-cart__total')
	const clearCartBtn = document.querySelector('.bag-cart__clear-cart')

	// CART
	let cart = []

	// GETTING THE PRODUCTS
	class Products {
		async getProducts() {
			try {
				let result = await fetch('products.json')
				let data = await result.json()
				return data
			} catch (error) {
				console.log(error)
			}
		}
	}

	// DISPLAY PRODUCTS
	class UI {}

	// LOXAL STORAGE
	class Storage {}

	document.addEventListener('DOMContentLoaded', () => {
		const ui = new UI()
		const products = new Products()

		// get all products
		products.getProducts().then(data => console.log(data))
	})
}
