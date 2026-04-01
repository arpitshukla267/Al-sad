'use client';

import React from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import BlogHero from './components/BlogHero';
import BlogContent from './components/BlogContent';
import RelatedArticles from './components/RelatedArticles';

const BlogPostPage = ({ params }) => {
	// In a real app, you would fetch the blog post data based on params.slug
	const blogPost = {
		title: 'Trade without limits: How the UAE is setting new global standards',
		category: 'NEWS',
		date: 'June 10th',
		readTime: '4 min read',
		content: [
			{
				type: 'paragraph',
				text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet.',
			},
			{
				type: 'image',
				src: '/assets/images/blog.webp',
			},
			{
				type: 'paragraph',
				text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet.',
			},
			{
				type: 'heading',
				text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna.',
			},
			{
				type: 'paragraph',
				text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.',
			},
			{
				type: 'image',
				src: '/assets/images/blog.webp',
			},
			{
				type: 'paragraph',
				text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet.',
			},
		],
		author: 'Author',
	};

	return (
		<div className="flex flex-col overflow-x-hidden min-h-screen">
			<div className="h-max sm:h-[85px] w-full flex items-center fixed top-0 z-[100]">
				<Header isDarkBackground={true} />
			</div>
			<main className="flex flex-col flex-1 justify-start items-center relative min-h-screen mt-[75px] sm:mt-[85px] overflow-x-hidden">
				<div className="w-full max-w-full mx-auto h-full">
					<BlogHero blogPost={blogPost} />
					<div className="bg-white w-full py-10 sm:py-12 md:py-16 lg:py-20">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-8 xl:px-[170px]">
							<BlogContent content={blogPost.content} author={blogPost.author} />
						</div>
					</div>
					<RelatedArticles />
				</div>
			</main>
		</div>
	);
};

export default BlogPostPage;

