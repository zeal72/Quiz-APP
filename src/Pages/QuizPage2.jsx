import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import questionsData from "../data/questions.json";
import QuizQuestion from "../Components/QuestionCard"; // Reusing QuizQuestion component
import { toast, ToastContainer } from "react-toastify"; // Import the toast function
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toast
import Timer from "../Components/Timer";
import ProgressBar from "../Components/ProgressBar";

const QuizPage2 = () => {
	const navigate = useNavigate();
	const [answers, setAnswers] = useState({});
	const answeredCount = Object.keys(answers).length;
	const totalQuestions = questionsData.length;

	useEffect(() => {
		// Load existing answers from localStorage if available
		const savedAnswers = JSON.parse(localStorage.getItem("quizAnswers")) || {};
		setAnswers(savedAnswers);

		// Scroll to top when the page loads
		window.scrollTo(0, 0);
	}, []);

	const handleOptionChange = (questionId, option) => {
		const updatedAnswers = {
			...answers,
			[questionId]: option,
		};
		setAnswers(updatedAnswers);
		localStorage.setItem("quizAnswers", JSON.stringify(updatedAnswers));
	};

	const handleSubmit = () => {
		if (answeredCount < 10) {
			// Show a toast for incomplete answers
			toast.error("Please answer all 10 questions before submitting.");
			return;
		}
		localStorage.setItem("quizAnswers", JSON.stringify(answers));
		navigate("/result");
	};

	const handleBack = () => {
		navigate("/quiz1"); // Go back to QuizPage1
	};

	const currentQuestions = questionsData.slice(10, 20); // Questions 11–20

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 py-10 px-4">
			<div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
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
				<h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Quiz - Page 2</h1>
				{currentQuestions.map((q) => (
					<QuizQuestion
						key={q.id}
						question={q}
						selectedAnswer={answers[q.id]}
						onSelect={handleOptionChange}
					/>
				))}
				<div className="mt-6 flex gap-4">
					<button
						onClick={handleBack}
						className="px-6 py-3 bg-gray-600 text-white rounded-2xl hover:bg-gray-700 transition duration-200 w-full"
					>
						Back
					</button>
					<button
						onClick={handleSubmit}
						disabled={answeredCount < 10} // Disable the button if not all questions are answered
						className={`px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl transition duration-200 w-full ${answeredCount < 10 ? 'opacity-50 cursor-not-allowed' : ''}`}
					>
						Submit Quiz
					</button>
				</div>
			</div>

			{/* Toast Container */}
			<ToastContainer />
		</div>
	);
};

export default QuizPage2;
