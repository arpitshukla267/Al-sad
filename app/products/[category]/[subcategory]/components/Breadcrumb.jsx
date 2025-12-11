'use client';

import React from 'react';
import Link from 'next/link';

const Breadcrumb = ({ items }) => {
	return (
		<nav className="mb-4 sm:mb-6">
			<div className="flex items-center gap-2 text-[15px] sm:text-[15px] md:text-[19px] font-primary text-[#1e1e1e]">
				{items.map((item, index) => (
					<React.Fragment key={index}>
						{index > 0 && <span className="mx-1">&gt;</span>}
						{index === items.length - 1 ? (
							<span className="font-normal">{item.name}</span>
						) : (
							<Link href={item.path} className="font-normal hover:underline">
								{item.name}
							</Link>
						)}
					</React.Fragment>
				))}
			</div>
		</nav>
	);
};

export default Breadcrumb;

