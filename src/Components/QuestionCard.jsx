import React from "react";

const QuizQuestion = ({ question, selectedAnswer, onSelect, showAnswer }) => {
	return (
		<div className="mb-6 border border-gray-200 p-4 rounded-lg shadow-sm">
			<h3 className="font-semibold mb-2">
				{question.id}. {question.question}
			</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
				{question.options.map((option, index) => (
					<label
						key={index}
						className={`p-2 border rounded cursor-pointer transition-all
							${showAnswer
								? option === question.answer
									? "bg-green-100 border-green-500"
									: selectedAnswer === option
										? "bg-red-100 border-red-600"
										: ""
								: selectedAnswer === option
									? "bg-blue-100 border-blue-500"
									: "hover:bg-gray-50"}`}
					>
						<input
							type="radio"
							name={`question-${question.id}`}
							value={option}
							className="hidden"
							checked={selectedAnswer === option}
							onChange={() => onSelect(question.id, option)}
							disabled={showAnswer} // Disable input for result page
						/>
						{option}
					</label>
				))}
			</div>
			{showAnswer && selectedAnswer !== question.answer && (
				<p className="text-sm text-red-600 mt-2">Correct answer: {question.answer}</p>
			)}
		</div>
	);
};

export default QuizQuestion;
