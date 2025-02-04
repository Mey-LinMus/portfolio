// made with: https://hub.avaturn.me/editor?customization_id=0194d072-e2c1-7d9f-83d1-6118d3c05ff5


import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Myself from "./Three/model.glb";

const Character = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(Myself);
  const { actions } = useAnimations(animations, group);
  const { mouse } = useThree(); // Get mouse position

  // Reference to the head bone (e.g., nodes.Hips or another bone)
  const headBone = useRef();

  useEffect(() => {
    console.log(animations);

    if (animations && actions) {
      if (actions[animations[0]?.name]) {
        actions[animations[0].name].play().setDuration(25);
      }
    }

    // Set the head bone reference (adjust based on your model's bone structure)
    if (nodes.Hips) {
      headBone.current = nodes.Hips;
    }
  }, [animations, actions, nodes]);

  // Smoothly rotate the head based on mouse position
  useFrame(() => {
    if (headBone.current) {
      const targetRotationY = mouse.x * 0.5; // Horizontal movement

      headBone.current.rotation.y = THREE.MathUtils.lerp(
        headBone.current.rotation.y,
        targetRotationY,
        0.1
      );
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[0, Math.PI / 3.5, 0]}>
        <group name="Scene">
          <group name="Armature">
            <primitive object={nodes.Hips} />
            <skinnedMesh
              name="avaturn_body"
              geometry={nodes.avaturn_body.geometry}
              material={materials.avaturn_body_material}
              skeleton={nodes.avaturn_body.skeleton}
            />
            <skinnedMesh
              name="avaturn_hair_0"
              geometry={nodes.avaturn_hair_0.geometry}
              material={materials.avaturn_hair_0_material}
              skeleton={nodes.avaturn_hair_0.skeleton}
            />
            <skinnedMesh
              name="avaturn_hair_1"
              geometry={nodes.avaturn_hair_1.geometry}
              material={materials.avaturn_hair_1_material}
              skeleton={nodes.avaturn_hair_1.skeleton}
            />
            <skinnedMesh
              name="avaturn_shoes_0"
              geometry={nodes.avaturn_shoes_0.geometry}
              material={materials.avaturn_shoes_0_material}
              skeleton={nodes.avaturn_shoes_0.skeleton}
            />
            <skinnedMesh
              name="avaturn_look_0"
              geometry={nodes.avaturn_look_0.geometry}
              material={materials.avaturn_look_0_material}
              skeleton={nodes.avaturn_look_0.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload(Myself);
export default Character;
