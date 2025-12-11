'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PiInfo } from 'react-icons/pi';
import { slugify } from '@/lib/product-data';
import productImg from '../../../../../public/assets/images/pre-cast.webp';

const ProductCard = ({ product, categorySlug, subcategorySlug }) => {
	// Generate product slug from product name
	const productName = product.name || product.title || product.type || product.section || 'Product';
	const productSlug = product.slug || slugify(productName);
	
	// Build the product detail page URL
	const productUrl = `/products/${categorySlug}/${subcategorySlug}/${productSlug}`;

	return (
		<Link
			href={productUrl}
			className="bg-[#f0f0f0] rounded-[4px] sm:rounded-[3.38px] flex flex-col gap-3 sm:gap-[12px] p-0 sm:pb-[10.139px]"
		>
			{/* Image */}
			<div className="border-[0.5px] sm:border-[1.69px] border-[rgba(25,65,124,0.3)] sm:border-[#f0f0f0] h-[220px] sm:h-[170px] md:h-[216px] relative rounded-[4px] sm:rounded-[3.38px] overflow-hidden">
				<div className="absolute inset-0 bg-white rounded-[4px] sm:rounded-[3.38px]">
					<Image
						src={product.image || productImg}
						alt={product.title || productName}
						fill
						className="object-contain p-2"
					/>
				</div>
			</div>

			{/* Title with Info Icon */}
			<div className="flex gap-3 sm:gap-[12px] items-center px-[6.759px] sm:px-[6.759px]">
				<p className="flex-1 font-primary font-bold text-[14px] sm:text-[14px] md:text-[16px] text-black">
					{product.title || productName}
				</p>
				<PiInfo className="w-[14px] h-[14px] sm:w-[14px] sm:h-[14px] md:w-4 md:h-4 text-black flex-shrink-0" />
			</div>
		</Link>
	);
};

export default ProductCard;

