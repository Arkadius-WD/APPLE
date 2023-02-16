'use strict'

export const storeApp = () => {
	const cartItems = document.querySelector('.nav-bar__bag-amount')
	const cartDOM = document.querySelector('.bag-cart')
	const cartContent = document.querySelector('.bag-cart__content')
	const cartTotal = document.querySelector('.bag-cart__total')
	const clearCartBtn = document.querySelector('.bag-cart__clear-cart')
	const btns = [...document.querySelectorAll('.bag-btn')]

	console.log(btns)

	// CART
	let cart = []

	// GETTING THE PRODUCTS
	class Products {
		async getProducts() {
			try {
				let result = await fetch('products.json')
				let data = await result.json()
				let products = data.items
				products = products.map(item => {
					const { title, price } = item.fields
					const { id } = item.sys
					const image = item.fields.image.fields.file.url
					return { title, price, id, image }
				})
				return products
			} catch (error) {
				console.log(error)
			}
		}
	}

	//DISPLAY PRODUCTS
	class UI {}

	// LOCAL STORAGE
	class Storage {
		static saveProducts(products) {
			localStorage.setItem('products', JSON.stringify(products))
		}
	}

	document.addEventListener('DOMContentLoaded', () => {
		const ui = new UI()
		const products = new Products()

		// get all products
		products.getProducts().then(products => {
			console.log(products)
			Storage.saveProducts(products)
		})
	})
}
