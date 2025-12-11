'use client';

import React from 'react';
import Image from 'next/image';
import blogImg from '../../../../public/assets/images/blog.webp';

const BlogContent = ({ content, author }) => {
	return (
		<div className="flex justify-center">
			<div className="w-full max-w-[361px] sm:max-w-[668px] md:max-w-[759px] lg:max-w-[924px] flex flex-col gap-8 sm:gap-10 md:gap-11 lg:gap-[44px]">
				{content.map((item, index) => {
					if (item.type === 'paragraph') {
						return (
							<p
								key={index}
								className="text-[16px] sm:text-[18px] font-primary font-normal text-[#1e1e1e] leading-[100%]"
							>
								{item.text}
							</p>
						);
					}

					if (item.type === 'heading') {
						return (
							<h2
								key={index}
								className="text-[20px] sm:text-[22px] md:text-[24px] font-primary font-bold text-[#1e1e1e] leading-[100%]"
							>
								{item.text}
							</h2>
						);
					}

					if (item.type === 'image') {
						return (
							<div
								key={index}
								className="relative w-full h-[201px] sm:h-[250px] md:h-[300px] lg:h-[349px] rounded-[4px] overflow-hidden my-4 sm:my-6"
							>
								<Image
									src={item.src || blogImg}
									alt="Blog content image"
									fill
									className="object-cover rounded-[4px]"
								/>
							</div>
						);
					}

					return null;
				})}

				{/* Author */}
				<p className="text-[16px] sm:text-[18px] font-primary font-normal text-[#1e1e1e] mt-4 sm:mt-6">
					{author}
				</p>
			</div>
		</div>
	);
};

export default BlogContent;

