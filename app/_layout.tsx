import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      {/* Ẩn thanh header mặc định để không gian 3D và giao diện Lensark tràn viền */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        {/* Nếu sau này làm thêm trang Admin hay Blog, hệ thống sẽ tự nhận diện */}
      </Stack>

      {/* Ép thanh trạng thái (pin, sóng, giờ) sang màu sáng để nổi bật trên nền 3D tối */}
      <StatusBar style="light" />
    </>
  );
}
