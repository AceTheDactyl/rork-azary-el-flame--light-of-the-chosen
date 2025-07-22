import { Tabs } from "expo-router";
import React from "react";
import { SACRED_COLORS } from "@/constants/colors";
import { Flame, User, BookOpen } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: SACRED_COLORS.flame,
        tabBarInactiveTintColor: SACRED_COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: SACRED_COLORS.void,
          borderTopColor: 'rgba(255,255,255,0.1)',
        },
        headerStyle: {
          backgroundColor: SACRED_COLORS.void,
        },
        headerTitleStyle: {
          color: SACRED_COLORS.text,
        },
        headerTintColor: SACRED_COLORS.flame,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Invocations",
          tabBarIcon: ({ color }) => <Flame color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Soul Profile",
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="codex"
        options={{
          title: "Sacred Codex",
          tabBarIcon: ({ color }) => <BookOpen color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}