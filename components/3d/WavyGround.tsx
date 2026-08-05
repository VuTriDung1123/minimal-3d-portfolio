import { useFrame } from "@react-three/fiber/native";
import { useRef } from "react";
import * as THREE from "three";

export default function WavyGround() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = meshRef.current.geometry.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      posAttr.setZ(
        i,
        Math.sin(posAttr.getX(i) * 0.4 + time * 0.3) * 1.5 +
          Math.cos(posAttr.getY(i) * 0.4 + time * 0.2) * 1.5,
      );
    }
    posAttr.needsUpdate = true;
  });
  return (
    <mesh ref={meshRef} position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[60, 60, 64, 64]} />
      {/* Màu đất ngả tím sáng hơn một chút */}
      <meshStandardMaterial color="#2e1065" roughness={0.7} metalness={0.2} />
    </mesh>
  );
}
