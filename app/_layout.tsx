import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { store } from "../store";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAppSelector } from "@/store/hooks";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
 
          <Stack>
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="tabs" options={{ headerShown: false }} />
            <Stack.Screen name="place" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
         
 
      </Provider>
    </ThemeProvider>
  );
}

function AuthGate({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // RootLayout이 완전히 마운트된 후 리디렉션 실행
      setTimeout(() => {
        router.replace("/auth/login");
      }, 0);
    }
  }, [isAuthenticated]);

  
  return <>{children}</>;
}
