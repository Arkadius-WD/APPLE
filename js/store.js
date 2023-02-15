'use strict'

export const storeApp = () => {
	const devicesDOM = document.querySelector('.iPhone-store__devices-cards')
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
	class UI {
		displayProducts(products) {
			let result = ''
			products.forEach(product => {
				result += `<li class="iPhone-store__devices-card" data-id=${product.id}>
                            <div class="iPhone-store__devices-card-title">
                                <h3>${product.title}</h3>
                            </div>
                            <div class="iPhone-store__devices-card-img">
                                <img src=${product.image}>
                            </div>
                            <div class="iPhone-store__devices-card-dots">
                            </div>
                            <div class="iPhone-store__devices-card-text">
                                <h4>Price: $${product.price}</h4>
                            </div>
                            <button class="iPhone-store__devices-card-button">Buy</button>
                        </li>`
			})
			devicesDOM.innerHTML = result
		}
	}

	// LOXAL STORAGE
	class Storage {}

	document.addEventListener('DOMContentLoaded', () => {
		const ui = new UI()
		const products = new Products()

		// get all products
		products.getProducts().then(products => ui.displayProducts(products))
	})
}
