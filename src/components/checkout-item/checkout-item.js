import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.scss';

const CheckoutItem = ({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;

	const { handleItemQuantityFromCart, removeItemFromCart } =
		useContext(CartContext);

	const removeItemHandler = () => removeItemFromCart(cartItem.id);

	const addItemQuantityHandler = () =>
		handleItemQuantityFromCart(cartItem, '+');

	const removeItemQuantityHandler = () =>
		handleItemQuantityFromCart(cartItem, '-');

	return (
		<div className="checkout-item-container">
			<div className="image-container">
				<img src={imageUrl} alt={`${name}`} />
			</div>
			<span className="name"> {name} </span>
			<div className="quantity">
				<div className="arrow" onClick={removeItemQuantityHandler}>
					&#10094;
				</div>
				<span className="value">{quantity}</span>
				<div className="arrow" onClick={addItemQuantityHandler}>
					&#10095;
				</div>
			</div>
			<span className="price"> {price}</span>
			<div className="remove-button" onClick={removeItemHandler}>
				&#10005;
			</div>
		</div>
	);
};

export default CheckoutItem;
