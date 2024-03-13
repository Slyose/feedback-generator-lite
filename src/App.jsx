import { useEffect, useState } from "react";
import "./App.css";
import feedback from "./data/feedback.json";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Feedback from "./components/Feedback/Feedback.jsx";

function App() {
  const [feedbacks, setFeedbacks] = useState(feedback);

  // useEffect(() => {
  //   console.log(feedbacks.sprints[0]);
  // }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home feedbackData={feedbacks} />} />
        <Route
          path="/sprint/:sprintID"
          element={
            <Feedback feedbacks={feedbacks} setFeedbacks={setFeedbacks} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
