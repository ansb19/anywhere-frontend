import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const NicknameScreen = () => {
  const [nickname, setNickname] = useState("");
  const router = useRouter();

  const handleNicknameSubmit = () => {
    // 닉네임 검증 로직 추가 가능
    router.push("/(tabs)"); // 메인 탭 네비게이션으로 이동
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Nickname</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your nickname"
        value={nickname}
        onChangeText={setNickname}
      />
      <Button title="Submit" onPress={handleNicknameSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default NicknameScreen;
