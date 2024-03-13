import { useEffect, useState } from "react";
import "./Feedback.css";
import { Link, useParams } from "react-router-dom";

export default function Feedback(props) {
  const { feedbacks, setFeedbacks } = props;
  const { sprintID } = useParams();
  // const [feedbackData, setFeedbackData] = useState()
  const sprint = feedbacks.sprints.find((sprint) => sprintID === sprint.id);

  const [chosenTaskNum, setChosenTaskNum] = useState(null);
  const [chosenTaskAspects, setChosenTaskAspects] = useState(null);
  const [chosenTaskData, setChosenTaskData] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("Great job bucko!");
  console.log(sprintID);
  console.log(sprint);

  useEffect(() => {
    const chosenTask = sprint.tasks.find((task) => {
      return task.taskNumber === chosenTaskNum;
    });
    setChosenTaskData(chosenTask);
  }, [chosenTaskNum]);

  

  const onTaskClick = (taskNumber) => {
    setChosenTaskNum(taskNumber);
  };

  return (
    <>
      <Link to="/">
        <h1>Feedback Gen Lite!</h1>
      </Link>
      <p>Let's generate some feedback for {sprint.id}!</p>
      <p>Choose a task Number:</p>
      <div className="taskList">
        {sprint.tasks.map((task) => {
          return (
            <div className="taskListItem">
              <button
                onClick={() => onTaskClick(task.taskNumber)}
                key={task.taskNumber}
              >
                {task.taskNumber}
              </button>
              <text>{task.taskName}</text>
            </div>
          );
        })}
      </div>
      {chosenTaskNum && chosenTaskData ? (
        <>
          <h2>
            Task #{chosenTaskNum}: {chosenTaskData.taskName}
          </h2>
          <div className="feedbackSection">
            {chosenTaskData.aspects.map((aspect) => {
              console.log(aspect.description);
              console.log(aspect.feedbacks[0]);
              // console.log(aspect.feedbacks);
              return (
                // A card of feedback
                <>
                  {" "}
                  <h3>{aspect.description}</h3>
                </>
              );
            })}
            <div className="feedbackMessageContainer">
            <p>{feedbackMessage}</p>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
