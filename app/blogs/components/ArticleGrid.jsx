'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import articleImg from '../../../public/assets/images/article.webp';

const ARTICLES = [
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
	{
		id: 4,
		image: articleImg,
		category: 'NEWS',
		date: '10th July 2025',
		title: 'Trade without limits: How the UAE is setting new global standards',
	},
	{
		id: 5,
		image: articleImg,
		category: 'NEWS',
		date: '10th July 2025',
		title: 'Trade without limits: How the UAE is setting new global standards',
	},
	{
		id: 6,
		image: articleImg,
		category: 'NEWS',
		date: '10th July 2025',
		title: 'Trade without limits: How the UAE is setting new global standards',
	},
];

const ArticleCard = ({ article }) => {
	return (
		<Link href={`/blogs/${article.id}`} className="flex flex-col">
			{/* Image - Mobile: 156px, Tablet/Desktop: 232px */}
			<div className="relative w-full h-[156px] sm:h-[232px] rounded-[4px] overflow-hidden">
				<Image
					src={article.image}
					alt={article.title}
					fill
					className="object-cover rounded-[4px]"
				/>
			</div>

			{/* Content */}
			<div className="flex flex-col gap-3 sm:gap-5 py-4 sm:py-6 px-0">
				{/* Metadata - Mobile: 11px, Desktop: 12px */}
				<div className="flex justify-between items-center text-[11px] sm:text-[12px] text-[#1e1e1e] border-b border-[#1e1e1e] border-opacity-100 pb-[6px] sm:pb-[10px]">
					<span className="font-primary font-normal uppercase">
						{article.category}
					</span>
					<span className="font-primary font-normal">{article.date}</span>
				</div>

				{/* Title - Mobile: 18px, Desktop: 20px */}
				<h3 className="text-[18px] sm:text-[20px] font-primary font-bold text-[#1e1e1e] leading-[1.4] sm:leading-[1.2]">
					{article.title}
				</h3>

			{/* Read More Link - Mobile: hidden, Desktop: 12px */}
			<span className="hidden sm:inline-block text-[12px] text-[#0e2143] underline font-primary font-normal w-fit">
				Read more
			</span>
			</div>
		</Link>
	);
};

const ArticleGrid = ({ selectedCategory }) => {
	// Filter articles based on selected category
	const filteredArticles =
		selectedCategory === 'All'
			? ARTICLES
			: ARTICLES.filter(
					(article) =>
						article.category.toLowerCase() === selectedCategory.toLowerCase()
			  );

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 lg:gap-[64px]">
			{filteredArticles.map((article) => (
				<ArticleCard key={article.id} article={article} />
			))}
		</div>
	);
};

export default ArticleGrid;

