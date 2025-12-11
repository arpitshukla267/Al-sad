'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import productOne from '../../public/assets/images/pre-cast.webp';

import PrimaryBtn from '../shared/Buttons/PrimaryBtn';

const PRODUCTS = [
	{
		id: 1,
		image: productOne,
		title: 'Pre-cast concrete cladding tiles',
		description:
			'Al Sad Building Material L.L.C offers extensive trading and import/export services, sourcing quality materials from trusted global partners.',
		onClick: () => {},
	},
	{
		id: 2,
		image: productOne,
		title: 'Pre-cast concrete cladding tiles',
		description:
			'Al Sad Building Material L.L.C offers extensive trading and import/export services, sourcing quality materials from trusted global partners.',
		onClick: () => {},
	},
	{
		id: 3,
		image: productOne,
		title: 'Pre-cast concrete cladding tiles',
		description:
			'Al Sad Building Material L.L.C offers extensive trading and import/export services, sourcing quality materials from trusted global partners.',
		onClick: () => {},
	},
];

const Product = ({ image, title, description, onClick }) => {
	return (
		<div className="flex sm:items-center gap-8 flex-col sm:flex-row sm:gap-14">
			<Image
				src={image}
				alt={title}
				className="w-full sm:max-w-[585px] object-cover rounded-sm h-[153px] sm:h-[327px]"
			/>

			<div className="w-full sm:max-w-[631px] flex flex-col items-start gap-4">
				<p className="font-secondary text-xs sm:text-sm font-semibold text-[#19417C]">
					NEW LAUNCH
				</p>
				<h3 className="font-semibold text-primary text-xl sm:text-4xl">
					{title}
				</h3>
				<p className="text-sm sm:text-xl text-primary">{description}</p>
				<PrimaryBtn title="Know more" onClick={onClick} />
			</div>
		</div>
	);
};

const Products = () => {
	const swiperRef = useRef(null);
	const paginationRef = useRef(null);
	const [paginationEl, setPaginationEl] = useState(null);
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		if (paginationRef.current) setPaginationEl(paginationRef.current);
	}, []);

	return (
		<section className="bg-white w-full py-10 px-4 sm:p-[85px] md:pb-16 relative">
			<div className="relative group mx-auto w-full max-w-[1260px]">
				{activeIndex > 0 && (
					<div className="absolute top-1/2 left-0 sm:-left-10 transform -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						<MdKeyboardArrowLeft
							className="text-black cursor-pointer"
							size={40}
							onClick={() => swiperRef.current?.slidePrev()}
						/>
					</div>
				)}
				{activeIndex < PRODUCTS.length - 1 && (
					<div className="absolute top-1/2 right-0 sm:-right-10 transform -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						<MdKeyboardArrowRight
							className="text-black cursor-pointer"
							size={40}
							onClick={() => swiperRef.current?.slideNext()}
						/>
					</div>
				)}

				<Swiper
					centeredSlides={true}
					autoplay={{
						delay: 5000,
						disableOnInteraction: true,
					}}
					modules={[Autoplay, Pagination]}
					pagination={{
						el: paginationRef.current,
						clickable: true,
					}}
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
					}}
					onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
					className="h-full w-full"
				>
					{PRODUCTS.map((product) => (
						<SwiperSlide key={product.id}>
							<Product
								image={product?.image}
								title={product?.title}
								description={product?.description}
								onClick={product?.onClick}
							/>
						</SwiperSlide>
					))}
				</Swiper>
				<div
					ref={paginationRef}
					className="sm:flex justify-center mt-8 hidden"
				></div>
			</div>
		</section>
	);
};

export default Products;
