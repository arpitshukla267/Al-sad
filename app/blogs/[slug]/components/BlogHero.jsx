'use client';

import React from 'react';
import Image from 'next/image';
import blogImg from '../../../../public/assets/images/blog.webp';

const BlogHero = ({ blogPost }) => {
	return (
		<div className="relative w-full h-[323px] sm:h-[417px] md:h-[500px] lg:h-[652px]">
			{/* Background Image with Overlay */}
			<div className="absolute inset-0">
				<Image
					src={blogImg}
					alt={blogPost.title}
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-[rgba(14,33,67,0.25)]" />
			</div>

			{/* Content */}
			<div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 md:px-12 lg:px-[90px] pb-6 sm:pb-8 md:pb-12 lg:pb-[92px]">
				<div className="max-w-7xl mx-auto flex flex-col gap-4 sm:gap-6 md:gap-7">
					<h1 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[40px] font-secondary font-semibold text-white capitalize leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] max-w-[846px]">
						{blogPost.title}
					</h1>
					<div className="flex items-center gap-3 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
						<p className="text-[14px] sm:text-[15px] md:text-[16px] font-secondary font-medium text-white">
							{blogPost.category} . {blogPost.date} . {blogPost.readTime}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogHero;

