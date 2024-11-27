import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { useRouter,useLocalSearchParams } from 'expo-router';
import { useNavigation } from "@react-navigation/native";


export default function PlaceDetailScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const local = useLocalSearchParams();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, [navigation, local]);

  // 실제 데이터 기반으로 디테일 렌더링
  const shopData = {
    1: { title: '황금잉어빵', description: '맛있는 잉어빵을 판매하는 곳입니다.' },
    2: { title: '달콤카페', description: '분위기 좋은 카페입니다.' },
    3: { title: '바삭바삭 핫도그', description: '바삭한 핫도그를 판매하는 곳입니다.' },
    4: { title: '따끈한 호떡', description: '달콤한 호떡으로 유명한 곳입니다.' },
  };

  
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
    <FontAwesome name="arrow-left" size={24} color="black" />
  </TouchableOpacity>
        <Text style={styles.logo}>🍞</Text>
        <View>
          <Text style={styles.title}>황금잉어빵{local.id}</Text>
          <Text style={styles.subtitle}>최근 방문 0명이 방문 성공</Text>
        </View>
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

      {/* Visit Info */}
      <View style={styles.visitInfo}>
        <Text style={styles.visitText}>아직 방문 인증 내역이 없어요 :(</Text>
        <View style={styles.visitCounts}>
          <Text style={styles.success}>방문 성공 0명</Text>
          <Text style={styles.failure}>방문 실패 0명</Text>
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    marginRight: 16, // 버튼과 다른 요소 간 간격
  },
  logo: {
    fontSize: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  iconButton: {
    alignItems: 'center',
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
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  address: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
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
    alignItems: 'center',
  },
  visitText: {
    fontSize: 16,
    marginBottom: 8,
  },
  visitCounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 8,
  },
  success: {
    color: 'green',
    fontWeight: 'bold',
  },
  failure: {
    color: 'red',
    fontWeight: 'bold',
  },
  prompt: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  favoriteButton: {
    flex: 1,
    backgroundColor: '#eee',
    paddingVertical: 10,
    marginRight: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  verifyButton: {
    flex: 1,
    backgroundColor: '#ffcccc',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
