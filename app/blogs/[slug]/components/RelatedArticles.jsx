'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import articleImg from '../../../../public/assets/images/article.webp';

const RELATED_ARTICLES = [
	{
		id: 1,
		image: articleImg,
		category: 'NEWS',
		date: '10th July 2025',
		title: 'Trade without limits: How the UAE is setting new global standards',
	},
	{
		id: 2,
		image: articleImg,
		category: 'NEWS',
		date: '10th July 2025',
		title: 'Trade without limits: How the UAE is setting new global standards',
	},
	{
		id: 3,
		image: articleImg,
		category: 'NEWS',
		date: '10th July 2025',
		title: 'Trade without limits: How the UAE is setting new global standards',
	},
];

const RelatedArticleCard = ({ article }) => {
	return (
		<Link href={`/blogs/${article.id}`} className="flex flex-col">
			{/* Image */}
			<div className="relative w-full h-[156px] sm:h-[232px] rounded-[4px] overflow-hidden">
				<Image
					src={article.image}
					alt={article.title}
					fill
					className="object-cover rounded-[4px]"
				/>
			</div>

			{/* Content */}
			<div className="flex flex-col gap-4 sm:gap-5 py-4 sm:py-6 px-0">
				{/* Metadata */}
				<div className="flex justify-between items-center text-[11px] sm:text-[12px] text-white border-b border-white border-opacity-30 pb-[10px]">
					<span className="font-primary font-normal uppercase">
						{article.category}
					</span>
					<span className="font-primary font-normal text-[#1e1e1e]">
						{article.date}
					</span>
				</div>

				{/* Title */}
				<h3 className="text-[18px] sm:text-[20px] font-primary font-bold text-white leading-[1.2]">
					{article.title}
				</h3>

				{/* Read More Link */}
				<span className="text-[12px] text-white underline font-primary font-normal inline-block w-fit">
					Read more
				</span>
			</div>
		</Link>
	);
};

const RelatedArticles = () => {
	return (
		<div className="bg-primary w-full py-12 sm:py-16 md:py-20 lg:py-[92px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
			<div className="max-w-7xl mx-auto">
				<h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-secondary font-semibold text-white capitalize mb-8 sm:mb-10 md:mb-11">
					Related Articles
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12 lg:gap-[72px]">
					{RELATED_ARTICLES.map((article) => (
						<RelatedArticleCard key={article.id} article={article} />
					))}
				</div>
			</div>
		</div>
	);
};

export default RelatedArticles;

