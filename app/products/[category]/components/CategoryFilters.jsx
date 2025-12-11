'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CategoryFilters = ({ subcategories = [] }) => {
	const pathname = usePathname();
	const [activeCategory, setActiveCategory] = useState('');

	// Set active category based on current path
	useEffect(() => {
		if (subcategories.length > 0) {
			// Extract subcategory from pathname
			const pathParts = pathname.split('/');
			const currentSubcategory = pathParts[pathParts.length - 1];
			
			// Find matching subcategory
			const matchingSubcat = subcategories.find((subcat) => {
				const subcatSlug = subcat.path.split('/').pop();
				return subcatSlug === currentSubcategory;
			});

			if (matchingSubcat) {
				setActiveCategory(matchingSubcat.name);
			} else if (subcategories.length > 0) {
				// Default to first subcategory if on category page
				setActiveCategory(subcategories[0].name);
			}
		}
	}, [pathname, subcategories]);

	if (!subcategories || subcategories.length === 0) {
		return null;
	}

	return (
		<div className="flex flex-wrap gap-2 sm:gap-2 md:gap-2 mb-6 sm:mb-8 md:mb-10">
			{subcategories.map((subcategory) => {
				const isActive = activeCategory === subcategory.name;
				return (
					<Link
						key={subcategory.path}
						href={subcategory.path}
						onClick={() => setActiveCategory(subcategory.name)}
						className={`px-[18px] py-[6px] rounded-[100px] font-primary font-semibold text-[13px] leading-[2] transition-all ${
							isActive
								? 'bg-primary text-white'
								: 'bg-transparent text-[#1e1e1e] border border-[#1e1e1e] hover:bg-gray-50'
						}`}
					>
						{subcategory.name}
					</Link>
				);
			})}
		</div>
	);
};

export default CategoryFilters;

