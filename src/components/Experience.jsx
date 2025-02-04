import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import "../styles/experience.css";

const CVExperience = () => {
  const [showPopup, setShowPopup] = useState(false);

  const sectionAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(40px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay: 200,
  });

  const listItemAnimation = useSpring({
    from: { opacity: 0, transform: "translateX(-40px)" },
    to: { opacity: 1, transform: "translateX(0)" },
    delay: 400,
  });

  const handleClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <animated.div style={sectionAnimation} className="cv-container">
      <h2 className="section-title">Opleiding</h2>
      <h3 className="subsection-title">Secundair</h3>
      <ul className="education-list">
        <animated.li style={listItemAnimation}>
          <strong>STW (Sociale Technische Wetenschappen)</strong> - Heilig-Hart
          & College Halle (2015 - 2021)
        </animated.li>
        <h3 className="subsection-title">Bachelor</h3>
        <animated.li style={listItemAnimation} className={"moreInfo"}>
          <span onClick={handleClick} className="clickable-text">
            <strong>Multimedia & Creatieve Technologie</strong> -
            Erasmushogeschool Brussel (2021 - 2024)
          </span>
        </animated.li>
      </ul>

      <br />

      <h2 className="section-title">Ervaring</h2>
      <h3 className="subsection-title">
        Stagiaire Digital Marketing Executive
      </h3>
      <p className="experience-duration">
        Sarawak Belux - jan. 2024 - apr. 2024 (3 maanden)
      </p>
      <ul className="experience-list">
        <animated.li style={listItemAnimation}>
          Website bewerking (Wordpress)
        </animated.li>
        <animated.li style={listItemAnimation}>
          Videoproductie + bewerking (Premiere Pro)
        </animated.li>
        <animated.li style={listItemAnimation}>
          Fotoproductie + bewerking (Lightroom + Photoshop)
        </animated.li>
        <animated.li style={listItemAnimation}>
          Design (Canva + Illustrator)
        </animated.li>
        <animated.li style={listItemAnimation}>
          Animatie (After effects)
        </animated.li>
      </ul>

      {showPopup && (
        <div className="popup-experience" onClick={closePopup}>
          <div className="popup-content">
            <p>
              Tijdens mijn opleiding Multimedia & Creatieve Technologie heb ik
              een mix van creatieve en technische vakken gevolgd, waarmee ik me
              heb voorbereid op een veelzijdige carrière. Ik heb zowel mijn
              technische vaardigheden als mijn creatieve inzichten ontwikkeld
              door middel van verschillende projecten en opdrachten.
            </p>
            <button className="close-button" onClick={closePopup}>
              &times;
            </button>
          </div>
        </div>
      )}
    </animated.div>
  );
};

export default CVExperience;
