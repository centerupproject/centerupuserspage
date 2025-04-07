import React, { useState, useEffect } from "react";
import './UserForm.css';

const DATABASE_URL = "https://formquestions-108ff-default-rtdb.firebaseio.com/";

const UserForm = () => {
  const [sections, setSections] = useState([]);
  const [userResponses, setUserResponses] = useState([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [formAvailable, setFormAvailable] = useState(true);

  useEffect(() => {
    fetch(`${DATABASE_URL}memberships.json`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          let sectionsData = Object.entries(data).map(([id, sectionData]) => ({
            id,
            ...sectionData,
          }));

          const globalStartDate = new Date(data.startDate).getTime();
          const globalDeadlineDate = new Date(data.deadlineDate).getTime();
          const currentTime = new Date().getTime();
          const isFormAvailable = currentTime >= globalStartDate && currentTime <= globalDeadlineDate;

          sectionsData = sectionsData.filter((section) => section.id !== 'startDate' && section.id !== 'deadlineDate');
          sectionsData.sort((a, b) => a.order - b.order);

          setFormAvailable(isFormAvailable);
          setSections(sectionsData);
        } else {
          setFormAvailable(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching form data:", error);
        setFormAvailable(false);
      });
  }, []);

  useEffect(() => {
    const userUid = "LuJf9aMujvQmaBJeNwKurwJYvBH2";

    fetch(`${DATABASE_URL}userResponses.json`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const filteredResponses = Object.entries(data).filter(([id, responseData]) => {
            return responseData.userUid === userUid;
          });
          setUserResponses(filteredResponses);
        }
      })
      .catch((error) => {
        console.error("Error fetching user responses:", error);
      });
  }, []);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  answers.status = 'pending';

  const handleSubmit = () => {
    fetch(`${DATABASE_URL}userResponses.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers),
    })
      .then(() => alert("Form submitted successfully!"))
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Error submitting form.");
      });
  };

  if (!formAvailable) return <p>The form is not currently available.</p>;
  if (sections.length === 0) return <p>Loading form...</p>;

  const currentSection = sections[currentSectionIndex];

  let questions = Object.entries(currentSection)
    .filter(([key]) => key !== "id" && key !== "order")
    .map(([key, q]) => ({ id: key, ...q }))
    .filter((q) => {
      if (q.conditions) {
        return Object.entries(q.conditions).every(([dependentId, requiredValues]) => {
          const conditionAnswer = answers[dependentId];
          if (!conditionAnswer) return false;
          return Array.isArray(conditionAnswer)
            ? conditionAnswer.some((answer) => requiredValues.includes(answer))
            : requiredValues.includes(conditionAnswer);
        });
      }
      return true;
    })
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  questions = questions.slice(1);
  const isNextDisabled = questions.some((q) => !answers[q.id]);

  return (
    <div className="user-form">
      <h2>{currentSection.id}</h2>
      {questions.map((q) => (
        <div key={q.id} className={`question-item ${answers[q.id] !== undefined ? 'fade-in' : ''}`}>
          <label className="question-label">{q.label}</label>
          {q.type === "text" && (
            <input
              className="question-input"
              type="text"
              value={answers[q.id] || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}
          {q.type === "date" && (
            <input
              className="question-input"
              type="date"
              value={answers[q.id] || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}
          {q.type === "checkbox" && (
            <div className="checkbox-group">
              {q.options?.map((option, index) => (
                <div key={index} className="checkbox-item">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    value={option}
                    checked={answers[q.id] === option}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleChange(q.id, option);
                      } else {
                        handleChange(q.id, undefined);
                      }
                    }}
                  />
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="navigation-buttons">
        {currentSectionIndex > 0 && (
          <button className="prev-button" onClick={handlePrev}>Previous</button>
        )}
        {currentSectionIndex < sections.length - 1 ? (
          <button className="next-button" onClick={handleNext} disabled={isNextDisabled}>Next</button>
        ) : (
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default UserForm;
