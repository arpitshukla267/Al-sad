'use client';

import React, { useState } from 'react';

const BrandTable = ({ product }) => {
	const brands = product.brands || (product.brand ? [product.brand] : []);
	const specifications = product.specifications || [];
	const seriesModelExamples = product.seriesModelExamples || '';

	const [activeBrandIndex, setActiveBrandIndex] = useState(0);

	if (brands.length === 0 && specifications.length === 0) {
		return null;
	}

	// Build table from specifications array of objects
	const allKeys =
		specifications.length > 0
			? [...new Set(specifications.flatMap((row) => Object.keys(row)))]
			: [];

	return (
		<div className="w-full">
			{/* Brand tabs (reference: Dormakaba | MAB | Geze) */}
			{brands.length > 0 && (
				<div className="flex flex-wrap gap-1 mb-4">
					{brands.map((brand, index) => (
						<button
							key={index}
							type="button"
							onClick={() => setActiveBrandIndex(index)}
							className={`px-4 py-2 rounded font-primary text-[15px] sm:text-[17px] transition-colors ${
								activeBrandIndex === index
									? 'bg-[#19417c] text-white'
									: 'bg-[#f0f0f0] text-[#1e1e1e] hover:bg-[#e0e0e0]'
							}`}
						>
							{typeof brand === 'string' ? brand : brand.name || brand}
						</button>
					))}
				</div>
			)}

			{/* Series / Model examples (from Excel) */}
			{seriesModelExamples && (
				<p className="text-[14px] sm:text-[15px] text-[#1e1e1e] mb-4 font-primary">
					<strong>Series / Model examples:</strong> {seriesModelExamples}
				</p>
			)}

			{/* Specification table */}
			{allKeys.length > 0 && (
				<div className="border border-[rgba(25,65,124,0.3)] rounded-[4px] overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full min-w-[600px]">
							<thead className="bg-[#f0f0f0]">
								<tr>
									{allKeys.map((key) => (
										<th
											key={key}
											className="px-3 py-3 sm:px-4 sm:py-3 text-left font-primary font-semibold text-[13px] sm:text-[15px] md:text-[17px] text-[#1e1e1e] border-b border-[rgba(25,65,124,0.3)] whitespace-nowrap"
										>
											{key}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{specifications.map((row, rowIndex) => (
									<tr
										key={rowIndex}
										className="border-b border-[rgba(25,65,124,0.2)] last:border-b-0"
									>
										{allKeys.map((key) => (
											<td
												key={key}
												className="px-3 py-3 sm:px-4 sm:py-3 font-primary font-normal text-[13px] sm:text-[15px] md:text-[17px] text-[#1e1e1e]"
											>
												{row[key] ?? '–'}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}

			{/* Fallback: single key-value list when no table structure */}
			{brands.length > 0 && allKeys.length === 0 && !seriesModelExamples && (
				<p className="text-[15px] text-[#1e1e1e] font-primary">
					Available brands: {brands.join(', ')}
				</p>
			)}
		</div>
	);
};

export default BrandTable;
