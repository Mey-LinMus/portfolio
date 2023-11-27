import React, { useEffect, useState } from 'react';
import ScrollTrigger from 'react-scroll-trigger';
import '../styles/languages.css';

const languages = [
  { name: 'Nederlands', proficiency: 90 },
  { name: 'Engels', proficiency: 80 },
  { name: 'Frans', proficiency: 50 },
];

const Languages = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollEnter = (triggerId) => {
    console.log(`CV component entered the viewport.`);
    setIsVisible(true);
  };

  const [scrollY, setScrollY] = useState(0);


  useEffect(() => {
    const handleScroll = () => {
     
      const cvSection = document.querySelector('.cv');
      if (cvSection) {
        const rect = cvSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    // Attach a scroll event listener
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call it once on component mount

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array to run this effect only once

  return (
    <div className="cv">
      {/* Wrap the content with ScrollTrigger */}
      <ScrollTrigger onEnter={handleScrollEnter}>
        <h2>Talen</h2>
        <div className="languages-container">
          {languages.map((language, index) => (
            <div key={index} className="language-item">
              <p>{language.name}</p>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{
                    width: isVisible ? `${language.proficiency}%` : '0%',
                    transition: isVisible ? 'width 1s' : 'none', // Apply transition only when isVisible is true
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </ScrollTrigger>
    </div>
  );
};

export default Languages;
