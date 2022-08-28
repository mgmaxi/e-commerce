import React from 'react';
import { Link } from 'react-router-dom';
import './category-item.scss';

const CategoryItem = ({ category }) => {
	const { title, imageUrl } = category;
	return (
		<Link to={`/shop/${title}`} className="category-item-container">
			<div
				className="background-image"
				style={{
					backgroundImage: `url(${imageUrl})`,
				}}
			/>
			<div className="body">
				<h2>{title}</h2>
				<p>Shop Now</p>
			</div>
		</Link>
	);
};

export default CategoryItem;
