import { useEffect, useState } from "react";
import "./App.css";
import feedback from "./data/feedback.json";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Feedback from "./components/Feedback/Feedback.jsx";

function App() {
  const [feedbacks, setFeedbacks] = useState(null);

  useEffect(() => {
    const storedFeedbacks = localStorage.getItem("feedbacks");
    if (storedFeedbacks) {
      setFeedbacks(JSON.parse(storedFeedbacks));
    } else {
      setFeedbacks(feedback);
    }
  }, []);

  return feedbacks ? (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home feedbackData={feedbacks} setFeedbacks={setFeedbacks} />
          }
        />
        <Route
          path="/sprint/:sprintID"
          element={
            <Feedback feedbacks={feedbacks} setFeedbacks={setFeedbacks} />
          }
        />
      </Routes>
    </>
  ) : (
    <h1>Loading feedback data....</h1>
  );
}

export default App;
