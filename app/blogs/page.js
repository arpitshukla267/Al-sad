'use client';

import React, { useState } from 'react';
import Hero from './components/Hero';
import FeaturedArticle from './components/FeaturedArticle';
import CategoryFilters from './components/CategoryFilters';
import ArticleGrid from './components/ArticleGrid';

const BlogsPage = () => {
	const [selectedCategory, setSelectedCategory] = useState('All');

	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
	};

	return (
		<div className="flex flex-col overflow-x-hidden min-h-screen">
			<main className="flex flex-col flex-1 justify-start items-center relative min-h-screen mt-[63px] md:mt-[83px] overflow-x-hidden">
				<div className="w-full max-w-full mx-auto h-full">
					<Hero />
					<div className="bg-gray-100 w-full py-10 sm:py-16">
						<div className="max-w-7xl mx-auto px-4 md:px-0">
							<FeaturedArticle />
							<CategoryFilters onCategoryChange={handleCategoryChange} />
							<ArticleGrid selectedCategory={selectedCategory} />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default BlogsPage;

