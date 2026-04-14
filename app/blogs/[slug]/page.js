'use client';

import React from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import BlogHero from './components/BlogHero';
import BlogContent from './components/BlogContent';
import RelatedArticles from './components/RelatedArticles';
import Link from 'next/link';

import { ARTICLES } from '../../../lib/blogData';

const BlogPostPage = ({ params }) => {
	const unwrappedParams = React.use(params);
	const blogId = parseInt(unwrappedParams.slug);
	const blogPost = ARTICLES.find(post => post.id === blogId);

	if (!blogPost) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen">
				<h1 className="text-2xl font-bold">Article not found</h1>
				<Link href="/blogs" className="mt-4 text-blue-600 underline">Back to Blogs</Link>
			</div>
		);
	}

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
					<RelatedArticles currentId={blogPost.id} />
				</div>
			</main>
		</div>
	);
};

export default BlogPostPage;

