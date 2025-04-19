import React, { useState, useEffect } from "react";
import questionsData from "../Data/Questions.json";
import QuizQuestion from "../Components/QuestionCard";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Timer from "../Components/Timer";
import ProgressBar from "../Components/ProgressBar";

const QuizPage1 = () => {
	const navigate = useNavigate();
	const firstTen = questionsData.slice(0, 10);
	const [answers, setAnswers] = useState({});
	const answeredCount = Object.keys(answers).length;
	const totalQuestions = questionsData.length;

	useEffect(() => {
		const savedAnswers = JSON.parse(localStorage.getItem("quizAnswers")) || {};
		setAnswers(savedAnswers);

		// Scroll to top when the page loads
		window.scrollTo(0, 0);
	}, []);

	const handleSelect = (id, answer) => {
		const updated = { ...answers, [id]: answer };
		setAnswers(updated);
		localStorage.setItem("quizAnswers", JSON.stringify(updated));
	};

	const handleNext = () => {
		if (answeredCount < 10) {
			// Show a toast if not all questions are answered
			toast.error("Please answer all 10 questions before proceeding.");
			return;
		}
		navigate("/quiz2");
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 py-10 px-4">
			<div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
				<div className="sticky top-0 z-20 bg-white py-2">
					<Timer
						duration={600} // 10 minutes in seconds
						onTimeUp={() => {
							toast.warn("Time's up! Submitting your answers.");
							navigate("/result"); // or "/resultPage"
						}}
					/>
					<ProgressBar current={answeredCount} total={totalQuestions} />
				</div>
				<h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">
					🚀 Quiz - Page 1
				</h2>
				<div className="space-y-8">
					{firstTen.map((q) => (
						<QuizQuestion
							key={q.id}
							question={q}
							selectedAnswer={answers[q.id]}
							onSelect={handleSelect}
						/>
					))}
				</div>
				<div className="text-center mt-10">
					<button
						onClick={handleNext}
						disabled={answeredCount < 10} // Disable the button if not all questions are answered
						className={`bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition transform hover:scale-105 shadow-lg ${answeredCount < 10 ? 'opacity-50 cursor-not-allowed' : ''}`}
					>
						Next Page →
					</button>
				</div>
			</div>

			{/* Toast Container */}
			<ToastContainer />
		</div>
	);
};

export default QuizPage1;
