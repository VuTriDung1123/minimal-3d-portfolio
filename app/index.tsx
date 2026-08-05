import { Canvas } from "@react-three/fiber/native";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MathParticles3D from "../components/MathParticles3D";

const { width } = Dimensions.get("window");

export default function Home() {
  return (
    <View style={styles.container}>
      {/* LỚP 0: BACKGROUND 3D TOÁN HỌC */}
      <View style={styles.canvasContainer}>
        <Canvas style={{ flex: 1 }} camera={{ position: [0, 0, 8], fov: 75 }}>
          {/* Màu nền đen tuyền (Deep Black) để làm nổi bật các hạt */}
          <color attach="background" args={["#0a0a0a"]} />
          <ambientLight intensity={0.5} />
          <MathParticles3D />
        </Canvas>
      </View>

      {/* LỚP 1: FOREGROUND 2D BRUTALISM */}
      <View style={styles.overlay} pointerEvents="box-none">
        {/* Header Tối Giản */}
        <View style={styles.header}>
          <Text style={styles.logo}> VŨ TRÍ DŨNG</Text>
          <Text style={styles.navItem}>MENU ☰</Text>
        </View>

        {/* Cụm Text Giữa Màn Hình */}
        <View style={styles.heroContent} pointerEvents="none">
          {/* Nhắc nhớ lại những cái tên thân thuộc bằng phong cách gồ ghề */}
          <View style={styles.tagsContainer}>
            <Text style={styles.tag}>DAVID MILLER</Text>
            <Text style={styles.tag}>AKINA AOI</Text>
          </View>

          <Text style={styles.mainTitle}>CREATIVE</Text>
          <Text style={styles.mainTitle}>EXPLORER.</Text>

          <Text style={styles.description}>
            A digital space beyond the confines of ordinary logic. Not just an
            IT portfolio, but a freeform canvas for thoughts, stories, and
            mathematical poetry.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>SCROLL TO DISCOVER ↓</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  canvasContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  overlay: {
    flex: 1,
    zIndex: 1,
    justifyContent: "space-between",
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  logo: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  navItem: {
    color: "#fff",
    fontSize: 14,
    letterSpacing: 1,
  },
  heroContent: {
    flex: 1,
    justifyContent: "center",
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  tag: {
    color: "#0a0a0a",
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  mainTitle: {
    color: "#fff",
    fontSize: width > 600 ? 80 : 50,
    fontWeight: "900",
    letterSpacing: -2,
    lineHeight: width > 600 ? 85 : 55,
  },
  description: {
    color: "#888",
    fontSize: 16,
    marginTop: 24,
    maxWidth: 450,
    lineHeight: 24,
  },
  footer: {
    alignItems: "flex-start",
    marginBottom: 20,
  },
  footerText: {
    color: "#444",
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: "bold",
  },
});
