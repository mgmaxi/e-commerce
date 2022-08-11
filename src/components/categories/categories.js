import React, { useState } from 'react';
import CategoryItem from '../category-item/category-item';
import './categories.scss';

const Categories = () => {
	const [categories, setCategories] = useState([
		{
			id: 1,
			title: 'hats',
			imageUrl:
				'https://images.pexels.com/photos/704857/pexels-photo-704857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		},
		{
			id: 2,
			title: 'jackets',
			imageUrl:
				'https://images.pexels.com/photos/7679725/pexels-photo-7679725.jpeg?auto=compress&cs=tinysrgb&w=1600',
		},
		{
			id: 3,
			title: 'sneakers',
			imageUrl:
				'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		},
		{
			id: 4,
			title: 'womens',
			imageUrl:
				'https://images.pexels.com/photos/5328401/pexels-photo-5328401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		},
		{
			id: 5,
			title: 'mens',
			imageUrl:
				'https://images.pexels.com/photos/6227715/pexels-photo-6227715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		},
	]);
	return (
		<div className="categories-container">
			{categories.map(category => (
				<CategoryItem key={category.id} category={category} />
			))}
		</div>
	);
};

export default Categories;
