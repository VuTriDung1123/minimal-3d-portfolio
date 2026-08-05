import { useFrame } from "@react-three/fiber/native";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// Tạo Texture hình tròn hoàn hảo cho các ngôi sao
const createCircleTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const context = canvas.getContext("2d");
  if (context) {
    context.beginPath();
    context.arc(16, 16, 16, 0, 2 * Math.PI);
    context.fillStyle = "#ffffff";
    context.fill();
  }
  return new THREE.CanvasTexture(canvas);
};

// ==========================================
// 1. BẦU TRỜI SAO & DẢI NGÂN HÀ (Milky Way)
// ==========================================
function StarrySky() {
  const circleTexture = useMemo(() => createCircleTexture(), []);

  // Tạo dải Ngân Hà vắt chéo bầu trời
  const milkyWayPositions = useMemo(() => {
    const count = 4000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Dàn trải theo một đường chéo dài
      const t = (Math.random() - 0.5) * 100;
      // Tạo độ nhiễu (Gaussian spread) để nó bung ra như đám mây
      const spreadX = (Math.random() - 0.5) * (Math.random() * 15);
      const spreadY = (Math.random() - 0.5) * (Math.random() * 15);

      pos[i * 3] = t + spreadX; // X
      pos[i * 3 + 1] = t * 0.5 + spreadY; // Y (Nghiêng lên)
      pos[i * 3 + 2] = -40 + (Math.random() - 0.5) * 20; // Z (Nằm sâu phía sau)
    }
    return pos;
  }, []);

  return (
    <group>
      {/* Dải ngân hà màu Tím/Hồng */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[milkyWayPositions, 3]}
            count={milkyWayPositions.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#d8b4fe"
          map={circleTexture}
          transparent
          opacity={0.6}
          alphaTest={0.1}
        />
      </points>

      {/* Các vì sao nền rải rác */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array(
                Array.from({ length: 3000 }).map(
                  () => (Math.random() - 0.5) * 100,
                ),
              ),
              3,
            ]}
            count={1000}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#ffffff"
          map={circleTexture}
          transparent
          opacity={0.8}
          alphaTest={0.1}
        />
      </points>
    </group>
  );
}

// ==========================================
// 2. HỆ THỐNG KHỐI ĐA GIÁC (Đứng yên & Bay lượn)
// ==========================================
function FloatingShape({
  startPos,
  scale,
  speed,
  type = "static",
}: {
  startPos: [number, number, number];
  scale: number;
  speed: number;
  type?: "static" | "orbit" | "fly";
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  // Random pha ban đầu để các khối không chuyển động đều tăm tắp
  const randomPhase = useMemo(() => Math.random() * 100, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() + randomPhase;

    // Luôn tự xoay quanh trục
    meshRef.current.rotation.x = time * speed;
    meshRef.current.rotation.y = time * speed * 1.2;

    if (type === "static") {
      // Chỉ nhấp nhô tại chỗ
      meshRef.current.position.y = startPos[1] + Math.sin(time * 1.5) * 0.2;
    } else if (type === "orbit") {
      // Bay lượn vòng cung chậm rãi
      meshRef.current.position.x = startPos[0] + Math.sin(time * 0.5) * 4;
      meshRef.current.position.y = startPos[1] + Math.cos(time * 0.3) * 2;
      meshRef.current.position.z = startPos[2] + Math.sin(time * 0.4) * 3;
    } else if (type === "fly") {
      // Bay ngang qua màn hình liên tục
      meshRef.current.position.x = ((time * 2) % 30) - 15; // Lặp lại khi bay khuất
      meshRef.current.position.y = startPos[1] + Math.sin(time) * 1;
    }
  });

  return (
    <mesh ref={meshRef} position={startPos} scale={scale} castShadow>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#6b21a8"
        roughness={0.1}
        metalness={0.9}
        emissive="#2c0647"
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}

// NỀN GỢN SÓNG (Giữ nguyên thuật toán cũ)
function WavyGround() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = meshRef.current.geometry.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      posAttr.setZ(
        i,
        Math.sin(posAttr.getX(i) * 0.4 + time * 0.3) * 1.2 +
          Math.cos(posAttr.getY(i) * 0.4 + time * 0.2) * 1.2,
      );
    }
    posAttr.needsUpdate = true;
  });
  return (
    <mesh ref={meshRef} position={[0, -3.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[50, 50, 64, 64]} />
      <meshStandardMaterial color="#1a1025" roughness={0.9} metalness={0.1} />
    </mesh>
  );
}

export default function MathParticles3D() {
  return (
    <>
      <fog attach="fog" args={["#0a0a0a", 8, 30]} />
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight position={[5, 10, 2]} intensity={2.5} color="#d8b4fe" />

      <StarrySky />
      <WavyGround />

      {/* CÁC KHỐI ĐỨNG YÊN (Trạm gác) */}
      <FloatingShape
        startPos={[0, 0.5, 0]}
        scale={1.5}
        speed={0.2}
        type="static"
      />
      <FloatingShape
        startPos={[-4, 1.5, -3]}
        scale={0.7}
        speed={0.4}
        type="static"
      />

      {/* CÁC KHỐI BAY LƯỢN VÒNG CUNG (Vệ tinh) */}
      <FloatingShape
        startPos={[5, 2, -5]}
        scale={0.4}
        speed={0.8}
        type="orbit"
      />
      <FloatingShape
        startPos={[-6, 3, -8]}
        scale={0.5}
        speed={0.6}
        type="orbit"
      />

      {/* CÁC KHỐI BAY NGANG QUA (Tàu du hành) */}
      <FloatingShape
        startPos={[-15, -1, -4]}
        scale={0.3}
        speed={1.2}
        type="fly"
      />
    </>
  );
}
