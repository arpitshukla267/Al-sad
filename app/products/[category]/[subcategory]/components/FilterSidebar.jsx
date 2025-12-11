'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { buildFilters, getFilterConfig } from '@/lib/filter-config';

const FilterSidebar = ({
	onFilterChange,
	activeFilters,
	category,
	subcategory,
	products = [],
	subcategoryData = null,
}) => {
	const [selectedFilters, setSelectedFilters] = useState([]);

	// Build dynamic filters from product data
	const filterSections = useMemo(() => {
		if (!category || !subcategory) {
			return [];
		}

		// For Professional Tools & Gear, use subcategoryData structure
		// For Structural Materials, use flattened products
		const dataToUse = subcategoryData?.productTypes ? subcategoryData : { products };
		
		// Pass subcategory name (string) to getFilterConfig
		const subcategoryName = typeof subcategory === 'object' && subcategory?.name 
			? subcategory.name 
			: String(subcategory || '');
		
		const filters = buildFilters(dataToUse, category, subcategoryName);
		
		return Object.entries(filters).map(([id, filter]) => ({
			id,
			title: filter.title,
			options: filter.options || [],
			type: filter.type || 'checkbox',
		}));
	}, [category, subcategory, products, subcategoryData]);

	// Initialize expanded sections state
	const [expandedSections, setExpandedSections] = useState(() => {
		const initial = {};
		filterSections.forEach((section) => {
			initial[section.id] = true;
		});
		return initial;
	});

	// Update expanded sections when filter sections change
	useEffect(() => {
		const newExpanded = {};
		filterSections.forEach((section) => {
			newExpanded[section.id] = expandedSections[section.id] ?? true;
		});
		setExpandedSections(newExpanded);
	}, [filterSections]);

	const toggleSection = (sectionId) => {
		setExpandedSections((prev) => ({
			...prev,
			[sectionId]: !prev[sectionId],
		}));
	};

	const handleFilterToggle = (sectionId, option) => {
		const filterId = `${sectionId}-${option}`;
		setSelectedFilters((prev) => {
			const isSelected = prev.some((f) => f.id === filterId);
			const newFilters = isSelected
				? prev.filter((f) => f.id !== filterId)
				: [
						...prev,
						{
							id: filterId,
							section: sectionId,
							label: option,
						},
				  ];
			onFilterChange(newFilters);
			return newFilters;
		});
	};

	const handleClearAll = () => {
		setSelectedFilters([]);
		onFilterChange([]);
	};

	return (
		<div className="bg-[#e0e9f5] rounded-[12px] p-5 flex flex-col gap-7">
			{/* Header */}
			<div className="flex items-center justify-between pb-3 border-b border-[#19417c]">
				<h3 className="font-primary font-bold text-[18px] text-[#1e1e1e] tracking-[0.18px]">
					Filters
				</h3>
				<button
					onClick={handleClearAll}
					className="font-primary font-normal text-[12px] text-[#1e1e1e] hover:underline"
				>
					Clear all
				</button>
			</div>

			{/* Filter Sections */}
			{filterSections.length === 0 ? (
				<div className="text-sm text-gray-500 text-center py-4">
					No filters available
				</div>
			) : (
				filterSections.map((section) => (
				<div
					key={section.id}
					className="border-b border-[#1e1e1e] border-opacity-30 pb-6 last:border-0 last:pb-0"
				>
					<button
						onClick={() => toggleSection(section.id)}
						className="flex items-center justify-between w-full mb-5"
					>
						<h4 className="font-primary font-bold text-[16px] text-[#1e1e1e]">
							{section.title}
						</h4>
						{expandedSections[section.id] ? (
							<MdOutlineKeyboardArrowUp className="w-[18px] h-[18px] text-[#1e1e1e]" />
						) : (
							<MdOutlineKeyboardArrowDown className="w-[18px] h-[18px] text-[#1e1e1e]" />
						)}
					</button>

					{expandedSections[section.id] && (
						<div className="flex flex-col gap-4 pl-1">
							{section.options.map((option) => {
								const filterId = `${section.id}-${option}`;
								const isSelected = selectedFilters.some(
									(f) => f.id === filterId
								);
								return (
									<label
										key={option}
										className="flex items-center gap-[10px] cursor-pointer"
									>
										<input
											type="checkbox"
											checked={isSelected}
											onChange={() =>
												handleFilterToggle(section.id, option)
											}
											className="w-[14px] h-[14px] rounded-[1.556px] border-[1.2px] border-[rgba(29,65,122,0.6)] cursor-pointer"
										/>
										<span className="font-primary font-medium text-[14px] text-[#1e1e1e]">
											{option}
										</span>
									</label>
								);
							})}
						</div>
					)}
				</div>
			)))}
		</div>
	);
};

export default FilterSidebar;

