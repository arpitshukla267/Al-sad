'use client';

import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';

const SearchBar = () => {
	const [searchQuery, setSearchQuery] = useState('');

	return (
		<div className="mb-4 sm:mb-6">
			<div className="relative">
				<input
					type="text"
					placeholder="Search products..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full px-4 py-3 pl-10 border border-[#1e1e1e] rounded-[4px] font-primary text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
				/>
				<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#1e1e1e]" />
			</div>
		</div>
	);
};

export default SearchBar;

