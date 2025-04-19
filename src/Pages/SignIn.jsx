import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import the toast function
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toast

export default function Login() {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const navigate = useNavigate();

	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSubmit = (e) => {
		e.preventDefault();
		const users = JSON.parse(localStorage.getItem("users")) || [];

		const foundUser = users.find(
			(user) =>
				user.email === formData.email && user.password === formData.password
		);

		if (foundUser) {
			localStorage.setItem("currentUser", JSON.stringify(foundUser));
			toast.success("Successfully logged in!");
			setTimeout(() => {
				navigate("/quiz1");
			}, 1500);
		} else {
			toast.error("Invalid email or password");
		}

	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-500 p-4">
			<form
				onSubmit={handleSubmit}
				className="bg-white shadow-lg rounded-xl px-8 py-10 w-full max-w-md"
			>
				<h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
					Login
				</h2>
				<input
					name="email"
					type="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleChange}
					className="w-full mb-4 p-3 border border-gray-300 rounded-lg"
					required
				/>
				<input
					name="password"
					type="password"
					placeholder="Password"
					value={formData.password}
					onChange={handleChange}
					className="w-full mb-6 p-3 border border-gray-300 rounded-lg"
					required
				/>
				<button
					type="submit"
					className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition"
				>
					Login
				</button>
				<p className="text-sm text-center mt-4 text-gray-500">
					Don’t have an account?{" "}
					<a href="/" className="text-purple-600 underline">
						Sign up
					</a>
				</p>
			</form>

			{/* Toast Container */}
			<ToastContainer />
		</div>
	);
}
