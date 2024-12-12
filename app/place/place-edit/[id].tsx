import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
 
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
export default function PlaceEditScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const local = useLocalSearchParams().id;

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, [navigation, local]);

 
 
  return (
    <ScrollView style={styles.container}>
      {/* 가게 정보 & 메뉴 */}
      <View style={styles.section}>
        <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton} >
        <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
          <Text style={styles.sectionTitle}>가게 정보 & 메뉴</Text>
          <TouchableOpacity>
            <Text style={styles.editButton}>정보수정</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.updateDate}>2023.05.15 업데이트</Text>

        {/* 가게 정보 */}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>가게이름</Text>
          <Text style={styles.infoValue}>{"황금잉어빵"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>가게형태</Text>
          <Text style={styles.infoValue}>길거리</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>출몰시기</Text>
          <Text style={styles.infoValue}>월 화 수 목 금 토 일</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>출몰 시간대</Text>
          <Text style={styles.infoValue}>제보가 필요해요 😢</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>결제방식</Text>
          <Text style={styles.infoValue}>현금 · 카드 · 계좌이체</Text>
        </View>

        {/* 메뉴 */}
        <View style={styles.menu}>
          <Text style={styles.menuIcon}>🍞</Text>
          <Text style={styles.menuText}>붕어빵</Text>
        </View>
      </View>

      {/* 가게 사진 */}
      <View style={styles.section}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>가게 사진</Text>
          <TouchableOpacity>
            <Text style={styles.editButton}>사진 제보</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.photoPlaceholder}>
          <Text style={styles.photoText}>사진을 제보해주세요!</Text>
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
  backButton: {
    marginRight: 16, // 버튼과 다른 요소 간 간격
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
  updateDate: {
    fontSize: 12,
    color: "#666",
    marginBottom: 16,
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
  photoPlaceholder: {
    height: 100,
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
});
