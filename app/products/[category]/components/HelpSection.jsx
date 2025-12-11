'use client';

import React from 'react';

const HelpSection = () => {
	return (
		<div className="bg-white w-full py-10 sm:py-12 md:py-14 lg:py-[40px]">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-[86px] lg:px-[80px] xl:px-[160px]">
				<div className="text-center">
					<h2 className="text-[27px] sm:text-[27px] md:text-[44px] font-primary font-normal text-[#1e1e1e] mb-4 sm:mb-6">
						Can't find what you're looking for?
					</h2>
					<p className="text-[22px] sm:text-[22px] md:text-[22px] font-primary font-normal text-[#1e1e1e]">
						Give us a call at{' '}
						<a
							href="tel:+97142324259"
							className="text-primary underline hover:no-underline"
						>
							+971 4 2324259
						</a>{' '}
						so we can help you find exactly what you require!
					</p>
				</div>
			</div>
		</div>
	);
};

export default HelpSection;

