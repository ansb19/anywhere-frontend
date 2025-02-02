// import React, { useEffect, useState, useRef } from 'react';
// import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { useDispatch } from 'react-redux';
// import { login } from '@/store/slices/authSlice';
// import { WebView } from 'react-native-webview';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const WebViewScreen = () => {
//     const { url } = useLocalSearchParams(); // URL 전달받기
//     const router = useRouter();
//     const dispatch = useDispatch();
//     const [showWebView, setShowWebView] = useState(false);
//     const webViewRef = useRef<WebView>(null); // WebView 타입 명시

//     const handleWebViewMessage =async (event: any) => {
//         const exp = "code=";
//         const searchIdx = event.nativeEvent.url.indexOf(exp);
//         if (searchIdx !== -1) {
      
      
//         try {
//             console.log('WebView에서 받은 메시지:', event.nativeEvent.data);
//             const messageData = JSON.parse(event.nativeEvent.data);
//             console.log('WebView에서 받은 메시지:', messageData);
//             if(messageData.data.user.id && messageData.data.user.email){

//             // Redux 상태에 사용자 데이터 저장
//             dispatch(
//                 login({
//                     user_id: messageData.data.user.id,
//                     account_email: messageData.data.user.email,
//                     nickname: messageData.data.user.nickname,
//                     phone_number: messageData.data.user.phone,
//                     register_place_count: 0, // 기본값 설정, 필요시 수정
//                     penalty_count: messageData.data.user.penalty_count,
//                     penalty_state: messageData.data.user.penalty_state,
//                 })
//             );
//               // 토큰과 사용자 정보 저장
//     await AsyncStorage.setItem('accessToken', "aa");
//     await AsyncStorage.setItem('userInfo', JSON.stringify({
//         user_id: messageData.data.user.id,
//         account_email: messageData.data.user.email,
//         nickname: messageData.data.user.nickname,
//         phone_number: messageData.data.user.phone,
//         register_place_count: 0, // 기본값 설정, 필요시 수정
//         penalty_count: messageData.data.user.penalty_count,
//         penalty_state: messageData.data.user.penalty_state,
//     }));

//             // 닉네임 페이지로 리다이렉트
//             router.replace('./auth/nickname');
//         }else{
//         router.replace('./auth/login');
//         }
//         } catch (error) {
//             console.error('WebView 메시지 처리 오류:', error);
//             router.replace('/auth/login'); // 오류 발생 시 에러 페이지로 이동
//         }
//           // 로그인 성공 시
//         }else{ 
//             console.log(event.nativeEvent.data)
//             if(event.nativeEvent.data == `{"message":"code 값이 필요"}`){
//                 const messageData = JSON.parse(event.nativeEvent.data);
//                 console.log(messageData.message)
//                 if(messageData.message ==   "code 값이 필요")
//                 { router.replace('./auth/login');}
//             }
//         }
//     };



  

//     return (
//         <View style={styles.container}>
//             {/* <View style={styles.loadingOverlay}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//                 <Text style={styles.loadingText}>로그인 중...</Text>
//             </View> */}
//             <WebView
//                 ref={webViewRef}
//                 source={{ uri: String(url) }}
//                 onMessage={handleWebViewMessage}
//                 onLoadStart={() => console.log('WebView 로드 시작')}
//                 onLoadEnd={() => console.log('WebView 로드 완료')}
//                 injectedJavaScript={`
//                     const pageContent = document.body.innerText; 
//                     window.ReactNativeWebView.postMessage(pageContent);
//                 `}
//                 // style={{ display: 'none', flex: 1 }}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     loadingOverlay: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(255, 255, 255, 0.8)', // 반투명 배경
//     },
//     loadingText: {
//         marginTop: 10,
//         fontSize: 16,
//         color: '#000',
//     },
// });
// export default WebViewScreen;