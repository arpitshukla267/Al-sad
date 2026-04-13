'use client';

import React, { useState } from 'react';

const CATEGORIES = ['All', 'News', 'Insight', 'Sustainability'];

const CategoryFilters = ({ onCategoryChange }) => {
	const [activeCategory, setActiveCategory] = useState('All');

	const handleCategoryClick = (category) => {
		setActiveCategory(category);
		if (onCategoryChange) {
			onCategoryChange(category);
		}
	};

	return (
		<></>
		// <div className="flex gap-2 sm:gap-2 border-b border-[#1e1e1e] border-opacity-100 mb-8 sm:mb-12 overflow-x-auto scrollbar-hide">
		// 	{CATEGORIES.map((category) => {
		// 		const isActive = activeCategory === category;
		// 		return (
		// 			<button
		// 				key={category}
		// 				onClick={() => handleCategoryClick(category)}
		// 				className={`font-primary text-[13px] sm:text-[16px] md:text-[18px] pb-2 sm:pb-3 md:pb-4 pt-0 px-4 sm:px-[18px] transition-all whitespace-nowrap flex-shrink-0 ${
		// 					isActive
		// 						? 'text-black font-extrabold capitalize border-b-[2px] sm:border-b-[3px] border-[#1e1e1e]'
		// 						: 'text-black font-normal border-b-[0.3px] sm:border-b-[0.5px] border-[#1e1e1e]'
		// 				}`}
		// 			>
		// 				{category}
		// 			</button>
		// 		);
		// 	})}
		// </div>
	);
};

export default CategoryFilters;

