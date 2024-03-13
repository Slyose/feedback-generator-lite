import "./Feedback.css";

import React, { useState } from "react";

function FeedbackCard({ aspect, onSave, onCancel }) {
  const [editFeedback, setEditFeedback] = useState({
    whatWentWell: aspect.feedbacks[0].whatWentWell,
    evenBetterIf: aspect.feedbacks[0].evenBetterIf,
  });

  const handleEditChange = (field, value) => {
    setEditFeedback((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h3>{aspect.description}</h3>
      <textarea
        placeholder="What Went Well"
        value={editFeedback.whatWentWell}
        onChange={(e) => handleEditChange("whatWentWell", e.target.value)}
      />
      <textarea
        placeholder="Even Better If"
        value={editFeedback.evenBetterIf}
        onChange={(e) => handleEditChange("evenBetterIf", e.target.value)}
      />
      <button onClick={() => onSave(aspect, editFeedback)}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default FeedbackCard;
