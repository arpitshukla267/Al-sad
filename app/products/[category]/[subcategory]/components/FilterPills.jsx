'use client';

import React from 'react';
import { X } from 'lucide-react';

const FilterPills = ({ filters, onRemove, onClearAll }) => {
	const handleRemove = (filterId) => {
		onRemove(filters.filter((f) => f.id !== filterId));
	};

	return (
		<div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
			{filters.map((filter) => (
				<div
					key={filter.id}
					className="bg-white border border-[#04724d] rounded-[50px] px-[14px] py-[8px] flex items-center gap-2"
				>
					<span className="font-secondary font-medium text-[12px] text-black">
						{filter.label}
					</span>
					<button
						onClick={() => handleRemove(filter.id)}
						className="text-[#04724d] hover:text-primary"
					>
						<X className="w-3 h-3" />
					</button>
				</div>
			))}
			{onClearAll && (
				<button
					onClick={onClearAll}
					className="text-[#1e1e1e] font-primary font-normal text-[12px] underline hover:no-underline"
				>
					Clear all
				</button>
			)}
		</div>
	);
};

export default FilterPills;

