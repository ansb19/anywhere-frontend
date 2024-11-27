import React from "react";
import { Slot, Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack >
       <Slot />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="nickname" options={{ headerShown: false}} />
    </Stack>
  );
};

export default AuthLayout;
