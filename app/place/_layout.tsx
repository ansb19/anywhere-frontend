import { Slot, Stack } from "expo-router";

export default function PlaceLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
         <Slot />
      <Stack.Screen name="index" />
      <Stack.Screen name="place-detail/[id]" />
      <Stack.Screen name="place-edit/[id]" />
    </Stack>
  );
}
