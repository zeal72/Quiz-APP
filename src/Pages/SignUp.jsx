import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import toast functionality
import "react-toastify/dist/ReactToastify.css"; // Import Toast CSS

export default function Signup() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSubmit = (e) => {
		e.preventDefault();
		const users = JSON.parse(localStorage.getItem("users")) || [];

		// Check for duplicate email
		const existingUser = users.find((user) => user.email === formData.email);
		if (existingUser) {
			toast.error("User with this email already exists."); // Show error toast for duplicate email
			return;
		}

		users.push(formData);
		localStorage.setItem("users", JSON.stringify(users));
		toast.success("Successfully Signed Up!");
		setTimeout(() => {
			navigate("/login");
		}, 1500);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
			<form
				onSubmit={handleSubmit}
				className="bg-white shadow-lg rounded-xl px-8 py-10 w-full max-w-md"
			>
				<h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
					Sign Up
				</h2>
				<input
					name="name"
					type="text"
					placeholder="Name"
					value={formData.name}
					onChange={handleChange}
					className="w-full mb-4 p-3 border border-gray-300 rounded-lg"
					required
				/>
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
					className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
				>
					Create Account
				</button>
				<p className="text-sm text-center mt-4 text-gray-500">
					Already have an account?{" "}
					<a href="/login" className="text-indigo-600 underline">
						Login
					</a>
				</p>
			</form>

			{/* Toast Container */}
			<ToastContainer />
		</div>
	);
}
