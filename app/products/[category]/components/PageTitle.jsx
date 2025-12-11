'use client';

import React from 'react';

const PageTitle = ({ title }) => {
	return (
		<h1 className="text-[33px] sm:text-[33px] md:text-[49px] lg:text-[55px] font-primary font-bold text-[#1e1e1e] mb-6 sm:mb-8 md:mb-10 capitalize">
			{title}
		</h1>
	);
};

export default PageTitle;

