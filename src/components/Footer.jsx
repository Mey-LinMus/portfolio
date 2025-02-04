import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "../styles/footer.css";
import { AiFillPhone, AiFillMail, AiFillLinkedin } from "react-icons/ai";
import Button from "./DownloadCVButton";
const Footer = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    // Use the controls to trigger the animation
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  // Define the animation variants
  const animationVariants = {
    visible: {
      opacity: 2,
      x: 0,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      y: 20,
    },
  };

  return (
    <footer className="footer">
      <div ref={ref} className="footer-content">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={animationVariants}
        >
          <ul className="contact-list">
            <li>
              <AiFillMail />{" "}
              <a href="mailto:mey-lin.mus@hotmail.be">mey-lin.mus@hotmail.be</a>
            </li>
            <li>
              <AiFillLinkedin />{" "}
              <a href="https://www.linkedin.com/in/mey-lin-mus-b99647225/">
                Mey-Lin Mus
              </a>
            </li>
            <li>
              <AiFillPhone />{" "}
              <a href="tel:+32 4 74 32 78 77">+32 4 74 32 78 77</a>
            </li>
            <li>
              <Button />
            </li>
          </ul>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
