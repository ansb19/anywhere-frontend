import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import axios from "axios";
import { login } from "@/store/slices/authSlice";
import axiosInstance from "@/api/axiosInstance";
import { updateNickname } from "@/services/apiService";

const NicknameScreen = () => {


  const [showNicknameInput, setShowNicknameInput] = useState(false); // 닉네임 입력 화면 여부
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [nickname, setNickname] = useState(user?.nickname || ""); // 닉네임 상태 초기화

  useEffect(() => {
    if (!user) return;

    const message = "닉네임을 변경하시겠습니까?";

    if (Platform.OS === 'web') {
        const result = window.confirm(message);
        if (result) {
            setShowNicknameInput(true);
        } else {
            router.replace('/tabs');
        }
    } else {
        Alert.alert(
            "닉네임 변경",
            message,
            [
                {
                    text: "건너뛰기",
                    onPress: () => router.replace('/tabs'),
                    style: "cancel",
                },
                {
                    text: "변경",
                    onPress: () => setShowNicknameInput(true),
                },
            ],
            { cancelable: false }
        );
    }
}, [user, router]);

  const handleNicknameSubmit = async () => {
    if (nickname.trim().length < 2) {
      const errorMessage = "닉네임은 최소 2글자 이상이어야 합니다.";
      if (Platform.OS === "web") {
          alert(errorMessage);
      } else {
          Alert.alert("Invalid Nickname", errorMessage);
      }
      return;
  }
    try {
      // 서버로 닉네임 업데이트 요청
      console.log(user?.user_id);
      await updateNickname(user!,nickname);

      // Redux 상태 업데이트
      dispatch(
        login({
          ...user,
          nickname,
        })
      );

      // 메인 탭 네비게이션으로 이동
      router.replace("/tabs");
    } catch (error) {
      console.error("Error updating nickname:", error);
      Alert.alert("Error", "Failed to update nickname. Please try again.");
    }
  };

  if (!showNicknameInput) {
    return null; // 닉네임 입력 화면이 아닌 경우 아무것도 표시하지 않음
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>닉네임을 변경 하세요!!</Text>
      <TextInput
        style={styles.input}
        placeholder="닉네임적 작성해주세요(2글자이상)"
        value={nickname}
        onChangeText={setNickname}
      />
      <Button title="변경하기" onPress={handleNicknameSubmit} />
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
