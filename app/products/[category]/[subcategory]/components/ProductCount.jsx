'use client';

import React from 'react';

const ProductCount = ({ count }) => {
	return (
		<p className="text-[13px] sm:text-[13px] font-primary font-normal text-[#1e1e1e] mb-4 sm:mb-6">
			Showing {count} products
		</p>
	);
};

export default ProductCount;

