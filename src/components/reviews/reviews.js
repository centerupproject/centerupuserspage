import { useState } from "react";
import "./reviews.css";

const Reviews = () => {
  const reviews = [
    {
      name: "Lilit Manukyan",
      role: "12th-grade student",
      text: "“Future Up helped me figure out what I actually want to study and where I want to go. It really made everything clearer and gave me the confidence to take the next step.”",
    },
    {
      name: "Arman Khachatryan",
      role: "High school graduate",
      text: "“I always dreamed of studying abroad but didn’t know where to start. Future Up guided me through every step—now I’m headed to university in the France!”",
    },
    {
      name: "Mariam Petrosyan",
      role: "College freshman",
      text: "“I had no idea how to pick a major. Thanks to Future Up, I discovered my passion for environmental science and found a perfect-fit program.”",
    },
    {
      name: "David Harutyunyan",
      role: "Gap year student",
      text: "“Future Up helped me plan a meaningful gap year and prepare for applying to top universities afterward. Truly life-changing.”",
    },
    {
      name: "Nare Sargsyan",
      role: "IB student",
      text: "“I was overwhelmed by choices and deadlines. Future Up broke things down clearly and helped me stay on track with everything.”",
    },
    {
      name: "Tigran Avetisyan",
      role: "Recent graduate",
      text: "“I didn’t think studying abroad was realistic, but Future Up proved me wrong. I’m now enrolled in a program in the Netherlands!”",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalPages = Math.ceil(reviews.length / 2);
  const maxIndex = totalPages - 1;

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="reviews__wrapper">
      <div className="reviews__slider">
        <div
          className="reviews__wrapper--cards"
          style={{
            transform: `translateX(-${currentIndex * (746 * 2 + 61)}px)`,
          }}
        >
          {reviews.map((review, index) => (
            <div key={index} className="reviews__cards--card">
              <h1>{review.name}</h1>
              <span>{review.role}</span>
              <span>{review.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="reviews__wrapper--actions">
        <img
          src="/leftarrow.png"
          onClick={handlePrev}
          style={{
            cursor: currentIndex === 0 ? "not-allowed" : "pointer",
            opacity: currentIndex === 0 ? 0.5 : 1,
          }}
        />
        <img
          src="/leftarrow.png"
          className="rightarrow"
          onClick={handleNext}
          style={{
            cursor: currentIndex === maxIndex ? "not-allowed" : "pointer",
            opacity: currentIndex === maxIndex ? 0.5 : 1,
          }}
        />
      </div>
    </div>
  );
};

export default Reviews;
