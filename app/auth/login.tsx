import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login,  } from "@/store/slices/authSlice";
import axios from "axios";
import * as Linking from 'expo-linking';
import axiosInstance from "@/api/axiosInstance";
import requests from "@/api/request";
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen = () => {
  const [email, setEmail] = useState("asw0899@aa.aa"); // 이메일 입력 상태
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Redux 상태 가져오기
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);


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
        user_id: 99,
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
        const response = await axiosInstance.post<{ data: string }>('http://52.78.42.88/user/signup/kakao/url');
        const kakaoLoginUrl = response.data.data;
        console.log(kakaoLoginUrl);
  
        if (kakaoLoginUrl) {
            // 현재 페이지에서 직접 리다이렉트
            window.location.href = kakaoLoginUrl;
        } else {
            Alert.alert('오류', '카카오 로그인 URL을 가져오는 데 실패했습니다.');
        }
    } catch (error) {
        console.error('카카오 로그인 요청 오류:', error);
        Alert.alert('오류', '카카오 로그인 요청 중 문제가 발생했습니다.');
    }
  };


const checkAutoLogin = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const userInfoString = await AsyncStorage.getItem('userInfo');

    if (token && userInfoString) {
      const userInfo = JSON.parse(userInfoString);

      console.log('User is automatically logged in:', userInfo);

      // Redux 상태에 로그인 정보 디스패치
      dispatch(
        login({
          user_id: userInfo.user_id,
          account_email: userInfo.account_email,
          nickname: userInfo.nickname,
          phone_number: userInfo.phone_number,
          register_place_count: userInfo.register_place_count || 0, // 기본값 설정
          penalty_count: userInfo.penalty_count || 0,
          penalty_state: userInfo.penalty_state || false,
        })
      );
      router.replace("/tabs");
    } else {
      console.log('No token found, user needs to log in');
    }
  } catch (error) {
    console.error('Failed to check auto login:', error);
  }
};



useEffect(() => {
  checkAutoLogin();
}, []);

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