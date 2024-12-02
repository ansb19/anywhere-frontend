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
  Platform,
  Modal,
  FlatList,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useAppSelector } from "@/store/hooks";
import DateTimePicker, { DateTimePickerEvent }   from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";


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
  const [selectedOwnerTypes, setSelectedOwnerTypes] = useState<boolean >(
    false
  );

  const [inputText, setInputText] = useState<string>(""); // 입력된 텍스트 상태

  // 현재 시간 설정
  const now = new Date();
  // 오늘의 끝 시간(23:59:59) 설정
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());

  const [showStartDatePicker, setShowStartDatePicker] = useState<boolean>(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState<boolean>(false);

  // 메뉴 항목 상태
  const categories = [
    {
      id: 1,
      name: "붕어빵",
      image: "https://via.placeholder.com/60?text=붕어빵",
    },
    {
      id: 2,
      name: "어묵",
      image: "https://via.placeholder.com/60?text=어묵",
    },
    {
      id: 3,
      name: "호떡",
      image: "https://via.placeholder.com/60?text=호떡",
    },
    {
      id: 4,
      name: "군고구마",
      image: "https://via.placeholder.com/60?text=군고구마",
    },
    {
      id: 5,
      name: "떡볶이",
      image: "https://via.placeholder.com/60?text=떡볶이",
    },
    {
      id: 6,
      name: "순대",
      image: "https://via.placeholder.com/60?text=순대",
    },
    {
      id: 7,
      name: "빵",
      image: "https://via.placeholder.com/60?text=빵",
    },
    {
      id: 8,
      name: "토스트",
      image: "https://via.placeholder.com/60?text=토스트",
    },
    {
      id: 9,
      name: "커피/디저트",
      image: "https://via.placeholder.com/60?text=커피",
    },
  ];
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);


  const [tagInputText, setTagInputText] = useState<string>(""); // 현재 입력 중인 텍스트
  const [tags, setTags] = useState<string[]>([]); // 태그 배열

  // 태그 추가 함수
  const addTag = () => {
    if (tagInputText.trim() === "") return; // 공백만 입력된 경우 무시
    const newTag = `#${tagInputText.trim()}`;
    setTags((prevTags) => [...prevTags, newTag]); // 새로운 태그 추가
    setInputText(""); // 입력 필드 초기화
  };


  // 메뉴 선택 시 호출되는 함수
  const handleSelectCategory = (name: string) => {
    setSelectedMenu(name);
    setModalVisible(false);
  };

  const handleStartDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleStartTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      setStartTime(selectedTime);
    }
  };

  const handleEndDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const handleEndTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      setEndTime(selectedTime);
    }
  };


  const storeTypes: { [key: number]: string } = {
    1: "길거리",
    2: "매장",
    3: "편의점",
  };
  const ownerTypes: { [key: number]: boolean } = {
    1: true,
    2: false,
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

 

  const combineDateAndTime = (date: Date, time: Date): Date => {
    const combined = new Date(date);
    combined.setHours(time.getHours());
    combined.setMinutes(time.getMinutes());
    combined.setSeconds(time.getSeconds());
    return combined;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 시작 날짜와 시간 합치기
  const combinedStartDateTime = combineDateAndTime(startDate, startTime);
  // 끝 날짜와 시간 합치기
  const combinedEndDateTime = combineDateAndTime(endDate, endTime);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>가게 제보</Text>
      <Text style={styles.title}>가게 이름*</Text>
      <TextInput
        style={styles.addressInput}
        placeholder="여기에 주소를 입력해주세요"
        placeholderTextColor="#aaa"
      />

      {/* TODO 지도  부분 만들어야함*/}
      <Text style={styles.title}>지도*</Text>
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

      <Text style={styles.title}>가게형태* (선택)</Text>

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

      <Text style={styles.title}>결제방식* (선택) *다중선택 가능</Text>
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

      <Text style={styles.title}>출몰 시기* (설정)</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>시작 날짜</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowStartDatePicker(true)}
        >
          <Text style={styles.buttonText}>{startDate.toLocaleDateString()}</Text>
        </TouchableOpacity>

        {showStartDatePicker && (
          <RNDateTimePicker
            value={startDate}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={handleStartDateChange}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>시작 시간</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowStartTimePicker(true)}
        >
          <Text style={styles.buttonText}>
            {startTime.toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </TouchableOpacity>

        {showStartTimePicker && (
          <RNDateTimePicker
            value={startTime}
            mode="time"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={handleStartTimeChange}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>종료 날짜</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowEndDatePicker(true)}
        >
          <Text style={styles.buttonText}>{endDate.toLocaleDateString()}</Text>
        </TouchableOpacity>

        {showEndDatePicker && (
          <RNDateTimePicker
            value={endDate}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={handleEndDateChange}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>종료 시간</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowEndTimePicker(true)}
        >
          <Text style={styles.buttonText}>
            {endTime.toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </TouchableOpacity>

        {showEndTimePicker && (
          <RNDateTimePicker
            value={endTime}
            mode="time"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={handleEndTimeChange}
          />
        )}
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>출몰 시간대</Text>
        <Text style={styles.result}>
          {formatDate(combinedStartDateTime)} 부터
        </Text>
        <Text style={styles.result}>{formatDate(combinedEndDateTime)} 까지</Text>
      </View>
      <View style={styles.menuCategoryContainer}>
    
        <Text style={styles.title}>메뉴 카테고리</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>추가하기</Text>
        </TouchableOpacity>
    

   

        {/* 카테고리 선택 모달 */}
        <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>카테고리 선택</Text>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id.toString()}
              numColumns={4} // 3열로 구성
              renderItem={({ item, index }) => (
                <View
                  style={[
                    styles.categoryItem,
                    index === categories.length - 1 && styles.lastItem, // 마지막 아이템에 스타일 추가
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => handleSelectCategory(item.name)}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={styles.categoryImage}
                    />
                    <Text style={styles.categoryName}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              )}
              contentContainerStyle={styles.flatListContainer}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
        
      </View>
         {/* 선택된 메뉴를 다음 줄에 표시 */}
         {selectedMenu && (
        <View style={styles.selectedMenuContainer}>
          <Text style={styles.selectedMenuText}>선택된 메뉴: {selectedMenu}</Text>
        </View>
      )}

<Text style={styles.title}>태그 입력</Text>

{/* 텍스트 입력 필드와 추가 버튼 */}
<View style={styles.tagInputContainer}>
  <TextInput
    style={styles.tagInput}
    value={tagInputText}
    onChangeText={setTagInputText}
    placeholder="태그를 입력하세요"
    placeholderTextColor="#aaa"
  />
  <TouchableOpacity style={styles.addButton} onPress={addTag}>
    <Text style={styles.addButtonText}>추가</Text>
  </TouchableOpacity>
</View>

 {/* 태그 표시 */}
 <View style={styles.tagContainer}>
        {tags.length > 0 ? (
          tags.map((tag: string, index: number) => (
            <View key={index} style={styles.tagItem}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noTagsText}>태그가 없습니다.</Text>
        )}
</View>
      <Text style={styles.title}>제보자 형태* (선택)</Text>
      <View style={styles.optionsContainer}>
        {Object.entries(ownerTypes).map(([key, type]) => (
          <TouchableOpacity
            key={key} // 객체의 키를 사용
            style={[
              styles.option,
              selectedOwnerTypes === type && styles.selectedOption,
            ]}
            onPress={() => setSelectedOwnerTypes(type)} // 선택된 타입 설정
          >
            <Text style={styles.optionText}>{  type ? "본인" :"제보자"}</Text>
          </TouchableOpacity>
        ))}
      </View>
         {/* 입력 영역 */}
         <Text style={styles.title}>코멘트 </Text>
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
    alignItems: "flex-start",
   
  },
  addButton: {
    backgroundColor: "#ffcccb",
    marginTop: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  selectedMenuContainer: {
    marginBottom: 20, // 선택된 메뉴와 다음 요소 간격
    marginTop: 5, // 메뉴 카테고리와 선택된 메뉴 간격
  },
  selectedMenuLabel: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  selectedMenuText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
     textAlign:"left"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  flatListContainer: {
    justifyContent: "flex-start", // 왼쪽 정렬
    alignItems: "flex-start", // 아이템을 왼쪽으로 정렬
  },
  categoryItem: {
    flex: 1,
    alignItems: "center",
    margin: 10,
  },
  lastItem: {
    width: "25%", // 마지막 아이템 너비를 그대로 유
    alignItems: "center",
    margin: 10,
  },

  categoryImage: {
    width: 60,
    height: 60,
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 14,
    textAlign: "center",
    color: "#333",
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#ffcccb",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  tagInputContainer: {
    width:"30%",
    flexDirection: "row", // 입력 필드와 버튼을 같은 줄에 배치
    alignItems: "center",
    marginBottom: 20,
  },
  tagContainer: {
    flexDirection: "row", // 태그들을 한 줄에 나란히 배치
    flexWrap: "wrap", // 줄이 넘어가면 다음 줄로 이동
    padding: 10,
    
   
   
 
  },
  tagItem: {
    backgroundColor: "#ffcccb", // 타원형 배경색
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20, // 타원 형태를 위한 설정
    marginRight: 10, // 태그 간 간격
    marginBottom: 10, // 아래 태그와의 간격
  },
  tagInput: {
    flex: 1, // 입력 필드가 버튼 옆에서 최대한 공간을 차지하도록 설정
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginRight: 10,
    color: "#333",
  },
  tagText: {
    fontSize: 16,
    color: "#333",
  },
  noTagsText: {
    fontSize: 16,
    color: "#aaa",
    fontStyle: "italic",
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

  inputContainer: {
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 30,
    padding: 16,
    backgroundColor: "#eef6f9",
    borderRadius: 8,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  result: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
});

export default PlaceCerateScreen;
