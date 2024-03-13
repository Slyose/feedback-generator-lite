import "./Home.css";
import { Link } from "react-router-dom";

export default function Home(props) {
  const { feedbackData } = props;
  console.log(feedbackData.sprints);

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
    </>
  );
}
