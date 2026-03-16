'use client';

import React, { useMemo } from 'react';
import ProductCard from './ProductCard';
import { slugify } from '@/lib/product-data';
import productImg from '../../../../../public/assets/images/pre-cast.webp';

const ProductGrid = ({ products = [], filters = [], categorySlug, subcategorySlug }) => {
	// Apply filters to products
	const filteredProducts = useMemo(() => {
		if (!filters || filters.length === 0) {
			return products;
		}

		return products.filter((product) => {
			return filters.every((filter) => {
				const filterValue = filter.label.toLowerCase();
				const productValue = String(
					product[filter.section] ||
						product.type ||
						product.material ||
						product.finish ||
						product.name ||
						''
				).toLowerCase();

				return productValue.includes(filterValue);
			});
		});
	}, [products, filters]);

	if (!filteredProducts || filteredProducts.length === 0) {
		return (
			<div className="text-center py-8 text-gray-500">
				No products found
			</div>
		);
	}

	return (
		<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4 md:gap-6 lg:gap-[22px]">
			{filteredProducts.map((product, index) => {
				// Handle different product structures
				const productName = product.name || product.type || product.productType || product.section || 'Product';
				const productImage = product.image || productImg;
				const productSlug = slugify(productName);

				return (
					<ProductCard
						key={index}
						product={{
							id: index,
							title: productName,
							image: productImage,
							slug: productSlug,
							...product,
						}}
						categorySlug={categorySlug}
						subcategorySlug={subcategorySlug}
					/>
				);
			})}
		</div>
	);
};

export default ProductGrid;

