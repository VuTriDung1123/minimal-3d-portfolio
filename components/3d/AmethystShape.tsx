import { useFrame } from "@react-three/fiber/native";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function AmethystShape({
  startPos,
  scale,
  speed,
  geometryType = "icosahedron",
  color = "#d8b4fe",
  emissive = "#7e22ce",
  isFlying = false,
}: {
  startPos: [number, number, number];
  scale: number;
  speed: number;
  geometryType?: "icosahedron" | "octahedron" | "dodecahedron";
  color?: string;
  emissive?: string;
  isFlying?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const randomPhaseX = useMemo(() => Math.random() * 100, []);
  const randomPhaseY = useMemo(() => Math.random() * 100, []);
  const randomPhaseZ = useMemo(() => Math.random() * 100, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    meshRef.current.rotation.x = time * speed;
    meshRef.current.rotation.y = time * speed * 1.3;

    if (isFlying) {
      // Chế độ bay tự do: Biên độ dao động cực rộng (lên tới 40 đơn vị)
      meshRef.current.position.x =
        startPos[0] + Math.sin(time * speed * 0.2 + randomPhaseX) * 40;
      meshRef.current.position.y =
        startPos[1] + Math.cos(time * speed * 0.15 + randomPhaseY) * 20;
      meshRef.current.position.z =
        startPos[2] + Math.sin(time * speed * 0.1 + randomPhaseZ) * 40;
    } else {
      // Chế độ trạm gác: Chỉ nhấp nhô nhẹ quanh vị trí cố định
      meshRef.current.position.x =
        startPos[0] + Math.sin(time * speed * 0.5 + randomPhaseX) * 2;
      meshRef.current.position.y =
        startPos[1] + Math.cos(time * speed * 0.6 + randomPhaseY) * 1.5;
      meshRef.current.position.z =
        startPos[2] + Math.sin(time * speed * 0.4 + randomPhaseZ) * 2;
    }
  });

  return (
    <mesh ref={meshRef} position={startPos} scale={scale} castShadow>
      {geometryType === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
      {geometryType === "octahedron" && <octahedronGeometry args={[1, 0]} />}
      {geometryType === "dodecahedron" && (
        <dodecahedronGeometry args={[1, 0]} />
      )}

      <meshPhysicalMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.8}
        roughness={0.1}
        metalness={0.8}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}
