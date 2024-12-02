import { Tabs } from 'expo-router';
import React from 'react';


import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import  Ionicons   from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        
      }}>
      <Tabs.Screen
        name="index"
        options={{ 
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons   name={focused ? 'home' : 'home-outline'} color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="place-create"

        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons   name={focused ? 'code-slash' : 'code-slash-outline'} color={color} size={28}/>
          ),
        }}
      /> <Tabs.Screen 
      name="profile" 
      options={{
        title: '',
        tabBarIcon: ({ color, focused }) => (
          <Ionicons   name={focused ? 'person' : 'person-outline'} color={color} size={28}/>
        ),
      }}
    />
    </Tabs>
  );
}
