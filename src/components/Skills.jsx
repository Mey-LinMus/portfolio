import React, { useEffect, useState } from "react";
import ScrollTrigger from "react-scroll-trigger";
import "../styles/skills.css";

const skills = [
  { name: "Webdesign", level: 80 },
  { name: "Webdevelopment", level: 60 },
  { name: "Animatie", level: 65 },
  { name: "Video-editing", level: 85 },
  { name: "Fotobewerking", level: 86 },
  { name: "Multimedia Design", level: 81 },
];

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollEnter = (triggerId) => {
    console.log(`Skills component entered the viewport.`);
    setIsVisible(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const cvSection = document.querySelector(".cv-section");
      if (cvSection) {
        const rect = cvSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="skills">
      <ScrollTrigger onEnter={handleScrollEnter}>
        <h2 style={{ marginBottom: "40px" }}>Vaardigheden</h2>
        <div className="skills-columns">
          <div className="skills-column">
            {skills.slice(0, 3).map((skill, index) => (
              <div key={index} className="skill-item">
                <p className="skill-name">{skill.name}</p>
                <div className="progress-container">
                  <div
                    className="progress-skills"
                    style={{
                      width: isVisible ? `${skill.level}%` : "0%",
                      transition: isVisible ? "width 1s" : "none",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="skills-column">
            {skills.slice(3).map((skill, index) => (
              <div key={index} className="skill-item">
                <p className="skill-name">{skill.name}</p>
                <div className="progress-container">
                  <div
                    className="progress-skills"
                    style={{
                      width: isVisible ? `${skill.level}%` : "0%",
                      transition: isVisible ? "width 1s" : "none",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollTrigger>
    </div>
  );
};

export default Skills;
