'use client';

import { useRef } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const TESTIMONIALS = [
	{
		id: 1,
		name: 'Imran Sheikh',
		designation: 'Project Manager, Gulf Urban Developers',
		description:
			"Al Sad’s in-house products exceeded our expectations in both quality and price. Their team understood our project needs perfectly, delivered on time, and the materials performed flawlessly. They've become our go-to supplier for every build.",
	},
	{
		id: 2,
		name: 'Priya Nair',
		designation: 'Interior Designer, Studio Forma',
		description:
			'“From customer support to product quality, Al Sad delivers excellence. Their in-house materials matched our specifications exactly, and their knowledge helped us avoid costly delays. We trust them completely for all our hardware and fittings.”',
	},
	{
		id: 3,
		name: 'Mohammed Al Tayer',
		designation: 'Procurement Head, Al Noor Contracting',
		description: `“We’ve worked with many suppliers, but Al Sad stands out. Their own product line is top-notch — durable, consistent, and affordable. Their service is personal and reliable, which makes all the difference on tight timelines.”`,
	},
];

const Testimonial = ({ name, designation, description }) => {
	return (
		<div className="flex flex-col gap-4 items-start text-black max-w-full">
			<p className="text-sm sm:text-md font-secondary text-primary">
				Testimonials
			</p>
			<div>
				<h3 className="text-xl sm:text-4xl text-primary-green font-semibold font-primary">
					{name}
				</h3>
				<p className="text-xs sm:text-sm font-normal">{designation}</p>
			</div>
			<p className="text-sm sm:text-md font-normal">{description}</p>
		</div>
	);
};

const Testimonials = () => {
	const swiperRef = useRef(null);

	return (
		<section className="bg-white w-full h-[323px] p-0 sm:p-20 relative flex items-center justify-center">
			<div className="max-w-[1260px] mx-auto w-full flex items-center gap-1 sm:gap-3">
			<div>
				<MdKeyboardArrowLeft
					className="text-black cursor-pointer"
					size={40}
					onClick={() => swiperRef.current?.slidePrev()}
				/>
			</div>

			<Swiper
				centeredSlides={true}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				}}
				modules={[Autoplay]}
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
				}}
					className="min-w-[291px] sm:max-w-full flex-1"
			>
				{TESTIMONIALS.map((testimonial) => (
					<SwiperSlide key={testimonial.id}>
						<Testimonial
							name={testimonial.name}
							designation={testimonial.designation}
							description={testimonial.description}
						/>
					</SwiperSlide>
				))}
			</Swiper>

			<div>
				<MdKeyboardArrowRight
					className="text-black cursor-pointer"
					size={40}
					onClick={() => swiperRef.current?.slideNext()}
				/>
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
