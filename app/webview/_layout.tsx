import { Slot, Stack } from "expo-router";

export default function WebviewLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
        
      <Stack.Screen name="index" />
     
    </Stack>
  );
}
