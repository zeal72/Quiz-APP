import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import questionsData from "../data/questions.json";
import QuizQuestion from "../Components/QuestionCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResultPage = () => {
	const navigate = useNavigate();
	const [answers, setAnswers] = useState({});
	const [score, setScore] = useState(0);

	useEffect(() => {
		const savedAnswers = JSON.parse(localStorage.getItem("quizAnswers")) || {};
		setAnswers(savedAnswers);
	}, []);

	useEffect(() => {
		const correctAnswers = questionsData.filter((q) => answers[q.id] === q.answer);
		setScore(correctAnswers.length);
	}, [answers]);

	const handleRetake = () => {
		localStorage.removeItem("quizAnswers");
		navigate("/quiz1");
		toast.success("Your quiz answers have been reset. Let's try again!");
	};

	const percentage = Math.round((score / questionsData.length) * 100);

	return (
		<div className="max-w-3xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Results</h1>

			{/* Display Score and Feedback */}
			<div className="text-center mb-6">
				<h2 className="text-xl font-semibold mb-2">
					You Scored {score} / {questionsData.length} ({percentage}%)
				</h2>
				<p
					className={`text-lg font-medium ${score >= 16
						? "text-green-600"
						: score >= 10
							? "text-yellow-600"
							: "text-red-600"
						}`}
				>
					{score >= 16
						? "Excellent! You've got a great understanding!"
						: score >= 10
							? "Good job! You can do even better next time!"
							: "Keep practicing! You'll get it next time!"}
				</p>
			</div>

			{/* Questions and Answers */}
			<div className="space-y-6">
				{questionsData.map((q) => (
					<QuizQuestion
						key={q.id}
						question={q}
						selectedAnswer={answers[q.id]}
						onSelect={() => { }}
						showAnswer={true}
					/>
				))}
			</div>

			{/* Retake Quiz Button */}
			<div className="mt-6 text-center">
				<button
					onClick={handleRetake}
					className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition duration-200"
				>
					Take the Quiz Again
				</button>
			</div>

			<ToastContainer />
		</div>
	);
};

export default ResultPage;
