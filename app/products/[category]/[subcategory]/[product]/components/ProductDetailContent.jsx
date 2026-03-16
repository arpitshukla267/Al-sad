'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import EnquireButton from './EnquireButton';
import BrandTable from './BrandTable';

const ProductDetailContent = ({
	product,
	categoryName,
	subcategoryName,
	backUrl,
	backLabel,
}) => {
	const productName =
		product.name || product.type || product.productType || product.section || 'Product';
	const productImage = product.image || '/assets/images/pre-cast.webp';
	const shortDescription =
		product.commonUse || product.type || product.rootCategory || '';
	const longDescription =
		product.description ||
		product.commonUse ||
		product.details ||
		`${productName} from ${categoryName} - ${subcategoryName}.`;

	const hasBrandsOrSpecs =
		(product.brands && product.brands.length > 0) ||
		(product.specifications && product.specifications.length > 0);

	return (
		<div className="mt-6">
			{/* Back link + Product title (reference: "< CONCEALED CABINET HINGE") */}
			<div className="flex items-center gap-2 mb-6 sm:mb-8">
				{backUrl && (
					<Link
						href={backUrl}
						className="flex items-center gap-1 text-[#1e1e1e] hover:opacity-80 font-primary text-[15px] sm:text-[19px]"
						aria-label={`Back to ${backLabel || 'products'}`}
					>
						<ChevronLeft className="w-6 h-6 flex-shrink-0" />
						<span className="hidden sm:inline">{backLabel || 'Back'}</span>
					</Link>
				)}
				<h1 className="text-[28px] sm:text-[33px] md:text-[42px] lg:text-[49px] font-primary font-bold text-[#1e1e1e] uppercase truncate min-w-0">
					{productName}
				</h1>
			</div>

			{/* Two columns: Image + short desc | Long description + Enquire */}
			<div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
				{/* Left: Product image + short description below */}
				<div className="w-full lg:w-[567px] flex-shrink-0">
					<div className="border border-[rgba(25,65,124,0.3)] rounded-[4px] overflow-hidden bg-white aspect-[567/417] relative">
						<Image
							src={productImage}
							alt={productName}
							fill
							className="object-contain p-4"
						/>
					</div>
					{shortDescription && (
						<p className="mt-3 text-[15px] sm:text-[17px] font-primary font-medium text-[#1e1e1e]">
							{shortDescription}
						</p>
					)}
				</div>

				{/* Right: Long description + Enquire now */}
				<div className="flex-1 flex flex-col">
					<p className="text-[15px] sm:text-[17px] md:text-[19px] font-primary font-normal text-[#1e1e1e] leading-relaxed mb-6">
						{longDescription}
					</p>
					<div className="mb-8">
						<EnquireButton productName={productName} />
					</div>
				</div>
			</div>

			{/* Brand tabs + Specification table */}
			{hasBrandsOrSpecs && (
				<div className="mt-10 pt-8 border-t border-[rgba(25,65,124,0.2)]">
					<BrandTable product={product} />
				</div>
			)}
		</div>
	);
};

export default ProductDetailContent;
