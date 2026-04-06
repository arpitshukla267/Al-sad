'use client';

import React from 'react';
import Layer1Card from './Layer1Card';
import { getSubcategorySlug } from '@/lib/product-data';

const ProductGrid = ({ subcategories = [] }) => {
	if (!subcategories || subcategories.length === 0) {
		return (
			<div className="text-center py-8 text-gray-500">
				Coming Soon
			</div>
		);
	}

	return (
		<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-[32px]">
			{subcategories.map((subcat, index) => {
				const slug = subcat.path.split('/').pop();
				return (
					<Layer1Card
						key={index}
						product={{
							id: index,
							title: subcat.name,
							category: subcat.path.split('/')[2],
							slug: slug,
							path: subcat.path,
						}}
					/>
				);
			})}
		</div>
	);
};

export default ProductGrid;

