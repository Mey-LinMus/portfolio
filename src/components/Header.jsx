import React, { useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect/dist/core";
import "../styles/header.css";
import Logo from "../assets/MLogo.svg";
import Profile from "../assets/profile picture.png";
import Vivus from "vivus";

const Header = () => {
  const [showSVG, setShowSVG] = useState(false);
  const svgRef = useRef(null);

  useEffect(() => {
    const svgElement = svgRef.current;

    if (showSVG && svgElement) {
      new Vivus(svgElement, {
        duration: 200,
        start: "autostart",
        type: "oneByOne",
      });
    }
  }, [showSVG]);

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
        <img src={Logo} alt="" ref={svgRef} />
      </div>
      <div id="hearder-text">
        <span ref={typewriterRef} className="header-info"></span>
      </div>
      <div className="profile-picture">
        <img src={Profile} alt="" />
      </div>
    </div>
  );
};

export default Header;
