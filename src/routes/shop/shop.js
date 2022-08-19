import { useContext } from 'react';
import { ProductsContext } from '../../contexts/products.context';
import ProductCard from '../../components/product-card/product-card';

import './shop.scss';

const Shop = () => {
	const { products } = useContext(ProductsContext);

	return (
		<div>
			<div className="products-container">
				{products.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default Shop;
