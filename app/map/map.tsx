import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker, MapPressEvent, LongPressEvent, PoiClickEvent } from "react-native-maps";

interface MapScreenProps {
  onLocationSelect: (latitude: number, longitude: number) => void;
}

const MapScreen: React.FC<MapScreenProps> = ({ onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const handleMapPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    console.log("터치 좌표:", latitude, longitude);
    setMarkerPosition({ latitude, longitude }); // 마커 위치 업데이트
    onLocationSelect(latitude, longitude); // 부모 컴포넌트에 좌표 전달
  };

  const handleMapPress2 = (event: PoiClickEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    console.log("터치 좌표:", latitude, longitude);
    setMarkerPosition({ latitude, longitude }); // 마커 위치 업데이트
    onLocationSelect(latitude, longitude); // 부모 컴포넌트에 좌표 전달
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.5665, // 서울 중심
          longitude: 126.9780,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handleMapPress} // 터치 이벤트 핸들러
        onPoiClick={handleMapPress2}
     
        
      >
        {markerPosition && (
          <Marker
            coordinate={markerPosition}
            title="선택된 위치"
            description={`위도: ${markerPosition.latitude}, 경도: ${markerPosition.longitude}`}
          />
        )}
      </MapView>
      <View style={styles.coordinatesContainer}>
        <Text style={styles.coordinatesText}>
          {markerPosition
            ? `위도: ${markerPosition.latitude}, 경도: ${markerPosition.longitude}`
            : "위치를 선택하세요"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  coordinatesContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 10,
    borderRadius: 5,
  },
  coordinatesText: {
    fontSize: 14,
    color: "#333",
  },
});

export default MapScreen;
