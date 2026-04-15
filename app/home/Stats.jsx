import React from 'react';

const STATS = [
	{
		id: 1,
		value: '95%',
		description: 'On-Time Delivery',
		bg: 'bg-[#19417C]',
	},
	{ 
		id: 2, 
		value: '10,000+ sq.ft.', 
		description: 'Warehouse Capacity', 
		bg: 'bg-[#04724D]' 
	},
	{
		id: 3,
		value: '<2%',
		description: 'Material Wastage',
		bg: 'bg-[#19417C]',
	},
];

const Stat = ({ bg, stat, description }) => {
	return (
		<div
			className={`flex flex-col items-center py-6 px-3 md:py-26 md:px-13 flex-1 h-full ${bg}`}
		>
			<h2 className="font-primary text-[32px] md:text-[84px] font-bold text-nowrap">
				{stat}
			</h2>
			<p className="font-secondary text-sm md:text-2xl font-normal text-center">
				{description}
			</p>
		</div>
	);
};

const Stats = () => {
	return (
		<section className="flex items-center justify-stretch h-[161px] md:h-[374px]">
			{STATS.map((stat) => (
				<Stat
					key={stat.id}
					bg={stat.bg}
					stat={stat.value}
					description={stat.description}
				/>
			))}
		</section>
	);
};

export default Stats;
