import React, { useState, useEffect } from "react";
import './UserForm.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const DATABASE_URL = "https://formquestions-108ff-default-rtdb.firebaseio.com/";

const UserForm = () => {
  const [sections, setSections] = useState([]);
  const [userResponses, setUserResponses] = useState([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [formAvailable, setFormAvailable] = useState(true);
  const [user, setUser] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

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
      .catch(() => {
        setFormAvailable(false);
      });
  }, []);

  useEffect(() => {
    const storedAnswers = localStorage.getItem("formAnswers");
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }

    const savedSection = localStorage.getItem("currentSection");
    if (savedSection) {
      const index = parseInt(savedSection, 10);
      setCurrentSectionIndex(isNaN(index) ? 0 : index);
    }
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
      });
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const expiresAt = localStorage.getItem("expiresAt");

    if (storedUser && expiresAt) {
      const now = new Date().getTime();
      if (now < parseInt(expiresAt)) {
        setUser(JSON.parse(storedUser));
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("expiresAt");
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      const expiresAt = parseInt(localStorage.getItem("expiresAt"));
      const timeLeft = expiresAt - new Date().getTime();

      const logoutTimer = setTimeout(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("expiresAt");
        setUser(null);
        alert("Session expired. Please log in again.");
      }, timeLeft);

      return () => clearTimeout(logoutTimer);
    }
  }, [user]);

  const handleChange = (questionId, value) => {
    const updatedAnswers = { ...answers, [questionId]: value };
    setAnswers(updatedAnswers);
    localStorage.setItem("formAnswers", JSON.stringify(updatedAnswers));
  };

  const handleNext = () => {
    if (currentSectionIndex < sections.length - 1) {
      const newIndex = currentSectionIndex + 1;
      setCurrentSectionIndex(newIndex);
      localStorage.setItem("currentSection", newIndex.toString());
    }
  };

  const handlePrev = () => {
    if (currentSectionIndex > 0) {
      const newIndex = currentSectionIndex - 1;
      setCurrentSectionIndex(newIndex);
      localStorage.setItem("currentSection", newIndex.toString());
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setShowModal(true);
    setModalMessage("WAIT PLEASE...");

    answers.status = "pending";
    if (user) {
      answers.email = user.email;
    }

    fetch(`${DATABASE_URL}userResponses.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers),
    })
      .then(() => {
        setTimeout(() => {
          setModalMessage("✅ YOUR FORM IS SUBMITTED");
          localStorage.removeItem("formAnswers");
          localStorage.removeItem("currentSection");
        }, 2000);
      })
      .catch(() => {
        setTimeout(() => {
          setModalMessage("❌ SOMETHING WENT WRONG");
        }, 2000);
      });
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("formAnswers");
    localStorage.removeItem("currentSection");
    setAnswers({});
    setCurrentSectionIndex(0);
    setUser(null);
  };
  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUser(decoded);
    const expiresAt = new Date().getTime() + 60 * 60 * 1000;
    localStorage.setItem("user", JSON.stringify(decoded));
    localStorage.setItem("expiresAt", expiresAt.toString());
  };

  if (!formAvailable) return <p>The form is not currently available.</p>;
  if (sections.length === 0) return <p>Loading form...</p>;

  if (!user) {
    return (
      <div className="auth-wrapper">
        <h2>Please sign in with Google to continue</h2>
        <GoogleLogin onSuccess={handleLoginSuccess} onError={() => alert("Login failed")} />
      </div>
    );
  }

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
      <h1>Authorized Email {user.email}</h1>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
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
          <button className="submit-button" onClick={handleSubmit} disabled={isSubmitting}>Submit</button>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>{modalMessage}</p>
            {(modalMessage.includes("SUBMITTED") || modalMessage.includes("WRONG")) && (
              <button 
              className="submit-form-button"
              onClick={() => {
                setShowModal(false);
                setIsSubmitting(false);
                window.location.href = "/";
              }}>OK</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserForm;
