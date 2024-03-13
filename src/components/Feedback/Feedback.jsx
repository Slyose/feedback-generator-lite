import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Feedback.css";

export default function Feedback(props) {
  const { feedbacks } = props;
  const { sprintID } = useParams();
  const sprint = feedbacks.sprints.find((s) => s.id === sprintID);

  const [chosenTaskNum, setChosenTaskNum] = useState(null);
  const [chosenTaskData, setChosenTaskData] = useState(null);
  const [feedbackChoices, setFeedbackChoices] = useState({});
  const [feedbackMessages, setFeedbackMessages] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const chosenTask = sprint?.tasks.find(
      (task) => task.taskNumber === chosenTaskNum
    );
    setChosenTaskData(chosenTask);
  }, [chosenTaskNum, sprint?.tasks]);

  useEffect(() => {
    // Reset feedbackChoices whenever a new task is selected
    setFeedbackChoices({});
  }, [chosenTaskNum]);

  useEffect(() => {
    const messages = chosenTaskData?.aspects
      .map((aspect, index) => {
        const choice = feedbackChoices[index];
        return choice ? `${aspect.feedbacks[0][choice]}` : null;
      })
      .filter(Boolean);

    setFeedbackMessages(messages);
  }, [feedbackChoices, chosenTaskData]);

  const onTaskClick = (taskNumber) => {
    setChosenTaskNum(taskNumber);
  };

  const handleFeedbackChange = (aspectIndex, choice) => {
    setFeedbackChoices((prevChoices) => ({
      ...prevChoices,
      [aspectIndex]: choice,
    }));
  };

  const handleCopyToClipboard = () => {
    const feedbackText = feedbackMessages.join("\n");
    navigator.clipboard.writeText(feedbackText).then(() => {
      alert("Feedback copied to clipboard!");
    });
  };

  return (
    <>
      <Link to="/">
        <h1>Feedback Gen Lite!</h1>
      </Link>
      <>
        <p>Let's generate some feedback for {sprint.id}!</p>
        <p>Choose a task Number:</p>
        <div className="taskList">
          {sprint.tasks.map((task) => (
            <div className="taskListItem" key={task.taskNumber}>
              <button onClick={() => onTaskClick(task.taskNumber)}>
                {task.taskNumber}
              </button>
              <span>{task.taskName}</span>
            </div>
          ))}
        </div>
        {chosenTaskNum && chosenTaskData && !isEditMode && (
          <>
            <h2>
              Task #{chosenTaskNum}: {chosenTaskData.taskName}
            </h2>
            <div className="feedbackContainer">
              <div className="feedbackSection">
                {chosenTaskData.aspects.map((aspect, index) => (
                  <div key={index}>
                    <h3>{aspect.description}</h3>
                    <label>
                      <input
                        type="radio"
                        name={`feedback-${index}`}
                        value="whatWentWell"
                        onChange={(e) =>
                          handleFeedbackChange(index, e.target.value)
                        }
                        checked={feedbackChoices[index] === "whatWentWell"}
                      />
                      What Went Well
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`feedback-${index}`}
                        value="evenBetterIf"
                        onChange={(e) =>
                          handleFeedbackChange(index, e.target.value)
                        }
                        checked={feedbackChoices[index] === "evenBetterIf"}
                      />
                      Even Better If
                    </label>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setIsEditMode(!isEditMode);
                  }}
                >
                  Enable Edit mode
                </button>
              </div>
              <div className="feedbackMessageContainer">
                <ul>
                  {feedbackMessages
                    ? feedbackMessages.map((message, index) => (
                        <li key={index}>{message}</li>
                      ))
                    : null}
                </ul>
                <button onClick={handleCopyToClipboard}>
                  Save to Clipboard
                </button>
              </div>
            </div>
          </>
        )}
      </>
    </>
  );
}
