// Components/ProgressBar.jsx
import React from "react";

const ProgressBar = ({ current, total }) => {
	const percentage = Math.round((current / total) * 100);

	return (
		<div className="w-full mb-4">
			<div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
				<span>{current} of {total} answered</span>
				<span>{percentage}%</span>
			</div>
			<div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden shadow-inner">
				<div
					className={`h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 
					animate-stripes transition-all duration-500 ease-out`}
					style={{ width: `${percentage}%` }}
				></div>
			</div>
		</div>
	);
};

export default ProgressBar;
