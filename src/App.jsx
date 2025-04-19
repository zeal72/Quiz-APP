import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Pages/SignUp";
import Login from "./Pages/SignIn"; // (You’ll create this next)
import QuizPage1 from "./Pages/QuizPage1";
import QuizPage2 from "./Pages/QuizPage2";
import ResultPage from "./Pages/Results";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz1" element={<QuizPage1 />} />
        <Route path="/quiz2" element={<QuizPage2 />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
