'use client';

import React from 'react';
import Link from 'next/link';

const EnquireButton = ({ productName }) => {
	return (
		<Link
			href="/contact-us"
			className="inline-block bg-[#19417C] hover:bg-[#15315f] text-white font-primary font-semibold text-[15px] sm:text-[15px] md:text-[19px] px-8 py-3 rounded transition-colors duration-200"
		>
			Enquire now
		</Link>
	);
};

export default EnquireButton;

