import { useFrame } from "@react-three/fiber/native";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// ==========================================
// 1. BẦU TRỜI SAO (Starry Sky)
// ==========================================
function StarrySky() {
  const count = 1500; // Số lượng ngôi sao

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60; // Trục X (Rộng)
      pos[i * 3 + 1] = Math.random() * 40 - 2; // Trục Y (Rải từ mặt đất lên trời)
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60; // Trục Z (Sâu)
    }
    return pos;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
      </bufferGeometry>
      {/* Cấu hình sao màu trắng, hơi trong suốt */}
      <pointsMaterial size={0.06} color="#ffffff" transparent opacity={0.8} />
    </points>
  );
}

// ==========================================
// 2. KHỐI LƠ LỬNG (Màu Tím Neon)
// ==========================================
function FloatingShape({
  position,
  scale,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * speed;
    meshRef.current.rotation.y = time * speed * 1.2;
    meshRef.current.position.y =
      position[1] + Math.sin(time * 1.5 + position[0]) * 0.15;
  });

  return (
    <mesh position={position} scale={scale} castShadow>
      <icosahedronGeometry args={[1, 0]} />
      {/* 
        Màu tím đậm (#6b21a8), độ bóng cao (metalness). 
        Thêm emissive (tự phát sáng) để khối nổi bật trong nền tối. 
      */}
      <meshStandardMaterial
        color="#6b21a8"
        roughness={0.2}
        metalness={0.8}
        emissive="#2c0647"
        emissiveIntensity={0.6}
      />
    </mesh>
  );
}

// ==========================================
// 3. NỀN GỢN SÓNG (Sáng hơn)
// ==========================================
function WavyGround() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const positionAttribute = meshRef.current.geometry.attributes.position;

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      const z =
        Math.sin(x * 0.4 + time * 0.3) * 1.2 +
        Math.cos(y * 0.4 + time * 0.2) * 1.2;
      positionAttribute.setZ(i, z);
    }
    positionAttribute.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} position={[0, -3.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[50, 50, 64, 64]} />
      {/* Đất màu xám tím nhạt để tách biệt với nền đen */}
      <meshStandardMaterial color="#4a4059" roughness={0.9} metalness={0.1} />
    </mesh>
  );
}

// ==========================================
// 4. XUẤT COMPONENT CHÍNH
// ==========================================
export default function MathParticles3D() {
  return (
    <>
      {/* 
        HIỆU ỨNG SƯƠNG MÙ (FOG): 
        Làm mặt đất xa dần sẽ mờ đi và chìm hoàn toàn vào màu đen (#0a0a0a) 
      */}
      <fog attach="fog" args={["#0a0a0a", 8, 25]} />

      {/* ÁNH SÁNG: Đánh đèn màu tím nhạt để tạo không khí */}
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight position={[5, 10, 2]} intensity={2.5} color="#d8b4fe" />
      <pointLight position={[-5, 2, -5]} intensity={1.5} color="#ffffff" />

      {/* Gọi các thành phần đã tạo */}
      <StarrySky />
      <WavyGround />

      <FloatingShape position={[0, 0.5, 0]} scale={1.8} speed={0.2} />
      <FloatingShape position={[-3.5, 1.5, -2]} scale={0.6} speed={0.4} />
      <FloatingShape position={[3.5, -0.5, -3]} scale={0.8} speed={0.3} />
    </>
  );
}
