import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Share,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "@/store/hooks";
import { Place } from "@/types/place";

import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
export default function PlaceDetailScreen() {
  const imageRef = useRef<View>(null);
  const router = useRouter();
  const navigation = useNavigation();
  const local = useLocalSearchParams().id; // URL에서 id 가져오기
  const places = useAppSelector((state) => state.place.places); // 상태에서 places 가져오기

  const [selectedExamplePlace, setSelectedExamplePlace] =
    useState<Place | null>(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  // 공유 함수
  const sharePlace = async () => {
    try {
      if (!imageRef.current) {
        console.error("View가 렌더링되지 않았습니다.");
        return;
      }
      if (!status?.granted) {
        await requestPermission();
      }
      // View를 캡처하여 URI 생성
      const uri = await captureRef(imageRef, {
        format: "jpg",
        quality: 1,
      });
      await MediaLibrary.saveToLibraryAsync(uri);
      const message = `${
        selectedExamplePlace!.place_name
      }에 대해 확인해보세요! \nAnyWhere앱에서 확인해보세요요`;
      // 공유 기능 실행
      await Share.share({
        url: uri,
        message,
        title: `${selectedExamplePlace!.place_name}에 대한 정보`,
      });
    } catch (error) {
      console.error("이미지 공유 중 오류 발생:", error);
    }
  };
  const [region, setRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  // 화면이 포커스될 때마다 실행
  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);

      // id를 숫자로 변환하고, places에서 해당 데이터를 가져오기
      const id = typeof local === "string" ? parseInt(local, 10) : null;
      const selectedPlace = places.find((place) => place.place_id === id);

      if (selectedPlace) {
        setSelectedExamplePlace(selectedPlace);

        // 선택된 장소에 따라 region 업데이트
        setRegion({
          latitude: selectedPlace.lat,
          longitude: selectedPlace.lon,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      } else {
        console.error("Place not found for id:", local);
      }

      setIsLoading(false); // 로딩 상태 해제
    }, [local, places])
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>로딩 중...</Text>
      </View>
    );
  }
  if (!selectedExamplePlace) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>가게 정보를 찾을 수 없습니다.</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.retryButton}
        >
          <Text style={styles.retryButtonText}>뒤로 가기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View ref={imageRef} style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <FontAwesome name="arrow-left" size={24} color="black" />
          </TouchableOpacity>

          <View style={styles.card}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/512/512870.png",
              }}
              style={styles.icon}
            />
            <View style={styles.content}>
              <Text style={styles.title}>
                {selectedExamplePlace.place_name}
              </Text>
              <View style={styles.meta}>
                <Text style={styles.subtitle}>
                  최근 한달 {selectedExamplePlace.exist_count}명이 방문 성공
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.metaText}>
                    {selectedExamplePlace.exist_count}명
                  </Text>
                  <MaterialIcons name="favorite" size={12} color="gray" />
                  <Text style={styles.metaText}>245m</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Comment Section */}
        <View style={styles.commentContainer}>
          <Text style={styles.commentText}>{selectedExamplePlace.comment}</Text>
        </View>

        {/* Icon Buttons */}
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconButton} onPress={sharePlace}>
            <FontAwesome name="share-alt" size={24} color="black" />
            <Text style={styles.iconText}>공유하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="map-marker" size={24} color="black" />
            <Text style={styles.iconText}>길 안내</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              router.push(`../place-review/${selectedExamplePlace.place_name}`)
            }
          >
            <FontAwesome name="pencil" size={24} color="black" />
            <Text style={styles.iconText}>리뷰 쓰기</Text>
          </TouchableOpacity>
        </View>

     

        {/* Photo Carousel */}
        <ScrollView horizontal style={styles.carousel}>
          {[...Array(5)].map((_, index) => (
            <Image
              key={index}
              source={{ uri: "https://via.placeholder.com/150" }}
              style={styles.photo}
            />
          ))}
        </ScrollView>

        {/* Visit Info */}
        <View style={styles.visitInfo}>
          <Text style={styles.visitText}>아직 방문 인증 내역이 없어요 :(</Text>
          <View style={styles.visitCounts}>
            <View style={styles.successContainer}>
              <Text style={styles.success}>
                방문 성공 {selectedExamplePlace.exist_count}명
              </Text>
            </View>
            <View style={styles.failureContainer}>
              <Text style={styles.failure}>
                방문 실패 {selectedExamplePlace.non_exist_count}명
              </Text>
            </View>
          </View>
          <Text style={styles.prompt}>
            방문 인증으로 가게의 최근 활동을 알려주세요!
          </Text>
        </View>

        {/* Footer Buttons */}
        <View style={styles.footerButtons}>
          <TouchableOpacity style={styles.favoriteButton}>
            <Text style={styles.buttonText}>즐겨찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.verifyButton}>
            <Text style={styles.buttonText}>방문 인증하기</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  backButton: {
    marginRight: 16, // 버튼과 다른 요소 간 간격
  },
  card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 12,
    color: "red",
    marginTop: 4,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaText: {
    fontSize: 12,
    color: "gray",
    marginLeft: 5,
    textAlign: "center",
  },
  commentContainer: {
    padding: 16,
    margin: 15,
    backgroundColor: "#dfe1e2",
    borderRadius: 8,
    color: "#666",
  },
  commentText: {
    fontSize: 15,
    lineHeight: 24, // 줄 간격
    letterSpacing: 1, // 자간
  },

  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    margin: 15,

    backgroundColor: "#b6b6b6",
    borderRadius: 10,
  },
  iconButton: {
    alignItems: "center",
  },
  iconText: {
    fontSize: 12,
    marginTop: 4,
  },

  loadingText: {
    textAlign: "center",
    marginTop: 20,
    color: "#aaa",
  },
  address: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 7,
  },
  image: {
    width: 120, // 이미지 너비
    height: 120, // 이미지 높이
    marginHorizontal: 8, // 이미지 간 간격
    borderRadius: 10, // 둥근 모서리
  },
  carousel: {
    marginVertical: 10,
    paddingLeft: 16,
  },
  photo: {
    width: 150,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
  visitInfo: {
    padding: 16,
    alignItems: "center",
  },
  visitText: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "left",
  },
  visitCounts: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 8,
  },

  successContainer: {
    width: "30%",
    backgroundColor: "#008006",
    padding: 5,
    borderRadius: 10,
  },
  success: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 18,
  },

  failureContainer: {
    width: "30%",

    backgroundColor: "red",
    padding: 5,
    borderRadius: 10,
  },
  failure: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  prompt: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
  },
  favoriteButton: {
    flex: 1,
    backgroundColor: "#eee",
    paddingVertical: 10,
    marginRight: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  verifyButton: {
    flex: 1,
    backgroundColor: "#ffcccc",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  retryButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 8,
    alignItems: "center",
  },
  retryButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
});
