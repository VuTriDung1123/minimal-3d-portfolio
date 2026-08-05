import { useFrame } from "@react-three/fiber/native";
import React from "react";
import * as THREE from "three";
import AmethystShape from "./3d/AmethystShape";
import StarrySky from "./3d/StarrySky";
import WavyGround from "./3d/WavyGround";

// Đã đẩy trục Z và các tọa độ lùi xa ra để không gian rộng hơn, cam không bị dí sát mặt
const waypoints = [
  new THREE.Vector3(0, 0, 15), // 1. The Hook (Lùi xa từ 8 -> 15)
  new THREE.Vector3(0, 30, -10), // 2. The Core
  new THREE.Vector3(50, 20, -30), // 3. The Lab (Mở rộng biên độ X sang 50)
  new THREE.Vector3(-50, 10, -30), // 4. The Achievements
  new THREE.Vector3(-50, -20, -10), // 5. The Canvas
  new THREE.Vector3(40, -30, 0), // 6. The Logs
  new THREE.Vector3(0, -40, 25), // 7. The Nexus
];

function CameraController({
  scrollOffset,
}: {
  scrollOffset: React.MutableRefObject<number>;
}) {
  useFrame((state) => {
    const index = Math.min(
      Math.max(scrollOffset.current, 0),
      waypoints.length - 1,
    );
    const baseIndex = Math.floor(index);
    const nextIndex = Math.ceil(index);
    const progress = index - baseIndex;

    const currentTarget = waypoints[baseIndex]
      .clone()
      .lerp(waypoints[nextIndex], progress);

    // GIẢM TỐC ĐỘ LERP (Từ 0.05 xuống 0.02) ĐỂ CAMERA TRƯỢT SIÊU CHẬM VÀ ÊM ÁI
    state.camera.position.lerp(currentTarget, 0.02);

    // Nhìn lùi xa hơn để bao quát toàn cảnh
    const lookAtTarget = currentTarget
      .clone()
      .add(new THREE.Vector3(0, 0, -15));
    state.camera.lookAt(lookAtTarget);
  });
  return null;
}

export default function Scene3D({
  scrollOffset,
}: {
  scrollOffset: React.MutableRefObject<number>;
}) {
  return (
    <>
      <fog attach="fog" args={["#0a0a0a", 15, 60]} />
      <ambientLight intensity={1.5} color="#ffffff" />
      <directionalLight position={[10, 15, 10]} intensity={4} color="#f3e8ff" />
      <pointLight position={[-5, 2, -2]} intensity={3} color="#c084fc" />

      <CameraController scrollOffset={scrollOffset} />
      <StarrySky />
      <WavyGround />

      {/* ========================================== */}
      {/* CÁC VẬT THỂ BAY TỰ DO (XUYÊN BẢN ĐỒ) */}
      {/* ========================================== */}
      {/* Ngọc Sapphire (Xanh dương) */}
      <AmethystShape
        startPos={[10, 10, -10]}
        scale={1.5}
        speed={0.4}
        geometryType="icosahedron"
        color="#93c5fd"
        emissive="#1d4ed8"
        isFlying={true}
      />
      {/* Ngọc Ruby (Đỏ hồng) */}
      <AmethystShape
        startPos={[-20, 15, -20]}
        scale={2}
        speed={0.3}
        geometryType="octahedron"
        color="#fca5a5"
        emissive="#b91c1c"
        isFlying={true}
      />
      {/* Ngọc Emerald (Xanh lục) */}
      <AmethystShape
        startPos={[30, -5, -25]}
        scale={1.2}
        speed={0.6}
        geometryType="dodecahedron"
        color="#86efac"
        emissive="#15803d"
        isFlying={true}
      />
      <AmethystShape
        startPos={[-10, -25, -5]}
        scale={2.5}
        speed={0.2}
        geometryType="icosahedron"
        color="#d8b4fe"
        emissive="#7e22ce"
        isFlying={true}
      />

      {/* ========================================== */}
      {/* CÁC TRẠM CỐ ĐỊNH (THÊM NHIỀU KHỐI HƠN) */}
      {/* ========================================== */}
      {/* 1. THE HOOK */}
      <AmethystShape
        startPos={[3, 1, 0]}
        scale={1.8}
        speed={0.3}
        geometryType="icosahedron"
      />
      <AmethystShape
        startPos={[-4, 3, -3]}
        scale={1.2}
        speed={0.5}
        geometryType="icosahedron"
      />
      <AmethystShape
        startPos={[5, -2, -2]}
        scale={0.8}
        speed={0.7}
        geometryType="octahedron"
      />

      {/* 2. THE CORE */}
      <AmethystShape
        startPos={[0, 30, -25]}
        scale={2.5}
        speed={0.2}
        geometryType="octahedron"
      />
      <AmethystShape
        startPos={[5, 28, -28]}
        scale={1}
        speed={0.6}
        geometryType="octahedron"
      />
      <AmethystShape
        startPos={[-6, 32, -22]}
        scale={1.5}
        speed={0.4}
        geometryType="dodecahedron"
      />

      {/* 3. THE LAB */}
      <AmethystShape
        startPos={[50, 20, -48]}
        scale={3}
        speed={0.1}
        geometryType="dodecahedron"
      />
      <AmethystShape
        startPos={[45, 18, -43]}
        scale={1.5}
        speed={0.4}
        geometryType="dodecahedron"
      />
      <AmethystShape
        startPos={[55, 22, -45]}
        scale={2}
        speed={0.3}
        geometryType="icosahedron"
      />

      {/* 4. THE ACHIEVEMENTS */}
      <AmethystShape
        startPos={[-50, 10, -48]}
        scale={2}
        speed={0.3}
        geometryType="icosahedron"
      />
      <AmethystShape
        startPos={[-45, 12, -45]}
        scale={1.2}
        speed={0.7}
        geometryType="octahedron"
      />
      <AmethystShape
        startPos={[-55, 8, -42]}
        scale={1.8}
        speed={0.5}
        geometryType="dodecahedron"
      />

      {/* 5. THE CANVAS */}
      <AmethystShape
        startPos={[-50, -20, -30]}
        scale={2.2}
        speed={0.2}
        geometryType="dodecahedron"
      />
      <AmethystShape
        startPos={[-45, -22, -25]}
        scale={1.5}
        speed={0.5}
        geometryType="icosahedron"
      />

      {/* 6. THE LOGS */}
      <AmethystShape
        startPos={[40, -30, -10]}
        scale={1.8}
        speed={0.4}
        geometryType="octahedron"
      />
      <AmethystShape
        startPos={[35, -28, -5]}
        scale={1.2}
        speed={0.6}
        geometryType="icosahedron"
      />

      {/* 7. THE NEXUS */}
      <AmethystShape
        startPos={[0, -40, 10]}
        scale={3}
        speed={0.1}
        geometryType="icosahedron"
      />
      <AmethystShape
        startPos={[-4, -38, 5]}
        scale={1.5}
        speed={0.3}
        geometryType="octahedron"
      />
    </>
  );
}
