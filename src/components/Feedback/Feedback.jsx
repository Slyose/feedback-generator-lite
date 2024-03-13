import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Feedback.css";
import FeedbackCard from "./feedbackCard";

export default function Feedback({ feedbacks, setFeedbacks }) {
  const { sprintID } = useParams();
  const sprint = feedbacks.sprints.find((s) => s.id === sprintID);

  const [chosenTaskNum, setChosenTaskNum] = useState(null);
  const [chosenTaskData, setChosenTaskData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [feedbackChoices, setFeedbackChoices] = useState({});
  const [feedbackMessages, setFeedbackMessages] = useState([]);

  useEffect(() => {
    const chosenTask = sprint?.tasks.find(
      (task) => task.taskNumber === chosenTaskNum
    );
    setChosenTaskData(chosenTask);
  }, [chosenTaskNum, sprint?.tasks]);

  useEffect(() => {
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

  const handleSave = (aspect, editedFeedback) => {
    const aspectIndex = chosenTaskData.aspects.findIndex(
      (a) => a.description === aspect.description
    );

    console.log(aspectIndex);
    if (aspectIndex !== -1) {
      chosenTaskData.aspects[aspectIndex].feedbacks[0] = editedFeedback;
    }

    const updatedFeedbacks = JSON.parse(JSON.stringify(feedbacks));
    const sprintIndex = updatedFeedbacks.sprints.findIndex(
      (s) => s.id === sprintID
    );
    if (sprintIndex !== -1) {
      const taskIndex = updatedFeedbacks.sprints[sprintIndex].tasks.findIndex(
        (t) => t.taskNumber === chosenTaskNum
      );
      if (taskIndex !== -1) {
        updatedFeedbacks.sprints[sprintIndex].tasks[taskIndex] = chosenTaskData;
        setFeedbacks(updatedFeedbacks);
      }
    }
  };

  return (
    <>
      <Link to="/">
        <h1>Feedback Gen Lite!</h1>
      </Link>
      <p>Let's generate some feedback for {sprintID}!</p>
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
      {chosenTaskData && (
        <>
          <button onClick={() => setIsEditMode(!isEditMode)}>
            {isEditMode ? "Disable Edit Mode" : "Enable Edit Mode"}
          </button>
          <h2>
            Task #{chosenTaskNum}: {chosenTaskData.taskName}
          </h2>
          <div className="feedbackContainer">
            <div>
              {isEditMode
                ? chosenTaskData.aspects.map((aspect, index) => (
                    <FeedbackCard
                      key={index}
                      aspect={aspect}
                      onSave={(aspect, editFeedback) => {
                        handleSave(aspect, editFeedback);
                      }}
                      onCancel={() => setIsEditMode(false)}
                    />
                  ))
                : chosenTaskData.aspects.map((aspect, index) => (
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
            </div>
            <div className="feedbackMessageContainer">
              <ul>
                {feedbackMessages && (
                  <>
                    {feedbackMessages.map((message, index) => (
                      <li key={index}>{message}</li>
                    ))}
                  </>
                )}
              </ul>
              <button onClick={handleCopyToClipboard}>Save to Clipboard</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
