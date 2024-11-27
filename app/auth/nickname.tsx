import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login, } from "@/store/slices/authSlice";

const NicknameScreen = () => {
  const [nickname, setNickname] = useState("aa"); // 닉네임 상태
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.nickname) {
      // 닉네임이 이미 존재하면 탭 네비게이션으로 이동
      router.replace("/tabs");
    }
  }, [user, router]);
  const handleNicknameSubmit = () => {
    // 닉네임 검증 로직
    if (nickname.trim().length < 2) {
      Alert.alert("Invalid Nickname", "Nickname must be at least 2 characters long.");
      return;
    }

    // Redux 상태에 닉네임 저장
    dispatch(
      login({
        ...user,
        nickname :nickname,
       
      })
    );

    // 메인 탭 네비게이션으로 이동
    router.replace("/tabs");
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
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
});

export default NicknameScreen;
