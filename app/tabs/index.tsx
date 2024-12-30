import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAppSelector } from "@/store/hooks";
import MapView, { Marker } from "react-native-maps";

const HomeScreen = () => {
  const router = useRouter();
  const places = useAppSelector((state) => state.place.places);
  const [activeMenu, setActiveMenu] = useState<string>("");
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [buttonLayout, setButtonLayout] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (granted) {
          await Location.requestBackgroundPermissionsAsync();
        }
      } catch (e) {
        console.error(`Location request has been failed: ${e}`);
      }
    })();
  }, []);

  const handleMenuPress = (menu: string) => {
    setActiveMenu(menu);
    if (menu === "recent") {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
  };
  const [region, setRegion] = useState({
    latitude: 37.5665, // 서울 중심
    longitude: 126.9780,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  return (
    <View style={styles.container}>
      {/* Map as Background */}
         {/* Map */}
         <MapView
        style={StyleSheet.absoluteFillObject}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        {/* Markers */}
        {places.map((place) => (
          <Marker
            key={place.place_id}
            coordinate={{
              latitude: place.lat,
              longitude: place.lon,
            }}
            title={place.place_name}
            description={place.comment}
          />
        ))}
      </MapView>
      {/* Overlay Content */}
      <View style={styles.overlay}>
        {/* Top Content */}
        <View style={styles.topContent}>
          {/* Address Bar */}
          <View style={styles.addressBar}>
            <TextInput
              style={styles.addressInput}
              placeholder="여기에 주소를 입력해주세요"
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="chevron-forward-outline" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Menu Buttons */}
          <View style={styles.menuButtons}>
            <TouchableOpacity
              style={[
                styles.menuButton,
                activeMenu === "all" && styles.activeMenuButton,
              ]}
              onPress={() => handleMenuPress("all")}
            >
              <Ionicons
                name="menu-outline"
                size={16}
                color={activeMenu === "all" ? "#fff" : "#333"}
              />
              <Text
                style={[
                  styles.menuButtonText,
                  activeMenu === "all" && styles.activeMenuButtonText,
                ]}
              >
                전체 메뉴
              </Text>
            </TouchableOpacity>
            {/* ... other menu buttons */}
          </View>
        </View>

        {/* Shop List */}
        <View style={styles.shopListContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {places.length > 0 ? (
              places.map((shop) => (
                <View style={styles.shopCard} key={shop.place_id}>
                  <Image
                    source={{ uri: "https://via.placeholder.com/150" }}
                    style={styles.shopImage}
                  />
                  <Text style={styles.shopTitle}>{shop.place_name}</Text>
                  <Text style={styles.shopSubtitle}>{shop.comment}</Text>
                  <View style={styles.shopFooter}>
                    <Text style={styles.shopDistance}>
                      {shop.lat} | {shop.lon}
                    </Text>
                    <TouchableOpacity
                      style={styles.visitButton}
                      onPress={() =>
                        router.push(`./place/place-detail/${shop.place_id}`)
                      }
                    >
                      <Text style={styles.visitButtonText}>방문하기</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Text style={{ textAlign: "center" }}>가게 정보가 없습니다.</Text>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  topContent: {
    flex: 1,
    padding: 10,
  },
  addressBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  addressInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  searchButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  menuButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  activeMenuButton: {
    backgroundColor: "#ff7f7f",
  },
  menuButtonText: {
    fontSize: 12,
    color: "#333",
    marginLeft: 5,
  },
  activeMenuButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  shopListContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  shopCard: {
    backgroundColor: "#fff",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 10,
    width: 250,
    marginRight: 10,
  },
  shopImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  shopTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  shopSubtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },
  shopFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shopDistance: {
    fontSize: 12,
    color: "#666",
  },
  visitButton: {
    backgroundColor: "#ff7f7f",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  visitButtonText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
