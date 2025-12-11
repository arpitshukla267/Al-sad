'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';
import EnquireButton from './EnquireButton';
import BrandTable from './BrandTable';

const ProductDetailContent = ({ product, categoryName, subcategoryName }) => {
	const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

	const productName = product.name || product.type || product.section || 'Product';
	const productImage = product.image || '/assets/images/pre-cast.webp';
	const productDescription =
		product.commonUse ||
		product.description ||
		product.details ||
		`${productName} from ${categoryName} - ${subcategoryName}.`;

	// Determine if description should be truncated
	const shouldTruncate = productDescription.length > 200;
	const truncatedDescription = shouldTruncate
		? productDescription.substring(0, 200) + '...'
		: productDescription;

	return (
		<div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-6">
			{/* Product Image */}
			<div className="w-full lg:w-[567px] flex-shrink-0">
				<div className="border border-[rgba(25,65,124,0.3)] rounded-[4px] sm:rounded-[3.38px] overflow-hidden bg-white aspect-[567/417] relative">
					<Image
						src={productImage}
						alt={productName}
						fill
						className="object-contain p-4"
					/>
				</div>
			</div>

			{/* Product Details */}
			<div className="flex-1 flex flex-col">
				{/* Product Title with Dropdown */}
				<div className="mb-6">
					<button
						onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
						className="flex items-center justify-between w-full text-left"
					>
						<h1 className="text-[33px] sm:text-[33px] md:text-[49px] lg:text-[55px] font-primary font-bold text-[#1e1e1e] uppercase pr-4">
							{productName}
						</h1>
						{shouldTruncate && (
							<div className="flex-shrink-0">
								{isDescriptionExpanded ? (
									<ChevronUp className="w-6 h-6 text-[#1e1e1e]" />
								) : (
									<ChevronDown className="w-6 h-6 text-[#1e1e1e]" />
								)}
							</div>
						)}
					</button>
				</div>

				{/* Product Description */}
				<div className="mb-6">
					<p className="text-[15px] sm:text-[15px] md:text-[19px] font-primary font-normal text-[#1e1e1e] leading-relaxed">
						{isDescriptionExpanded || !shouldTruncate
							? productDescription
							: truncatedDescription}
					</p>
				</div>

				{/* Enquire Now Button */}
				<div className="mb-8">
					<EnquireButton productName={productName} />
				</div>

				{/* Brand Table - Show if product has brand information */}
				{(product.brand || product.brands || product.specifications) && (
					<div className="mt-auto">
						<BrandTable product={product} />
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductDetailContent;

