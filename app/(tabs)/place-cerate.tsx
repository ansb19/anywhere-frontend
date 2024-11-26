import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAppSelector } from "@/store/hooks";
import * as Clipboard from "expo-clipboard";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
console.log(SCREEN_WIDTH);
// export interface Place {

//   place_name: string; // 장소 이름 (최대 40자)
//   nickname: string; // 닉네임 (Foreign Key, 최대 20자)
//   lat: number; // 위도
//   lon: number; // 경도
//   category_id: number; // 카테고리 ID (Foreign Key)
//   created_at: Date; // 생성 일시
//   start_date: Date; // 시작 일시
//   end_date: Date; // 종료 일시
//   photo_s3_url: string[]; // S3 URL 배열 (최대 500개)
//   charge_id: number; // 요금 ID (Foreign Key)
//   comment: string; // 코멘트 (최대 1000자)
//   tag: string[]; // 태그 배열 (최대 1000개)
//   exist_count: number; // 존재 확인 수
//   not_exist_count: number; // 존재하지 않음 확인 수
//   owner: boolean; // true: 가게 주인, false: 제보자
// }
const PlaceCerateScreen: React.FC = () => {
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<
    string[]
  >([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [openingTime, setOpeningTime] = useState<string>("");
  const [closingTime, setClosingTime] = useState<string>("");

  const user = useAppSelector((state) => state.auth.user);
  const [selectedStoreType, setSelectedStoreType] = useState<string | null>(
    null
  );

  const [inputText, setInputText] = useState<string>(""); // 입력된 텍스트 상태
  const storeTypes: { [key: number]: string } = {
    1: "길거리",
    2: "매장",
    3: "편의점",
  };
  const paymentMethods: { [key: number]: string } = {
    1: "현금",
    2: "카드",
    3: "계좌이체",
  };

  const days: string[] = ["월", "화", "수", "목", "금", "토", "일"];
  const router = useRouter();

  const createPlace = () => {
    // 닉네임 작성 화면으로 이동
    router.replace("./nickname");
  };
  const togglePaymentMethod = (method: string) => {
    setSelectedPaymentMethods((prev) =>
      prev.includes(method)
        ? prev.filter((item) => item !== method)
        : [...prev, method]
    );
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((item) => item !== day) : [...prev, day]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>가게 제보</Text>
      <Text style={styles.label}>가게 이름</Text>
      <TextInput
        style={styles.addressInput}
        placeholder="여기에 주소를 입력해주세요"
        placeholderTextColor="#aaa"
      />

      {/* TODO 지도  부분 만들어야함*/}
      <Text style={styles.label}>지도</Text>
      <View style={styles.mapContainer}>
        <Text style={styles.label}>지도</Text>
      </View>
      <View style={styles.locationContainer}>
        <Text style={styles.label}>
          위도(lat): <Text style={styles.highlight}>{"12"} </Text>
        </Text>
        <Text style={styles.label}>
          경도(lon): <Text style={styles.highlight}>{"12"}</Text>
        </Text>
      </View>

      <Text style={styles.label}>가게형태 (선택)</Text>

      <View style={styles.optionsContainer}>
        {Object.entries(storeTypes).map(([key, type]) => (
          <TouchableOpacity
            key={key} // 객체의 키를 사용
            style={[
              styles.option,
              selectedStoreType === type && styles.selectedOption,
            ]}
            onPress={() => setSelectedStoreType(type)} // 선택된 타입 설정
          >
            <Text style={styles.optionText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>결제방식 (선택) *다중선택 가능</Text>
      <View style={styles.optionsContainer}>
        {Object.entries(paymentMethods).map(([key, type]) => (
          <TouchableOpacity
            key={key} // 객체의 키를 사용
            style={[
              styles.option,
              selectedPaymentMethods.includes(type) && styles.selectedOption,
            ]}
            onPress={() => togglePaymentMethod(type)} // 선택된 타입 설정
          >
            <Text style={styles.optionText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>출몰시기 (선택) *다중선택 가능</Text>
      <View style={styles.optionsContainer}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.option,
              selectedDays.includes(day) && styles.selectedOption,
            ]}
            onPress={() => toggleDay(day)}
          >
            <Text style={styles.optionText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>출몰 시간대 (선택) *다중선택 가능</Text>
      <View style={styles.timeContainer}>
        <TextInput
          style={styles.timeInput}
          placeholder="오전 11시"
          value={openingTime}
          onChangeText={setOpeningTime}
        />
        <Text style={styles.timeLabel}>부터</Text>
        <TextInput
          style={styles.timeInput}
          placeholder="오후 8시"
          value={closingTime}
          onChangeText={setClosingTime}
        />
        <Text style={styles.timeLabel}>까지</Text>
      </View>

      <View style={styles.menuCategoryContainer}>
        <Text style={styles.label}>메뉴 카테고리</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>추가하기</Text>
        </TouchableOpacity>
      </View>
         {/* 입력 영역 */}
         <TextInput
        style={styles.textInput}
        multiline
        placeholder="Type your text here"
        value={inputText}
        onChangeText={setInputText}
        placeholderTextColor="#aaa"
      />

    

      

      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>가게 등록하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  addressInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    borderWidth: 1, // 테두리 두께
    borderColor: "#ccc", // 테두리 색상
    borderRadius: 5, // 테두리 둥글게 처리 (선택 사항)
    padding: 10,
  },
  mapContainer: {
    width: "100%",
    height: 100,
    backgroundColor: "green",
  },
  locationContainer: {
    flexDirection: "row", // 가로 방향 정렬

    alignItems: "center", // 세로 방향 가운데 정렬
    paddingTop: 5,
  },
  highlight: {
    fontWeight: "bold", // 숫자 강조
    color: "#FF5733", // 강조 색상 (주황색 예시)
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  option: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: "#ffcccb",
    borderColor: "#ff6f61",
  },
  optionText: {
    fontSize: 14,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  timeInput: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    width: 80,
    textAlign: "center",
  },
  timeLabel: {
    marginHorizontal: 10,
  },
  menuCategoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#ffcccb",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  textInput: {
    height: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    textAlignVertical: "top",
    marginBottom: 20,
  },
  outputContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
 
 
  registerButton: {
    backgroundColor: "#ff6f61",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 30,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PlaceCerateScreen;
