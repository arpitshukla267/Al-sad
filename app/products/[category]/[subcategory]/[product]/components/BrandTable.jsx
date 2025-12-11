'use client';

import React from 'react';

const BrandTable = ({ product }) => {
	// Extract brand information from product
	const brands = product.brands || (product.brand ? [product.brand] : []);
	const specifications = product.specifications || {};

	// If no brand or specification data, don't render
	if (brands.length === 0 && Object.keys(specifications).length === 0) {
		return null;
	}

	return (
		<div className="w-full border border-[rgba(25,65,124,0.3)] rounded-[4px] overflow-hidden">
			<table className="w-full">
				<thead className="bg-[#f0f0f0]">
					<tr>
						<th className="px-4 py-3 text-left font-primary font-semibold text-[15px] sm:text-[15px] md:text-[19px] text-[#1e1e1e] border-b border-[rgba(25,65,124,0.3)]">
							Brand
						</th>
						<th className="px-4 py-3 text-left font-primary font-semibold text-[15px] sm:text-[15px] md:text-[19px] text-[#1e1e1e] border-b border-[rgba(25,65,124,0.3)]">
							Details
						</th>
					</tr>
				</thead>
				<tbody>
					{brands.length > 0 ? (
						brands.map((brand, index) => (
							<tr key={index} className="border-b border-[rgba(25,65,124,0.3)] last:border-b-0">
								<td className="px-4 py-3 font-primary font-normal text-[15px] sm:text-[15px] md:text-[19px] text-[#1e1e1e]">
									{brand.name || brand}
								</td>
								<td className="px-4 py-3 font-primary font-normal text-[15px] sm:text-[15px] md:text-[19px] text-[#1e1e1e]">
									{brand.details || brand.description || '-'}
								</td>
							</tr>
						))
					) : (
						Object.entries(specifications).map(([key, value], index) => (
							<tr key={index} className="border-b border-[rgba(25,65,124,0.3)] last:border-b-0">
								<td className="px-4 py-3 font-primary font-normal text-[15px] sm:text-[15px] md:text-[19px] text-[#1e1e1e]">
									{key}
								</td>
								<td className="px-4 py-3 font-primary font-normal text-[15px] sm:text-[15px] md:text-[19px] text-[#1e1e1e]">
									{String(value)}
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default BrandTable;

