import { Tabs } from "expo-router";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

// 기본 색상 및 테마 설정
const Colors = {
  light: { tint: "#2f95dc" },
  dark: { tint: "#fff" },
};

export default function TabLayout() {
  const colorScheme = "light"; // 기본 테마 설정 (혹은 `useColorScheme()` 사용 가능)

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false, // 헤더 숨김 설정
      }}
    >
      {/* 홈 탭 */}
      <Tabs.Screen
        name="index"

        options={{
      
          title: "홈",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={28}
            />
          ),
        }}
      />
      {/* 가게 생성 탭 */}
      <Tabs.Screen
        name="place-create"
        
        options={{
          
          
          title: "가게 생성",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              color={color}
              size={28}
            />
          ),
        }}
      />
      {/* 프로필 탭 */}
      <Tabs.Screen
        name="profile"
        options={{
      
          title: "프로필",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={color}
              size={28}
            />
          ),
        }}
      />
    </Tabs>
  );
}
