// import React, { useEffect } from "react";

// import * as Location from 'expo-location'
// import { Platform, StyleSheet, View } from "react-native";

// import MapView, { Marker } from "react-native-maps";

// const MapScreen = () => {
//     useEffect(() => {
//         // 위치 권한 요청
//         (async () => {
//           try {
//             const { granted } = await Location.requestForegroundPermissionsAsync();
//             if (!granted) {
//               console.log('Location permission not granted');
//             }
//           } catch (e) {
//             console.error(e);
//           }
//         })();
//       }, []);

//   return (
//     <View style={styles.container}>
//         {Platform.OS != "windows"?
// <MapView
//   style={{ flex: 1 }}
//   initialRegion={{
//     latitude: 37.5665, // 서울 위도
//     longitude: 126.9780, // 서울 경도
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   }}
  
// ><Marker coordinate={{ latitude: 37.5665, longitude: 126.9780 }} /></MapView>
// : <></>
// }
//   </View>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//       },
//       map: {
//         flex: 1,
//       },

// });

// export default MapScreen;