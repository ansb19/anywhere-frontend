import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login,  } from "@/store/slices/authSlice";
import axios from "axios";
import * as Linking from 'expo-linking';
import axiosInstance from "@/api/axiosInstance";
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
        user_id: 6,
        account_email: "asw4265@gmail.com",
        nickname: "안승우",
        phone_number: "01094468132",
        register_place_count: 0,
        penalty_count: 0,
        penalty_state: false,
      })
    );

    // 닉네임 작성 화면으로 이동
    router.replace("./nickname");
  };

const handleKakaoLogin = async () => {
  try {
      const response = await axiosInstance.get<{ data: string }>('http://52.78.42.88/auth/kakao/url');
      const kakaoLoginUrl = response.data.data;
      console.log(kakaoLoginUrl)

      if (kakaoLoginUrl) {
          // 웹뷰로 리디렉션
          router.push(`/webview?url=${encodeURIComponent(kakaoLoginUrl)}`);
      } else {
          Alert.alert('오류', '카카오 로그인 URL을 가져오는 데 실패했습니다.');
      }
  } catch (error) {
      console.error('카카오 로그인 요청 오류:', error);
      Alert.alert('오류', '카카오 로그인 요청 중 문제가 발생했습니다.');
  }
};

const fetchSignupData = async (code: string): Promise<void> => {
    try {
        // 회원가입 데이터 확인 API 호출
        const response = await axios.get(`http://52.78.42.88/user/signup/kakao`, {
            params: { code },
        });

        if (response.data) {
            Alert.alert('회원가입 성공', `안녕하세요, ${response.data.data.user.nickname}님!`);
            console.log(response.data); // 필요한 데이터 활용
        } else {
            Alert.alert('오류', '회원가입 데이터를 가져오는 데 실패했습니다.');
        }
    } catch (error) {
        console.error('회원가입 데이터 가져오기 오류:', error);
        Alert.alert('오류', '회원가입 데이터를 가져오는 중 문제가 발생했습니다.');
    }
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
      <View style={styles.container}>
            <Button title="카카오로 로그인" onPress={handleKakaoLogin} />
        </View>
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