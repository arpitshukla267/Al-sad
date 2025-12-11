import Link from 'next/link';
import React from 'react';

const FooterList = ({ heading, items }) => {
	return (
		<div className="flex flex-col gap-6">
			<h6 className="font-secondary text-xs text-[#d3d8de]">{heading}</h6>
			<ul className="font-secondary text-sm">
				{items.map((item) => (
					<Link key={item.name} href={item?.path}>
						<li className="py-1.5 text-nowrap">{item.name}</li>
					</Link>
				))}
			</ul>
		</div>
	);
};

export default FooterList;
