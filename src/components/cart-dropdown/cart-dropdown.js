import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../../components/cart-item/cart-item';
import Button from '../button/button';

import './cart-dropdown.scss';

const CartDropdown = () => {
	const { cartItems, setIsCartOpen } = useContext(CartContext);

	const navigate = useNavigate();

	const goToCheckOut = () => {
		navigate('/checkout');
	};

	const closeCartModal = () => {
		setIsCartOpen(false);
	};

	return (
		<div className="cart-dropdown-container">
			<div className="cart-btn-close" onClick={closeCartModal}>
				&#10005;
			</div>
			<div className="cart-items">
				{cartItems.length ? (
					cartItems.map(cartItem => (
						<CartItem key={cartItem.id} cartItem={cartItem} />
					))
				) : (
					<span className="empty-message">Your cart is empty</span>
				)}
			</div>

			<Button onClick={goToCheckOut} btnText="CHECKOUT" />
		</div>
	);
};

export default CartDropdown;
