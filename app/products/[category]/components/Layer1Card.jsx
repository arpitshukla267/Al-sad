'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import productImg from '../../../../public/assets/images/pre-cast.webp';

const Layer1Card = ({ product }) => {
	// Use product.path if available, otherwise construct from slug
	const href = product.path || `/products/${product.category}/${product.slug}`;
	
	return (
		<Link
			href={href}
			className="bg-[#e0e9f5] rounded-[4px] overflow-hidden relative h-[174.5px] sm:h-[174.5px] md:h-[206px] lg:h-[253px]"
		>
			{/* Image with gradient overlay */}
			<div className="absolute inset-0">
				<Image
					src={product.image || productImg}
					alt={product.title}
					fill
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-[48.077%] from-transparent to-[93.269%] to-black/20" />
			</div>

			{/* Content - Desktop/Tablet */}
			<div className="absolute bottom-0 left-0 right-0 p-5 hidden md:block">
				<p className="font-primary font-bold text-[20px] md:text-[20px] lg:text-[24px] text-white mb-4">
					{product.title}
				</p>
				<span className="inline-block bg-[#04724d] px-4 py-[10px] rounded-[35px] text-white font-primary font-medium text-[14px]">
					View all
				</span>
			</div>

			{/* Content - Mobile */}
			<div className="absolute bottom-0 left-0 right-0 p-3 md:hidden">
				<p className="font-primary font-bold text-[20px] text-white">
					{product.title}
				</p>
			</div>
		</Link>
	);
};

export default Layer1Card;

