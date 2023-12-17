import React, { useEffect, useRef } from "react";
import Typewriter from "typewriter-effect/dist/core";
import "../styles/header.css";
import Logo from "../assets/MLogo.svg";

const Header = () => {
  const typewriterRef = useRef(null);
  useEffect(() => {
    const typewriter = new Typewriter(typewriterRef.current, {
      loop: false,
      delay: 60,
      cursor: "|",
    });

    typewriter
      .typeString("Hey, Ik ben <strong> Mey-Lin Mus.</strong>")
      .pauseFor(1000)
      .typeString(
        " Ik ben een gedreven student aan de Erasmushogeschool Brussel, waar ik de opleiding Multimedia & Creatieve Technologie volg. Ik ben gepassioneerd door de voortdurend veranderende geconnecteerde wereld.\n" +
          " Als enthousiast persoon sta ik altijd open voor het leren van nieuwe dingen. Als doorzetter geef ik niet snel op.\n" +
          "Ik werk nauwkeurig en met het nodige geduld. Bovendien werk ik graag in teamverband en ben ik goed in communiceren."
      )
      .start();
  }, []);

  return (
    <div className="header">
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <div id="hearder-text">
        <span ref={typewriterRef} className="header-info"></span>
      </div>
      <div className="profile-picture"></div>
    </div>
  );
};

export default Header;
