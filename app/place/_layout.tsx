import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* 하위 모든 경로를 자동으로 관리 */}
      <Stack.Screen name="place-detail/[id]"  />
      <Stack.Screen name="place-edit/[id]" />
      <Stack.Screen name="place-review/[id]" />

    </Stack>
  );
}
