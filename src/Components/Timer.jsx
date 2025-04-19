// Components/Timer.jsx
import React, { useEffect, useState } from "react";

const Timer = ({ duration, onTimeUp }) => {
	const [timeLeft, setTimeLeft] = useState(duration); // in seconds

	useEffect(() => {
		if (timeLeft <= 0) {
			onTimeUp();
			return;
		}

		const timer = setInterval(() => {
			setTimeLeft((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, [timeLeft, onTimeUp]);

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};

	return (
		<div className="text-right font-mono font-semibold text-lg text-blue-600">
			Time Left: {formatTime(timeLeft)}
		</div>
	);
};

export default Timer;
