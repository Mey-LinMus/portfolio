import React, { useState } from "react";
import "../styles/softwares.css";

const Softwares = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const softwareList = [
    "React",
    "JavaScript",
    "HTML",
    "CSS",
    "Canva",
    "Adobe Creative Suite",
    "Version Control (Git/GitHub)",
    "Visual Studio Code",
    "Wordpress",
    "Microsoft Office",
  ];

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <div>
      <div className="marquee" onClick={togglePopup}>
        <div className="marquee-content">
          {softwareList.map((item, index) => (
            <span key={index} className="marquee-item">
              {item}
            </span>
          ))}
        </div>
      </div>

      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-button" onClick={togglePopup}>
              &times;
            </button>
            <ul>
              {softwareList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Softwares;
