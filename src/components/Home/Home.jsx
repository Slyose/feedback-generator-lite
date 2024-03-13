import "./Home.css";
import { Link } from "react-router-dom";
import Feedback from "../../data/feedback.json";
import { useState } from "react";

export default function Home(props) {
  const { feedbackData, setFeedbacks } = props;
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [hasBeenReset, setHasBeenReset] = useState(false);

  function handleClick() {
    if (isFirstClick) {
      setIsFirstClick(false);
    }
    if (!isFirstClick) {
      setIsFirstClick(true);
      setHasBeenReset(true);
      setFeedbacks(Feedback);
      localStorage.removeItem("feedbacks");
      setTimeout(() => {
        setHasBeenReset(false);
      }, 3000);
    }
  }

  return (
    <>
      <h1>Feedback Gen Lite!</h1>
      <p>
        Let's generate some feedback. Don't get lazy, but be smart about making
        feedback for common mistakes!
      </p>
      {feedbackData.sprints.map((sprint) => (
        <p key={sprint.id}>
          <Link to={`/sprint/${sprint.id}`}>{sprint.id}</Link>
        </p>
      ))}
      <button
        onClick={() => {
          handleClick();
        }}
      >
        {isFirstClick ? "reset feedback data?" : "are you SURE?"}
      </button>
      {hasBeenReset && (
        <p>Local storage cleared! Hope you meant to do that ;D</p>
      )}
    </>
  );
}
