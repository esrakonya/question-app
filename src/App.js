import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./pages/quiz/Quiz";
import Introduce from "./pages/introduce/Introduce"
function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Introduce />} />
          <Route path="/quiz/:amount" element={<Quiz/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
