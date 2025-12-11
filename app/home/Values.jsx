import React from 'react';
import { GrCodeSandbox } from 'react-icons/gr';
import { BiLeaf } from 'react-icons/bi';
import { BiUniversalAccess } from 'react-icons/bi';

const VALUES = [
	{
		id: 'integrity',
		icon: <BiUniversalAccess className="size-7 md:size-8" />,
		heading: 'Integrity',
		description:
			'We believe in honest business practices and lasting relationships.',
	},
	{
		id: 'innovation',
		icon: <GrCodeSandbox className="size-7 md:size-8" />,
		heading: 'Innovation',
		description:
			'We adapt to market needs, offering products and services that meet tomorrow’s demands.',
	},
	{
		id: 'sustainability',
		icon: <BiLeaf className="size-7 md:size-8" />,
		heading: 'Sustainability',
		description:
			'We promote eco-friendly products and responsible business practices to protect our environment for future generations.',
	},
];

const Value = ({ icon, heading, description }) => {
	return (
		<div className="flex flex-col gap-2 md:gap-7">
			<div className="flex gap-3 items-center">
				{icon}
				<h5 className="font-primary font-bold text-md md:text-[32px]">
					{heading}
				</h5>
			</div>
			<p className="text-sm md:text-xl">{description}</p>
		</div>
	);
};

const Values = () => {
	return (
		<section className="w-full py-10 px-4 md:p-[85px] md:pb-16">
			<div className="mx-auto max-w-[1260px] space-y-8 md:space-y-[159px]">
			<h3 className="font-primary font-bold text-xl md:text-4xl">
				What we stand for
			</h3>
			<div className="grid md:grid-flow-col auto-cols-auto gap-7 md:gap-23 w-full">
				{VALUES.map((value) => (
					<Value
						key={value.id}
						icon={value.icon}
						heading={value.heading}
						description={value.description}
					/>
				))}
				</div>
			</div>
		</section>
	);
};

export default Values;
