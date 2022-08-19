import React, { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../../components/cart-item/cart-item';
import Button from '../button/button';

import './cart-dropdown.scss';

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);

	return (
		<div className="cart-dropdown-container">
			<div className="cart-items">
				{cartItems.length ? (
					cartItems.map(cartItem => (
						<CartItem key={cartItem.id} cartItem={cartItem} />
					))
				) : (
					<span className="empty-message">Your cart is empty</span>
				)}
			</div>
			<Button btnText="CHECKOUT" />
		</div>
	);
};

export default CartDropdown;
