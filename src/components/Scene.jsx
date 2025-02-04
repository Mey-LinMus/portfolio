import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Character from "./Model";

const Scene = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight * 1, 
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight * 1, 
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Canvas
      camera={{ position: [2, 1, 5], fov: 45 }}
      style={{ width: size.width, height: size.height }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 1, 2]} intensity={5} />
      <Character scale={[8, 8, 8]} position={[0, -13, 0]} />
    </Canvas>
  );
};

export default Scene;
