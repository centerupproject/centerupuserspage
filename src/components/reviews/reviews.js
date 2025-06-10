import { useState } from "react";
import "./reviews.css";

const Reviews = () => {
  
  const reviews = [
    {
      name: "Ani",
      role: "11th-grade student",
      text: "Before Future Up, I had only heard about universities, but this conference gave me the chance to personally meet students and understand which path is right for me.",
    },
    {
      name: "Hrant",
      role: "12th-grade student",
      text: "I wasn’t sure which faculty fit me, but thanks to Future Up, I now have a clear idea. Inspiring talks, open and honest students, and most importantly – confidence in my decision.",
    },
    {
      name: "Marine",
      role: "Applicant",
      text: "I used to think all universities were the same, but Future Up helped me see the differences. It was so valuable to hear real students' perspectives, not just official info.",
    },
    {
      name: "Davit",
      role: "High school graduate",
      text: "Everything was very well organized. I met people who had the same doubts as me just a few years ago. Now I feel much more confident about my future choices.",
    },
    {
      name: "Nazeli",
      role: "10th-grade student",
      text: "It was the first time I felt truly informed and ready to apply to a university. I got answers to all my questions during the conference.",
    },
    {
      name: "Tigran",
      role: "12th-grade student",
      text: "The non-formal education booths were super helpful. I discovered scholarships and exchange programs I hadn’t even heard of before.",
    },
  ];
  const reviewsAm = [
    {
      name: "Անի",
      role: "11th-grade student",
      roleAm: "11-րդ դասարանի աշակերտուհի",
      text: "Before Future Up, I had only heard about universities, but this conference gave me the chance to personally meet students and understand which path is right for me.",
      textAm: "Մինչ Future Up-ը ես միայն լսել էի բուհերի մասին, բայց կոնֆերանսի շնորհիվ անձամբ ծանոթացա ուսանողների հետ ու հասկացա՝ որն է իմ ուղին։"
    },
    {
      name: "Հրանտ",
      role: "12th-grade student",
      roleAm: "12-րդ դասարանի աշակերտ",
      text: "I wasn’t sure which faculty fit me, but thanks to Future Up, I now have a clear idea. Inspiring talks, open and honest students, and most importantly – confidence in my decision.",
      textAm: "Չգիտեի՝ որ ֆակուլտետն է ինջ հարմար, բայց Future Up-ի շնորհիվ հստակ պատկերացում կազմեցի։ Հետաքրքիր ելույթներ, շատ բաց ու անկեղծ ուսանողներ, և ամենակարևորը՝ վստահություն՝ իմ ընտրության հանդեպ։"
    },
    {
      name: "Մարինե",
      role: "Applicant",
      roleAm: "Դիմորդ",
      text: "I used to think all universities were the same, but Future Up helped me see the differences. It was so valuable to hear real students' perspectives, not just official info.",
      textAm: "Մտածում էի՝ բոլոր բուհերն են նույնը, բայց Future Up-ը օգնեց հասկանալ տարբերությունները։ Շատ կարևոր էր լսել իրական ուսանողների կարծիքները, ոչ թե միայն պաշտոնական տեղեկատվություն։"
    },
    {
      name: "Դավիթ",
      role: "High school graduate",
      roleAm: "Ավագ դպրոցի շրջանավարտ",
      text: "Everything was very well organized. I met people who had the same doubts as me just a few years ago. Now I feel much more confident about my future choices.",
      textAm: "Ամեն ինչ շատ լավ կազմակերպված էր։ Հանդիպեցի մարդկանց, ովքեր մի քանի տարի առաջ նույն կասկածներն ունեին, ինչ ես։ Հիմա շատ ավելի վստահ եմ իմ ապագայի ընտրության հարցում։"
    },
    {
      name: "Նազելի",
      role: "10th-grade student",
      roleAm: "10-րդ դասարանի աշակերտուհի",
      text: "It was the first time I felt truly informed and ready to apply to a university. I got answers to all my questions during the conference.",
      textAm: "Առաջին անգամ էր, որ ես ինջ այդքան տեղեկացված ու պատրաստ զգացի բուհ ընդունվելու հարցում։ Կոնֆերանսի ընթացքում ստացել եմ պատասխան բոլոր հարցերիս։"
    },
    {
      name: "Տիգրան",
      role: "12th-grade student",
      roleAm: "12-րդ դասարանի աշակերտ",
      text: "The non-formal education booths were super helpful. I discovered scholarships and exchange programs I hadn’t even heard of before.",
      textAm: "Ինձ շատ օգնեցին ոչ ֆորմալ կրթության տաղավարները։ Իմացա կրթաթոշակների ու փոխանակման ծրագրերի մասին, որոնց մասին առաջ չգիտեի։"
    }
  ];
          const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
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
          { language=='en' && reviews.map((review, index) => (
            <div key={index} className="reviews__cards--card">
              <h1>{review.name}</h1>
              <span>{review.role}</span>
              <span>{review.text}</span>
            </div>
          ))}
            { language=='am' && reviewsAm.map((review, index) => (
            <div key={index} className="reviews__cards--card">
              <h1>{review.name}</h1>
              <span>{review.roleAm}</span>
              <span>{review.textAm}</span>
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
