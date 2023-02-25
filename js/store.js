'use strict'

export const storeApp = () => {
	const cartItems = document.querySelector('.nav-bar__bag-amount')
	const cartDOM = document.querySelector('.bag-cart')
	const cartContent = document.querySelector('.bag-cart__content')
	const cartTotal = document.querySelector('.bag-cart__total')
	const clearCartBtn = document.querySelector('.bag-cart__clear-btn')
	const cartFooter = document.querySelector('.bag-cart__footer')
	const cartEmpty = document.querySelector('.bag-cart__empty')
	const navBag = document.querySelector('.nav-bar__bag')
	const bagClose = document.querySelector('.bag-cart__close')

	// CART
	let cart = []

	// BUTTONS
	let buttonsDOM = []

	// GETTING THE PRODUCTS
	class Products {
		async getProduct() {
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
		getBagButtons() {
			const buttons = [...document.querySelectorAll('.bag-btn')]
			buttonsDOM = buttons
			buttons.forEach((button, index) => {
				button.setAttribute('data-id', index + 1)
				let id = button.dataset.id
				let inCart = cart.find(item => item.id === id)
				if (inCart) {
					button.innerText = 'In Cart'
					button.disabled = true
				}
				button.addEventListener('click', event => {
					event.target.innerText = 'In Cart'
					event.target.disabled = true
					// get product from product
					let cartItem = { ...Storage.getProduct(id), amount: 1 }
					// add product to the cart
					cart = [...cart, cartItem]
					// save cart in local storage
					Storage.saveCart(cart)
					// set cart values
					this.setCartValues(cart)
					// display cart item
					this.addCartItem(cartItem)
					// show the cart
					this.showCart()
				})
			})
		}
		setCartValues(cart) {
			let tempTotal = 0
			let itemsTotal = 0
			cart.map(item => {
				tempTotal += item.price * item.amount
				itemsTotal += item.amount
			})
			cartTotal.innerText = parseFloat(tempTotal.toFixed(2))
			cartItems.innerText = itemsTotal
			if (itemsTotal === 0) {
				cartItems.style.display = 'none'
				cartFooter.style.display = 'none'
				cartEmpty.style.display = 'block'
			} else {
				cartItems.style.display = 'block'
				cartFooter.style.display = 'flex'
				cartEmpty.style.display = 'none'
			}
		}
		addCartItem(item) {
			const div = document.createElement('div')
			div.classList.add('bag-cart__item')
			div.innerHTML = `
				<img src=${item.image} alt="product">
				<div class="bag-cart__text">
					<h4>${item.title}</h4>
					<h5>$${item.price}</h5>
				</div>
				<div class="bag-cart__menu">
					<div class="bag-cart__menu-up" data-id=${item.id}>
						<img src="./img/buttons/iconmonstr-angel-up-thin.svg" alt="up arrow">
					</div>
					<p class="bag-cart__menu-amount">${item.amount}</p>
					<div class="bag-cart__menu-down" data-id=${item.id}>
						<img src="./img/buttons/iconmonstr-angel-down-thin.svg" alt="down arrow">
					</div>
				</div>
				<div class="bag-cart__trash" data-id=${item.id}>
					<img src="./img/buttons/iconmonstr-trash-can-thin.svg" alt="remove">
				</div>`
			cartContent.appendChild(div)
		}
		showCart() {
			cartDOM.classList.add('cart-show')
		}
		switchCart() {
			cartDOM.classList.toggle('cart-show')
		}
		setupAPP() {
			cart = Storage.getCart()
			this.setCartValues(cart)
			this.populateCart(cart)
			navBag.addEventListener('click', this.switchCart)
			bagClose.addEventListener('click', this.switchCart)
		}
		populateCart(cart) {
			cart.forEach(item => this.addCartItem(item))
		}
		cartLogic() {
			// clear cart button
			clearCartBtn.addEventListener('click', () => {
				this.clearCart()
			})
			// cart fuctionality
			cartContent.addEventListener('click', event => {
				if (event.target.parentNode.classList.contains('bag-cart__trash')) {
					let removeItem = event.target.parentNode
					let id = removeItem.dataset.id
					cartContent.removeChild(removeItem.parentElement)
					this.removeItem(id)
				} else if (event.target.parentNode.classList.contains('bag-cart__menu-up')) {
					let addAmount = event.target.parentNode
					let id = addAmount.dataset.id
					let tempItem = cart.find(item => item.id === id)
					tempItem.amount = tempItem.amount + 1
					Storage.saveCart(cart)
					this.setCartValues(cart)
					addAmount.nextElementSibling.innerText = tempItem.amount
				} else if (event.target.parentNode.classList.contains('bag-cart__menu-down')) {
					let lowerAmount = event.target.parentNode
					let id = lowerAmount.dataset.id
					let tempItem = cart.find(item => item.id === id)
					tempItem.amount = tempItem.amount - 1
					if (tempItem.amount > 0) {
						Storage.saveCart(cart)
						this.setCartValues(cart)
						lowerAmount.previousElementSibling.innerText = tempItem.amount
					} else {
						cartContent.removeChild(lowerAmount.parentElement.parentElement)
						this.removeItem(id)
					}
				}
			})
		}
		clearCart() {
			let cartItems = cart.map(item => item.id)
			cartItems.forEach(id => this.removeItem(id))
			while (cartContent.children.length > 0) {
				cartContent.removeChild(cartContent.children[0])
			}
		}
		removeItem(id) {
			cart = cart.filter(item => item.id !== id)
			this.setCartValues(cart)
			Storage.saveCart(cart)
			let button = this.getSingleButton(id)
			button.disabled = false
			button.innerText = 'Buy'
		}
		getSingleButton(id) {
			return buttonsDOM.find(button => button.dataset.id === id)
		}
	}

	// LOCAL STORAGE
	class Storage {
		static saveProducts(products) {
			localStorage.setItem('products', JSON.stringify(products))
		}
		static getProduct(id) {
			let products = JSON.parse(localStorage.getItem('products'))
			return products.find(product => product.id === id)
		}
		static saveCart(cart) {
			localStorage.setItem('cart', JSON.stringify(cart))
		}
		static getCart() {
			return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
		}
	}

	document.addEventListener('DOMContentLoaded', () => {
		const ui = new UI()
		const products = new Products()
		// setup app
		ui.setupAPP()
		// get all products
		products
			.getProduct()
			.then(products => {
				Storage.saveProducts(products)
			})
			.then(() => {
				ui.getBagButtons()
				ui.cartLogic()
			})
	})
}

export const storeApp2 = () => {
	const cartItems = document.querySelector('.nav-bar__bag-amount')
	const cartDOM = document.querySelector('.bag-cart')
	const cartContent = document.querySelector('.bag-cart__content')
	const cartTotal = document.querySelector('.bag-cart__total')
	const clearCartBtn = document.querySelector('.bag-cart__clear-btn')
	const cartFooter = document.querySelector('.bag-cart__footer')
	const cartEmpty = document.querySelector('.bag-cart__empty')
	const navBag = document.querySelector('.nav-bar__bag')
	const bagClose = document.querySelector('.bag-cart__close')

	// CART
	let cart = []

	// BUTTONS
	let buttonsDOM = []

	// GETTING THE PRODUCTS
	class Products {
		async getProduct() {
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
		getBagButtons() {
			const buttons = [...document.querySelectorAll('.bag-btn')]
			buttonsDOM = buttons
			buttons.forEach((button, index) => {
				button.setAttribute('data-id', index + 1)
				let id = button.dataset.id
				let inCart = cart.find(item => item.id === id)
				if (inCart) {
					button.innerText = 'In Cart'
					button.disabled = true
				}
				button.addEventListener('click', event => {
					event.target.innerText = 'In Cart'
					event.target.disabled = true
					// get product from product
					let cartItem = { ...Storage.getProduct(id), amount: 1 }
					// add product to the cart
					cart = [...cart, cartItem]
					// save cart in local storage
					Storage.saveCart(cart)
					// set cart values
					this.setCartValues(cart)
					// display cart item
					this.addCartItem(cartItem)
					// show the cart
					this.showCart()
				})
			})
		}
		setCartValues(cart) {
			let tempTotal = 0
			let itemsTotal = 0
			cart.map(item => {
				tempTotal += item.price * item.amount
				itemsTotal += item.amount
			})
			cartTotal.innerText = parseFloat(tempTotal.toFixed(2))
			cartItems.innerText = itemsTotal
			if (itemsTotal === 0) {
				cartItems.style.display = 'none'
				cartFooter.style.display = 'none'
				cartEmpty.style.display = 'block'
			} else {
				cartItems.style.display = 'block'
				cartFooter.style.display = 'flex'
				cartEmpty.style.display = 'none'
			}
		}
		addCartItem(item) {
			const div = document.createElement('div')
			div.classList.add('bag-cart__item')
			div.innerHTML = `
				<img src=${item.image} alt="product">
				<div class="bag-cart__text">
					<h4>${item.title}</h4>
					<h5>$${item.price}</h5>
				</div>
				<div class="bag-cart__menu">
					<div class="bag-cart__menu-up" data-id=${item.id}>
						<img src="./img/buttons/iconmonstr-angel-up-thin.svg" alt="up arrow">
					</div>
					<p class="bag-cart__menu-amount">${item.amount}</p>
					<div class="bag-cart__menu-down" data-id=${item.id}>
						<img src="./img/buttons/iconmonstr-angel-down-thin.svg" alt="down arrow">
					</div>
				</div>
				<div class="bag-cart__trash" data-id=${item.id}>
					<img src="./img/buttons/iconmonstr-trash-can-thin.svg" alt="remove">
				</div>`
			cartContent.appendChild(div)
		}
		showCart() {
			cartDOM.classList.add('cart-show')
		}
		switchCart() {
			cartDOM.classList.toggle('cart-show')
		}
		setupAPP() {
			cart = Storage.getCart()
			this.setCartValues(cart)
			this.populateCart(cart)
			navBag.addEventListener('click', this.switchCart)
			bagClose.addEventListener('click', this.switchCart)
		}
		populateCart(cart) {
			cart.forEach(item => this.addCartItem(item))
		}
		cartLogic() {
			// clear cart button
			clearCartBtn.addEventListener('click', () => {
				this.clearCart()
			})
			// cart fuctionality
			cartContent.addEventListener('click', event => {
				if (event.target.parentNode.classList.contains('bag-cart__trash')) {
					let removeItem = event.target.parentNode
					let id = removeItem.dataset.id
					cartContent.removeChild(removeItem.parentElement)
					this.removeItem(id)
				} else if (event.target.parentNode.classList.contains('bag-cart__menu-up')) {
					let addAmount = event.target.parentNode
					let id = addAmount.dataset.id
					let tempItem = cart.find(item => item.id === id)
					tempItem.amount = tempItem.amount + 1
					Storage.saveCart(cart)
					this.setCartValues(cart)
					addAmount.nextElementSibling.innerText = tempItem.amount
				} else if (event.target.parentNode.classList.contains('bag-cart__menu-down')) {
					let lowerAmount = event.target.parentNode
					let id = lowerAmount.dataset.id
					let tempItem = cart.find(item => item.id === id)
					tempItem.amount = tempItem.amount - 1
					if (tempItem.amount > 0) {
						Storage.saveCart(cart)
						this.setCartValues(cart)
						lowerAmount.previousElementSibling.innerText = tempItem.amount
					} else {
						cartContent.removeChild(lowerAmount.parentElement.parentElement)
						this.removeItem(id)
					}
				}
			})
		}
		clearCart() {
			let cartItems = cart.map(item => item.id)
			cartItems.forEach(id => this.removeItem(id))
			while (cartContent.children.length > 0) {
				cartContent.removeChild(cartContent.children[0])
			}
		}
		removeItem(id) {
			cart = cart.filter(item => item.id !== id)
			this.setCartValues(cart)
			Storage.saveCart(cart)
			let button = this.getSingleButton(id)
		}
		getSingleButton(id) {
			return buttonsDOM.find(button => button.dataset.id === id)
		}
	}

	// LOCAL STORAGE
	class Storage {
		static saveProducts(products) {
			localStorage.setItem('products', JSON.stringify(products))
		}
		static getProduct(id) {
			let products = JSON.parse(localStorage.getItem('products'))
			return products.find(product => product.id === id)
		}
		static saveCart(cart) {
			localStorage.setItem('cart', JSON.stringify(cart))
		}
		static getCart() {
			return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
		}
	}

	document.addEventListener('DOMContentLoaded', () => {
		const ui = new UI()
		const products = new Products()
		// setup app
		ui.setupAPP()
		// get all products
		products
			.getProduct()
			.then(products => {
				Storage.saveProducts(products)
			})
			.then(() => {
				ui.getBagButtons()
				ui.cartLogic()
			})
	})
}
