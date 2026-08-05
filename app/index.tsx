import { Canvas } from "@react-three/fiber/native";
import { useRef } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Scene3D from "../components/Scene3D";

const { width, height } = Dimensions.get("window");

// Danh sách các trạm để render Menu
const NAV_ITEMS = [
  "HOOK",
  "CORE",
  "LAB",
  "ACHIEVEMENTS",
  "CANVAS",
  "LOGS",
  "NEXUS",
];

export default function Home() {
  const scrollOffset = useRef(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // Hàm nhảy đến trang cụ thể khi nhấn vào Menu
  const scrollToPage = (index: number) => {
    scrollViewRef.current?.scrollTo({ y: index * height, animated: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
          <color attach="background" args={["#0a0a0a"]} />
          <Scene3D scrollOffset={scrollOffset} />
        </Canvas>
      </View>

      {/* THANH MENU ĐIỀU HƯỚNG CỐ ĐỊNH Ở TRÊN CÙNG */}
      <View style={styles.fixedHeader}>
        <Text style={styles.logo}>VŨ TRÍ DŨNG</Text>
        <View style={styles.navMenu}>
          {NAV_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => scrollToPage(index)}
              style={styles.navButton}
            >
              <Text style={styles.navItemText}>
                0{index + 1}. {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollOverlay}
        pagingEnabled={true}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={(e) => {
          scrollOffset.current = e.nativeEvent.contentOffset.y / height;
        }}
      >
        {/* 1. THE HOOK */}
        <View style={styles.page}>
          <View style={styles.contentCenter}>
            <Text style={styles.mainTitle}>CREATIVE</Text>
            <Text style={styles.mainTitle}>EXPLORER.</Text>
            <Text style={styles.description}>
              A digital space beyond the confines of ordinary logic.
            </Text>
          </View>
        </View>

        {/* 2. THE CORE */}
        <View style={styles.page}>
          <View style={styles.contentCenter}>
            <Text style={styles.subTitle}>02. THE CORE</Text>
            <Text style={styles.mainTitle}>MOBILE DEV.</Text>
            <Text style={styles.description}>
              Crafting experiences through Kotlin and Flutter.
            </Text>
          </View>
        </View>

        {/* 3. THE LAB */}
        <View style={styles.page}>
          <View style={styles.contentCenter}>
            <Text style={styles.subTitle}>03. THE LAB</Text>
            <Text style={styles.mainTitle}>EXPERIMENTS.</Text>
            <Text style={styles.description}>
              Architecting robust systems and testing the boundaries of logic.
            </Text>
          </View>
        </View>

        {/* 4. THE ACHIEVEMENTS */}
        <View style={styles.page}>
          <View style={styles.contentCenter}>
            <Text style={styles.subTitle}>04. ACHIEVEMENTS</Text>
            <Text style={styles.mainTitle}>MILESTONES.</Text>
            <Text style={styles.description}>
              Certifications, academic records, and professional growth markers.
            </Text>
          </View>
        </View>

        {/* 5. THE CANVAS */}
        <View style={styles.page}>
          <View style={styles.contentCenter}>
            <Text style={styles.subTitle}>05. THE CANVAS</Text>
            <Text style={styles.mainTitle}>GALLERY.</Text>
            <Text style={styles.description}>
              A freeform collection of thoughts, photography, and visual
              fragments.
            </Text>
          </View>
        </View>

        {/* 6. THE LOGS */}
        <View style={styles.page}>
          <View style={styles.contentCenter}>
            <Text style={styles.subTitle}>06. THE LOGS</Text>
            <Text style={styles.mainTitle}>TRANSMISSIONS.</Text>
            <Text style={styles.description}>
              Written records, tutorials, and reflections.
            </Text>
          </View>
        </View>

        {/* 7. THE NEXUS */}
        <View style={styles.page}>
          <View style={styles.contentCenter}>
            <Text style={styles.subTitle}>07. THE NEXUS</Text>
            <Text style={styles.mainTitle}>CONNECT.</Text>
            <Text style={styles.description}>
              Establish a link. Drop a message.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0a" },
  canvasContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  scrollOverlay: { flex: 1, zIndex: 1 },
  page: { height: height, paddingHorizontal: 60, justifyContent: "center" },

  // Header được làm nổi bật và luôn nằm trên cùng (z-index cao nhất)
  fixedHeader: {
    position: "absolute",
    top: 30,
    left: 60,
    right: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  logo: { color: "#fff", fontSize: 16, fontWeight: "bold", letterSpacing: 2 },
  navMenu: { flexDirection: "row", gap: 20 },
  navButton: { paddingVertical: 5 },
  navItemText: {
    color: "#bbb",
    fontSize: 12,
    letterSpacing: 1.5,
    fontWeight: "600",
  },

  contentCenter: { flex: 1, justifyContent: "center", maxWidth: 800 },
  mainTitle: {
    color: "#fff",
    fontSize: width > 800 ? 80 : 50,
    fontWeight: "900",
    letterSpacing: -2,
  },
  subTitle: {
    color: "#c084fc",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 3,
    marginBottom: 10,
  },
  description: {
    color: "#ddd",
    fontSize: 16,
    marginTop: 24,
    maxWidth: 450,
    lineHeight: 24,
  },
});
