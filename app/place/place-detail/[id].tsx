import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

import { useRouter, useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { examplePlaces, Place } from "@/types/place";

export default function PlaceDetailScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const local = useLocalSearchParams().id;

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    console.log(local);
  }, [navigation, local]);

  const getIdAsNumber = (id: string | string[] | undefined): number => {
    if (typeof id === "string") {
      return parseInt(id, 10); // 문자열이면 숫자로 변환
    } else if (Array.isArray(id)) {
      return parseInt(id[0], 10); // 배열이면 첫 번째 요소를 숫자로 변환
    } else {
      throw new Error("Invalid id value"); // id가 없거나 올바르지 않을 때 예외 처리
    }
  };

  const id = getIdAsNumber(local); // 숫자로 변환된 id

  const [selectedExamplePlace, setSelectedExamplePlace] = useState<Place>(
    examplePlaces[id]
  );

  const images = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ];

  return (
    <ScrollView style={styles.container}>
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
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/512/512870.png" }}
            style={styles.icon}
          />
          <View style={styles.content}>
            <Text style={styles.title}>황금잉어빵</Text>
            <Text style={styles.title}>황금잉어빵</Text>
         
            <View style={styles.meta}>
            <Text style={styles.subtitle}>최근 한달 0명이 방문 성공</Text>
            <Text style={styles.metaText}>0개 <MaterialIcons name="favorite" size={12} color="gray" /> 245m</Text>
          
           
          </View>
          </View>
         
        </View>
      </View>

      <View style={styles.commentContainer}>
        <Text style={styles.commentText}>
          {selectedExamplePlace.comment}
          dsadsalk;fasdl'jk;fsdgaljk;fsdgal'jk;fsdjkl';fdasljk;fsdlnjk;hfdsaljk;fdasljk;fasdlhjk;fasdljk;fdaslhjk;fdaslhjk;fsdalhjk;fasdlhjkfasdlhjkfasdlhjkfsdalhjkfasdlhjkfasdlhjkfasdlhjkfdaslhjkfdaslhjkfdaslhjkfasdhjlkfasdlhjkfasdlhjkfsdalhjkfasdlhjkfsdalhjkfsdglfasdljk;fasdlhjk;fasdljk;fsdljk;fasdjkl;fasdljk;fsdaljk;fsdaljk;fasdljk;fsdaljk;fasdljk;fasdljk;fdasljk;fsdaljk;fasdljk;fsdaljk;
        </Text>
      </View>

      {/* Icon Buttons */}
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="share-alt" size={24} color="black" />
          <Text style={styles.iconText}>공유하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="map-marker" size={24} color="black" />
          <Text style={styles.iconText}>길 안내</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="pencil" size={24} color="black" />
          <Text style={styles.iconText}>리뷰 쓰기</Text>
        </TouchableOpacity>
      </View>

      {/* Map Section */}
      {/* <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 35.166,
            longitude: 129.072,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={{ latitude: 35.166, longitude: 129.072 }} />
        </MapView>
        <Text style={styles.address}>부산광역시 금정구 부곡동 277-3</Text>
      </View> */}

      {/* Photo Carousel */}
      {/* <ScrollView horizontal style={styles.carousel}>
        {[...Array(5)].map((_, index) => (
          <Image
            
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.photo}
          />
        ))}
      </ScrollView> */}

      <View style={styles.imageContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.image} />
          ))}
        </ScrollView>
      </View>
      {/* Visit Info */}
      <View style={styles.visitInfo}>
        <Text style={styles.visitText}>아직 방문 인증 내역이 없어요 :(</Text>
        <View style={styles.visitCounts}>
          <View style={styles.successContainer}>
            {" "}
            <Text style={styles.success}>
              방문 성공 {selectedExamplePlace.exist_count}명
            </Text>
          </View>
          <View style={styles.failureContainer}>
            {" "}
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
    flex:1,
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
    justifyContent:"space-between",
    alignItems: "center"
  },
  metaText: {
    fontSize: 12,
    color: "gray",
    marginLeft: 5,
    textAlign:"center"
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
  mapContainer: {
    height: 200,
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  map: {
    flex: 1,
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
});
