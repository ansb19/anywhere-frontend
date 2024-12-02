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
import {   createUser,  test } from '@/services/apiService';
import { useRouter } from "expo-router";


import { User } from "@/types/user";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
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


  const handleLogin = () => {
    dispatch(logout()); // 로그인 상태 업데이트
   
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
        <TouchableOpacity
                style={styles.visitButton}
                onPress={() =>handleCreateAndGetDataUserName()} // 상세 페이지로 이동
              >
                <Text style={styles.visitButtonText}>테스트</Text>
            </TouchableOpacity>
        <Text style={styles.sectionTitle}>테스트용 : {userInfo?.nickname}</Text>

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
                ? user.phone_number.replace(/(\d{3})-(\d{4})-(\d{4})/, "$1-$2-****")
                : "정보 없음"}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>로그아웃</Text>
            <TouchableOpacity     style={styles.visitButton} onPress={() =>handleLogin()}>
              <Text style={styles.visitButtonText}>로그아웃</Text>
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