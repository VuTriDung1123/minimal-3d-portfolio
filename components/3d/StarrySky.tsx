import { useMemo } from "react";
import * as THREE from "three";

const createCircleTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.beginPath();
    ctx.arc(8, 8, 8, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
};

export default function StarrySky() {
  const circleTexture = useMemo(() => createCircleTexture(), []);

  // Dải ngân hà (Milky Way)
  const milkyWayPositions = useMemo(() => {
    const count = 5000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = (Math.random() - 0.5) * 200;
      const spreadX = (Math.random() - 0.5) * 30;
      const spreadY = (Math.random() - 0.5) * 30;
      pos[i * 3] = t + spreadX;
      pos[i * 3 + 1] = t * 0.4 + spreadY + 10;
      pos[i * 3 + 2] = -80 + (Math.random() - 0.5) * 40;
    }
    return pos;
  }, []);

  // Sao nền rải rác cực kỳ dày đặc bao phủ toàn bản đồ
  const backgroundStars = useMemo(() => {
    const count = 10000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 200; // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 150; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200; // Z
    }
    return pos;
  }, []);

  return (
    <group>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[milkyWayPositions, 3]}
            count={milkyWayPositions.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.2}
          color="#e9d5ff"
          map={circleTexture}
          transparent
          opacity={0.8}
          alphaTest={0.1}
        />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[backgroundStars, 3]}
            count={backgroundStars.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#ffffff"
          map={circleTexture}
          transparent
          opacity={0.6}
          alphaTest={0.1}
        />
      </points>
    </group>
  );
}
