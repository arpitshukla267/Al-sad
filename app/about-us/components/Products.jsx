import React from 'react';
import hinge from '../../../public/assets/images/hinge.webp';
import building from '../../../public/assets/images/building.webp';
import PrimaryBtn from '@/app/shared/Buttons/PrimaryBtn';
import { PiInfo } from 'react-icons/pi';
import Image from 'next/image';

const PRODUCTS = [
	{ id: 1, img: hinge, title: 'W Hinges' },
	{ id: 2, img: hinge, title: 'W Hinges' },
	{ id: 3, img: hinge, title: 'W Hinges' },
	{ id: 4, img: hinge, title: 'W Hinges' },
];

const Products = () => {
	return (
		<div className="h-[712px] w-full relative flex flex-col md:flex-row">
			<div className="relative flex-1 h-[350px] md:h-auto">
				<Image
					src={building}
					alt="Building"
					fill
					className="object-cover"
					priority
				/>

				{/* Overlay */}
				<div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-b from-black/70 via-black/40 to-transparent pointer-events-none" />

				<div className="absolute inset-0 z-20 flex items-end justify-between md:flex-col md:items-start md:justify-start p-4 md:p-8">
					<div className="space-y-1 md:space-y-[10px]">
						<p className="font-secondary text-xs md:text-md text-white">
							Get to know
						</p>
						<h4 className="font-secondary font-semibold text-xl md:text-4xl text-white">
							BAONE
						</h4>
					</div>
					<PrimaryBtn
						title="Know more"
						styles="bg-white text-primary md:mt-2"
					/>
				</div>
			</div>

			{/* Right Side: Products Section */}
			<div className="flex-1 bg-primary-green h-full grid grid-cols-2 grid-rows-2 md:gap-4 w-full md:max-w-fit">
				{PRODUCTS.map((item) => (
					<div
						key={item.id}
						className="flex flex-col items-start w-full gap-4 text-white p-4 md:p-8"
					>
						<div className="relative w-[166px] h-[142px] md:w-[255px] md:h-[252px]">
							<Image
								src={item.img}
								alt={item.title}
								fill
								className="object-cover rounded-sm"
							/>
						</div>
						<div className="flex items-center justify-between w-full">
							<p className="text-md font-medium font-secondary">{item.title}</p>
							<PiInfo />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Products;
