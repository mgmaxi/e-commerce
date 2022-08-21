import { useState, createContext, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
	const existingCartItem = cartItems.find(
		cartItem => cartItem.id === productToAdd.id
	);

	if (existingCartItem) {
		return cartItems.map(cartItem =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const handleQuantityCartItem = (cartItems, selectedCartItem, sign) => {
	const existingCartItem = cartItems.find(
		cartItem => cartItem.id === selectedCartItem.id
	);

	if (existingCartItem.quantity <= 1 && sign === '-') {
		return removeCartItem(cartItems, selectedCartItem.id);
	}
	return cartItems.map(cartItem =>
		cartItem.id === selectedCartItem.id
			? { ...cartItem, quantity: cartItem.quantity + Number(sign + 1) }
			: cartItem
	);
};

const removeCartItem = (cartItems, selectedCartItemId) =>
	cartItems.filter(cartItem => cartItem.id !== selectedCartItemId);

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	setCartItems: () => {},
	addItemToCart: () => {},
	handleItemQuantityFromCart: () => {},
	removeItemFromCart: () => {},
	cartTotal: 0,
	cartCount: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);

	useEffect(() => {
		const cartItemsQuantity = () => {
			return cartItems.reduce(
				(total, cartItem) => total + cartItem.quantity,
				0
			);
		};

		setCartCount(cartItemsQuantity);
	}, [cartItems]);

	useEffect(() => {
		const shoppingCartTotal = () => {
			return cartItems.reduce((total, cartItem) => {
				const { price, quantity } = cartItem;
				return total + price * quantity;
			}, 0);
		};

		setCartTotal(shoppingCartTotal);
	}, [cartItems]);

	const addItemToCart = productToAdd => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	const handleItemQuantityFromCart = (selectedCartItem, sign) => {
		setCartItems(handleQuantityCartItem(cartItems, selectedCartItem, sign));
	};
	const removeItemFromCart = selectedCartItem => {
		setCartItems(removeCartItem(cartItems, selectedCartItem));
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		handleItemQuantityFromCart,
		removeItemFromCart,
		cartTotal,
		cartItems,
		setCartItems,
		cartCount,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
