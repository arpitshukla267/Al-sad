'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ARTICLES } from '../../../lib/blogData';

const FeaturedArticle = () => {
	const featured = ARTICLES[0];
	
	if (!featured) return null;

	return (
		<div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-[48px] mb-12 sm:mb-16">
			{/* Mobile/Tablet: Image First, Desktop: Text First */}
			<div className="order-2 lg:order-1 flex flex-col justify-center space-y-3 lg:space-y-0">
				{/* Mobile shows "LATEST NEWS", Desktop shows "NEWS . June 10th" */}
				<div className="flex flex-col gap-3">
					<p className="text-[14px] text-black font-primary hidden lg:block uppercase">
						{featured.category} . {featured.date}
					</p>
					<div className="flex justify-between items-center text-[13px] text-black font-primary lg:hidden">
						<span className="uppercase">{featured.category}</span>
						<span>{featured.date}</span>
					</div>
				</div>
				<div className="flex flex-col gap-4 lg:gap-10 mt-4 lg:mt-0">
					<h2 className="text-[24px] sm:text-[32px] lg:text-[40px] font-primary font-bold text-[#0e2143] leading-[140%] line-clamp-3">
						{featured.title}
					</h2>
				<Link
					href={`/blogs/${featured.id}`}
					className="text-[16px] lg:text-[18px] text-[#0e2143] underline font-primary font-normal inline-block w-fit"
				>
					Read more
				</Link>
				</div>
			</div>

			{/* Image */}
			<div className="order-1 lg:order-2 relative w-full h-[372px] sm:h-[463px] lg:h-[463px] rounded-[4px]">
				<Image
					src={featured.image}
					alt={featured.title}
					fill
					className="object-cover rounded-[4px]"
					priority
				/>
			</div>
		</div>
	);
};

export default FeaturedArticle;

