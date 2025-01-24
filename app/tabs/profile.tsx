// app/screens/profileScreen.tsx
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,

  Alert,
  Animated,
  Button,

} from "react-native";

import { useState } from 'react';
import {   createUser } from '@/services/apiService';
import { useRouter } from "expo-router";


import { User } from "@/types/user";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import requests from "@/api/request";
import axiosInstance from "@/api/axiosInstance";
import axios from "axios";
import React from "react";
const shopData = [
  { title: '황금잉어빵', subtitle: '양산시 물금읍 아아아아아아아아 40', distance: '0개 | 245m', id: 1 },
  { title: '달콤카페', subtitle: '양산시 물금읍 아아아아아아아아 40', distance: '3개 | 320m', id: 2 },
  { title: '바삭바삭 핫도그', subtitle: '양산시 물금읍 아아아아아아아아 40', distance: '2개 | 100m', id: 3 },
  { title: '따끈한 호떡', subtitle: '양산시 물금읍 아아아아아아아아 40', distance: '5개 | 500m', id: 4 },
  { title: '멜팅아이스크림', subtitle: '양산시 물금읍 아아아아아아아아 40', distance: '1개 | 210m', id: 5 },
  { title: '푸드트럭 1번', subtitle: '양산시 물금읍 아아아아아아아아 40', distance: '6개 | 150m', id: 6 },
  { title: '푸드트럭 2번', subtitle: '양산시 물금읍 아아아아아아아아 40', distance: '1개 | 400m', id: 7 },
  { title: '푸드트럭 3번', subtitle: '양산시 물금읍 아아아아아아아아 40', distance: '4개 | 180m', id: 8 },
  { title: '푸드트럭 4번', subtitle: '양산시 물금읍 아아아아아아아아 40', distance: '2개 | 300m', id: 9 },
  { title: '푸드트럭 5번', subtitle: '양산시 물금읍 아아아아아아아아 40', distance: '0개 | 500m', id: 10 },
];

export default function ProfileScreen() {

  const router = useRouter();
  const [currentName, setCurrentName] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();


  const handleLogout = async() => {
    dispatch(logout()); // 로그인 상태 업데이트

    await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('userInfo');
   
  };
  const handleDelete = async() => {
    dispatch(logout()); // 로그인 상태 업데이트

    await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('userInfo');
      console.log(`${requests.logout(1,'kakao')}`);
      try {
        const response = await axiosInstance.delete(`${requests.logout(user!.user_id,"kakao")}`, {
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'MyApp/1.0.0', // User-Agent 설정
          },
          withCredentials: true, // 쿠키 및 인증 정보 포함 (필요 시)
        });
    
        // 요청 성공 시 처리
      
        Alert.alert('성공', '카카오 로그아웃 완료 했습니다.');
        console.log(`User successfully withdrawn: ${JSON.stringify(response.data)}`);
      } catch (err) {
        // 에러 핸들링
        if (axios.isAxiosError(err) && err.response) {
          const errorMessage = JSON.stringify(err.response.data); 
          Alert.alert('성공', '카카오 로그아웃 요청 실패 했습니다.');
          console.error(`Error: ${errorMessage}`);
        } else {
          const errorMessage = (err as Error).message;
          Alert.alert('오류', '카카오 로그아웃웃 요청 중 문제가 발생했습니다.');
          console.error(`Request failed: ${errorMessage}`);
        }
      }
   
  };
  // 이메일 마스킹 처리 함수
  const maskEmail = (email: string) => {
    const [localPart] = email.split("@"); // @ 기준으로 앞부분 추출
    return `${localPart}@****`;
  };

  const handleCreateAndGetDataUserName = async () => {
    try {
      const updatedInfo = await createUser();


      setUserInfo(updatedInfo.data);


      Alert.alert('Success', 'User name updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update user name');
    }
  };
  const handleGetUserInfo = async () => {
    Alert.alert('Success', 'User name updated successfully');
  };

  return (
    <ScrollView style={styles.container}>
    {/* 유저 정보 */}
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>프로필</Text>
      </View>
     

      {/* 유저 정보 */}
      <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>이름</Text>
            <Text style={styles.infoValue}>{user?.account_email ? maskEmail(user.account_email) : "정보 없음"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>닉네임</Text>
            <Text style={styles.infoValue}>{user?.nickname || "정보 없음"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>핸드폰 번호</Text>
            <Text style={styles.infoValue}>
            {user?.phone_number
    ? user.phone_number
        .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3") // 하이픈 없는 번호를 처리
        .replace(/(\d{3})-(\d{4})-(\d{4})/, "$1-$2-****") // 마지막 네 자리를 마스킹
    : "정보 없음"}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>로그아웃</Text>
            <TouchableOpacity     style={styles.visitButton} onPress={() =>handleLogout()}>
              <Text style={styles.visitButtonText}>로그아웃</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>회원탈퇴</Text>
            <TouchableOpacity     style={styles.visitButton} onPress={() =>handleDelete()}>
              <Text style={styles.visitButtonText}>회원탈퇴</Text>
            </TouchableOpacity>
          </View>
      

      
    </View>

    {/* 가게 제보 */}
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle} >제보 한 가게 ({shopData.length}개)</Text>
      
      </View>
      <View style={styles.shoList}>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}> 
        {shopData.map((shop) => (
        <View style={styles.shopCard} key={shop.id}>
        
          <Text style={styles.shopTitle}>{shop.title}</Text> 
          <Text style={styles.shopSubTitle}>{shop.subtitle}</Text> 
          
          {/* <InfiniteLoopingText text={shop.subtitle  ? shop.subtitle : "주소가 없습니다."}></InfiniteLoopingText> */}
          <View style={styles.shopFooter}>
            <Text style={styles.shopDistance}>{shop.distance}</Text>
            <TouchableOpacity
                style={styles.visitButton}
                onPress={() => router.push(`../place/place-edit/${shop.id}`)} // 상세 페이지로 이동
              >
                <Text style={styles.visitButtonText}>수정하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
        </ScrollView>
      </View>
    </View>

    {/* 리뷰 */}
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>리뷰 0개</Text>
        <TouchableOpacity>
          <Text style={styles.editButton}>리뷰 쓰기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.reviewBox}>
        <Text style={styles.reviewScore}>평균 별점</Text>
        <Text style={styles.reviewValue}>0.0점</Text>
      </View>
    </View>
    
  </ScrollView>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  editButton: {
    fontSize: 14,
    color: "#ff5c5c",
  },
 
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  shoList: {
    height: 150,
    padding:10,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  photoText: {
    fontSize: 14,
    color: "#aaa",
  },
  reviewBox: {
    height: 100,
    backgroundColor: "#ffeeee",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 8,
  },
  reviewScore: {
    fontSize: 14,
    color: "#666",
  },
  reviewValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff5c5c",
  },
  shopCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: 250,
    marginRight: 10,
    elevation: 2,
    overflow: "hidden", 
  },
 
  shopTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  shopSubTitle: {
    fontSize: 14,

    marginBottom: 5,
  },
 
  shopFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shopDistance: {
    fontSize: 12,
    color: '#666',
  },
  visitButton: {
    backgroundColor: '#ff7f7f',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  visitButtonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
});