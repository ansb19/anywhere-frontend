import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login,  } from "@/store/slices/authSlice";

const LoginScreen = () => {
  const [email, setEmail] = useState("asw0899@aa.aa"); // 이메일 입력 상태
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Redux 상태 가져오기
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // 임의의 이메일 검증 함수
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 형식 검증
    return emailRegex.test(email);
  };

  // 로그인 버튼 핸들러
  const handleLogin = () => {
    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    // Redux 상태에 사용자 저장
    dispatch(
      login({
        account_email: email,
        nickname: "",
        phone_number: "010-1234-1234",
        register_place_count: 0,
        penalty_count: 0,
        penalty_state: false,
      })
    );

    // 닉네임 작성 화면으로 이동
    router.replace("./nickname");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button title="Next" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
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
    fontSize: 16,
  },
});

export default LoginScreen;