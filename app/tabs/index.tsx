import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import * as Location from 'expo-location'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { NaverMapView } from '@mj-studio/react-native-naver-map';


const shopData = [
  { title: '황금잉어빵', subtitle: '최근 방문 0명', distance: '0개 | 245m', id: 1 },
  { title: '달콤카페', subtitle: '최근 방문 5명', distance: '3개 | 320m', id: 2 },
  { title: '바삭바삭 핫도그', subtitle: '최근 방문 2명', distance: '2개 | 100m', id: 3 },
  { title: '따끈한 호떡', subtitle: '최근 방문 8명', distance: '5개 | 500m', id: 4 },
  { title: '멜팅아이스크림', subtitle: '최근 방문 3명', distance: '1개 | 210m', id: 5 },
  { title: '푸드트럭 1번', subtitle: '최근 방문 10명', distance: '6개 | 150m', id: 6 },
  { title: '푸드트럭 2번', subtitle: '최근 방문 1명', distance: '1개 | 400m', id: 7 },
  { title: '푸드트럭 3번', subtitle: '최근 방문 7명', distance: '4개 | 180m', id: 8 },
  { title: '푸드트럭 4번', subtitle: '최근 방문 9명', distance: '2개 | 300m', id: 9 },
  { title: '푸드트럭 5번', subtitle: '최근 방문 0명', distance: '0개 | 500m', id: 10 },
];
const HomeScreen = () => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState<string>(''); // 활성화된 메뉴
  const [showNotification, setShowNotification] = useState<boolean>(false); // 알림 박스 표시 여부
  const [buttonLayout, setButtonLayout] = useState<{ x: number; y: number }>({ x: 0, y: 0 }); // 버튼 위치 저장
  useEffect(() => {
    (async () => {
      try {
        const {granted} = await Location.requestForegroundPermissionsAsync();
        /**
         * Note: Foreground permissions should be granted before asking for the background permissions
         * (your app can't obtain background permission without foreground permission).
         */
        if(granted) {
          await Location.requestBackgroundPermissionsAsync();
        }
      } catch(e) {
        console.error(`Location request has been failed: ${e}`);
      }
    })();
  }, []);
  const handleMenuPress = (menu: string) => {
    setActiveMenu(menu);

    if (menu === 'recent') {
      // 최근 활동 클릭 시 알림 표시
      setShowNotification(true);

      // 5초 후 알림 숨김
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
  };

  return (
    <View style={styles.container}>
    
   
      {/* 상단 콘텐츠 */}
      <View style={styles.topContent}>
        {/* 주소 입력 바 */}
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

              {/* 메뉴 버튼 */}
      <View style={styles.menuButtons}>
        <TouchableOpacity
          style={[
            styles.menuButton,
            activeMenu === 'all' && styles.activeMenuButton,
          ]}
          onPress={() => handleMenuPress('all')}
        >
          <Ionicons name="menu-outline" size={16} color={activeMenu === 'all' ? '#fff' : '#333'} />
          <Text
            style={[
              styles.menuButtonText,
              activeMenu === 'all' && styles.activeMenuButtonText,
            ]}
          >
            전체 메뉴
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.menuButton,
            activeMenu === 'recent' && styles.activeMenuButton,
          ]}
          onPress={() => handleMenuPress('recent')}
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            setButtonLayout({ x: layout.x, y: layout.y + layout.height }); // 버튼 위치 저장
          }}
        >
          <Ionicons name="flame-outline" size={16} color={activeMenu === 'recent' ? '#fff' : '#333'} />
          <Text
            style={[
              styles.menuButtonText,
              activeMenu === 'recent' && styles.activeMenuButtonText,
            ]}
          >
            최근 활동
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.menuButton,
            activeMenu === 'distance' && styles.activeMenuButton,
          ]}
          onPress={() => handleMenuPress('distance')}
        >
          <Ionicons name="navigate-outline" size={16} color={activeMenu === 'distance' ? '#fff' : '#333'} />
          <Text
            style={[
              styles.menuButtonText,
              activeMenu === 'distance' && styles.activeMenuButtonText,
            ]}
          >
            거리순 보기
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-horizontal-outline" size={16} color="#333" />
        </TouchableOpacity>
      </View>

      {/* 말풍선 형태의 알림 박스 */}
      {showNotification && (
        <View
          style={[
            styles.notificationContainer,
            {
              top: buttonLayout.y + 100, // "최근 활동" 버튼 바로 아래
              left: buttonLayout.x - 85, // 버튼의 중앙과 맞춤
            },
          ]}
        >
          <View style={styles.triangle} />
          <View style={styles.notificationBox}>
            <Text style={styles.notificationTitle}>
              최근 활동이 있는 가게만 볼 수 있어요!
            </Text>
            <Text style={styles.notificationText}>
              • 최근 한 달 내에 방문 인증 성공 내역이 있어요.{'\n'}
              • 신규로 생성된 가게예요.
            </Text>
          </View>
        </View>
      )}
      </View>

      {/* 가게 리스트 */}
      <View style={styles.shopListContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {shopData.map((shop) => (
        <View style={styles.shopCard} key={shop.id}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }} // 이미지 URL 대체 가능
            style={styles.shopImage}
          />
          <Text style={styles.shopTitle}>{shop.title}</Text>
          <Text style={styles.shopSubtitle}>{shop.subtitle}</Text>
          <View style={styles.shopFooter}>
            <Text style={styles.shopDistance}>{shop.distance}</Text>
            <TouchableOpacity
                style={styles.visitButton}
                onPress={() => router.push(`./place/place-detail/${shop.id}`)} // 상세 페이지로 이동
              >
                <Text style={styles.visitButtonText}>방문하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  topContent: {
    flex: 1,
    padding: 10,
  },
  addressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addressInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  searchButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  activeMenuButton: {
    backgroundColor: '#ff7f7f',
  },
  menuButtonText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 5,
  },
  activeMenuButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  notificationContainer: {
    position: 'absolute',
    zIndex: 10, // 다른 요소 위에 표시
  },
  notificationBox: {
    backgroundColor: '#ffe4e4',
    padding: 20,
    borderRadius: 10,
    borderColor: '#ff7f7f',
  
   
  },
  triangle: {
    position: 'absolute',
    top: -10, // 위쪽에 삼각형 꼬리 배치
    left: '50%',
    marginLeft: -10, // 꼬리의 중앙 정렬
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#ffe4e4', // 말풍선의 배경색과 동일
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d9534f',
    marginBottom: 8,
  },
  notificationText: {
    fontSize: 12,
    color: '#d9534f',
    textAlign: 'left',
  },
  shopListContainer: {
  
  
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  shopCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: 250,
    marginRight: 10,
    elevation: 2,
  },
  shopImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  shopTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  shopSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
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

export default HomeScreen;
