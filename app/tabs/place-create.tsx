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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { FlashList } from "@shopify/flash-list";
import axios from "axios";
import requests from "@/api/request";

import axiosInstance from "@/api/axiosInstance";
import { Place, placeData } from "@/types/place";
import { Category, categoryData } from "@/types/categoryData";
import { subcategoryData } from "@/types/subcategoryData";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "@/aws/client";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";
import MapScreen from "../../components/map/map";
import MapView, { Marker } from "react-native-maps";
import { createPlace } from "@/services/placeService";
import { addPlaces } from "@/store/slices/placeSlice";

AWS.config.update({
  region: process.env.EXPO_PUBLIC_AWS_S3_AWS_REGION || "", // AWS 리전
  credentials: new AWS.Credentials(
    process.env.EXPO_PUBLIC_AWS_S3_ACCESS_KEY_ID || "", // Access Key
    process.env.EXPO_PUBLIC_AWS_S3_SECRET_ACCESS_KEY || "" // Secret Key
  ),
});

const S3 = new AWS.S3();

const { width: SCREEN_WIDTH } = Dimensions.get("window");
console.log(SCREEN_WIDTH);
// export interface Place {
//   place_id: number;
//   place_name: string;
//   user_id: number;
//   lat: number;
//   lon: number;
//   category_id: number;
//   start_date: Date;
//   end_date: Date;
//   photo_s3_url: string[];
//   place_charge: number[];
//   comment: string;
//   tag: string[];
//   exist_count: number;
//   non_exist_count: number;
//   owner: boolean; // 제보자: false, 작성자: true

// }
const PlaceCerateScreen: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch(); // Redux dispatch 함수
  const places = useAppSelector((state) => state.place.places); // 상태에서 places 가져오기
  const user = useAppSelector((state) => state.auth.user);

  const [place, setPlace] = useState<Place>(placeData);

  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<
    number[]
  >([3]); // 기본적으로 "현금" 선택

  const [selectedStoreType, setSelectedStoreType] = useState<number>(1); // 선택된 ID 저장// 스토어 타입
  const [selectedSubStoreType, setSelectedSubStoreType] = useState<number>(0); // 선택된 ID 저장// 스토어 타입
  const [selectedOwnerTypes, setSelectedOwnerTypes] = useState<boolean>(false); // owner 타입
  const [placeInputText, setPlaceInputText] = useState<string>(""); // 입력된 텍스트 상태
  const [inputCommentText, setInputCommentText] = useState<string>(""); // 입력된 텍스트 상태

  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]); // 로컬 이미지 URI 배열
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]); // S3 URL 배열

  const [tagInputText, setTagInputText] = useState<string>(""); // 현재 입력 중인 텍스트
  const [tags, setTags] = useState<string[]>([]); // 태그 배열

  const [startDate, setStartDate] = useState<Date>(new Date()); // 시작시간
  const [startTime, setStartTime] = useState<Date>(new Date()); // 시작타임
  const [endDate, setEndDate] = useState<Date>(new Date()); // 끝나는 시간
  const [endTime, setEndTime] = useState<Date>(new Date()); // 끝나는 타임

  const [showStartDatePicker, setShowStartDatePicker] =
    useState<boolean>(false);
  const [showStartTimePicker, setShowStartTimePicker] =
    useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(37.5665); // 초기 위도 설정 (서울)
  const [longitude, setLongitude] = useState<number>(126.978); // 초기 경도 설정 (서울)

  const [selectedDays, setSelectedDays] = useState<string[]>(["월"]);
  const updatePlace = async () => {
    const newAddPlace: Place = {
      ...place,
    
      user_id: user!.user_id,
      lat: latitude,
      lon: longitude,
      place_name: placeInputText,
      category_id: selectedStoreType,
      subcategory_id: selectedSubStoreType,
      start_date: startDate,
      end_date: endDate,
      photo_s3_url: uploadedImageUrls,
      place_charge: selectedPaymentMethods,
      week: selectedDays,
      comment: inputCommentText,
      tag: tags,
      owner: selectedOwnerTypes,
    };
    // State 업데이트 로직
  
    dispatch(addPlaces(newAddPlace));
  
    try {
      const response = await createPlace(newAddPlace);

      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("데이터 전송 실패:", error);
    }

    console.log("Updated Place:", newAddPlace);
  };

  // 서브카테고리 선택 핸들러
  const toggleSubcategory = (id: number) => {
    setSelectedSubStoreType(id);
  };
  // 결제 방식 선택/해제 함수
  const togglePaymentMethod = (method: number) => {
    setSelectedPaymentMethods((prev) => {
      // 이미 선택된 항목 제거하려는 경우, 최소 하나는 유지
      if (prev.includes(method)) {
        if (prev.length === 1) {
          return prev; // 하나만 남아있으면 제거 금지
        }
        return prev.filter((m) => m !== method); // 선택된 항목 제거
      }
      // 새 항목 추가
      return [...prev, method];
    });
  };

  // 이미지 선택 함수
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0].uri) {
      setSelectedImages((prev) => [...prev, result.assets[0].uri]); // 새로운 이미지 추가
    } else {
      Alert.alert("이미지를 선택하지 않았습니다.");
    }
  };

  // 이미지 업로드 함수
  const uploadImagesToS3 = async () => {
    try {
      const urls: string[] = [];

      for (const imgUri of selectedImages) {
        const response = await fetch(imgUri); // URI에서 파일 가져오기
        const blob = await response.blob(); // Blob 형식으로 변환

        const fileName = `uploads/${Date.now()}-${Math.random()
          .toString(36)
          .substring(7)}.jpg`; // 고유한 파일 이름 설정
        const params = {
          Bucket: "anywhere-photo", // S3 버킷 이름
          Key: fileName, // 업로드 경로 및 파일 이름
          Body: blob, // 업로드할 파일
          ContentType: "image/jpeg", // 파일 MIME 타입
        };

        const result = await S3.upload(params).promise();
        urls.push(result.Location); // 업로드된 S3 URL 저장
      }

      setUploadedImageUrls(urls); // 모든 업로드된 URL 저장
      Alert.alert("모든 이미지가 성공적으로 업로드되었습니다!");
    } catch (error) {
      console.error("S3 업로드 실패:", error);
      Alert.alert("이미지 업로드에 실패했습니다.");
    }
  };
  // 태그 추가 함수
  const addTag = () => {
    if (tagInputText.trim() === "") return; // 공백만 입력된 경우 무시
    if (tags.length >= 10) {
      alert("태그는 최대 10개까지 추가할 수 있습니다."); // 태그 제한 알림
      return;
    }
    const newTag = `${tagInputText.trim()}`;
    setTags((prevTags) => [...prevTags, newTag]); // 새로운 태그 추가
    setTagInputText(""); // 입력 필드 초기화
  };

  const handleStartDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleStartTimeChange = (
    event: DateTimePickerEvent,
    selectedTime?: Date
  ) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      setStartTime(selectedTime);
    }
  };

  const handleEndDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const handleEndTimeChange = (
    event: DateTimePickerEvent,
    selectedTime?: Date
  ) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      setEndTime(selectedTime);
    }
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

  // 요일 선택/해제 함수
  const toggleDay = (day: string) => {
    setSelectedDays((prev) => {
      if (prev.includes(day)) {
        if (prev.length === 1) {
          // 마지막 하나 남은 경우 제거 금지
          return prev;
        }
        return prev.filter((d) => d !== day); // 선택된 항목 제거
      }
      // 새로운 항목 추가
      return [...prev, day];
      0;
    });
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

  const selectedSubcategoryData = subcategoryData.filter(
    (item) => selectedSubStoreType == item.id
  );

  const handleLocationSelect = (lat: number, lon: number) => {
    setLatitude(lat);
    setLongitude(lon);
  };

  const savePlace = () => {
    if (latitude === null || longitude === null) {
      alert("위치가 선택되지 않았습니다.");
      return;
    }

    // Place 데이터를 저장하거나 API 호출
    console.log("위치 저장:", { latitude, longitude });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>가게 제보</Text>
      <Text style={styles.title}>가게 이름*</Text>
      <TextInput
        style={styles.addressInput}
        value={placeInputText}
        onChangeText={setPlaceInputText}
        placeholder="가게 이름"
        placeholderTextColor="#aaa"
      />

      {/* TODO 지도  부분 만들어야함*/}
      <Text style={styles.title}>지도*</Text>

      <Text style={styles.title}>가게 위치 선택</Text>
      <View style={styles.mapContainer}>
        <MapScreen onLocationSelect={handleLocationSelect} />
      </View>
      <View style={styles.locationContainer}>
        <Text style={styles.label}>위도: {latitude ?? "미정"}</Text>
        <Text style={styles.label}>경도: {longitude ?? "미정"}</Text>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={savePlace}>
        <Text style={styles.saveButtonText}>위치 저장</Text>
      </TouchableOpacity>

      <Text style={styles.title}>가게형태* (선택)</Text>

      <View style={styles.optionsContainer}>
        {categoryData.map((type: Category) => (
          <TouchableOpacity
            key={type.id} // id를 key로 사용
            style={[
              styles.option,
              selectedStoreType === type.id && styles.selectedOption, // id로 비교
            ]}
            onPress={() => setSelectedStoreType(type.id)} // 선택된 id 설정
          >
            <Text
              style={[
                styles.optionText,
                selectedStoreType === type.id && styles.selectedOption,
              ]}
            >
              {type.name} {/* 버튼에는 name 표시 */}
            </Text>
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
              selectedPaymentMethods.includes(Number(key)) &&
                styles.selectedOption, // key를 숫자로 변환하여 확인
            ]}
            onPress={() => togglePaymentMethod(Number(key))} // key를 숫자로 변환하여 전달
          >
            <Text style={styles.optionText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.title}>요일 선택</Text>
      <FlashList
        data={days}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3} // 3열로 표시
        estimatedItemSize={50} // FlashList 성능 최적화를 위한 높이 추정치
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.circle,
              selectedDays.includes(item) && styles.selectedCircle,
            ]}
            onPress={() => toggleDay(item)}
          >
            <Text
              style={[
                styles.circleText,
                selectedDays.includes(item) && styles.selectedCircleText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.title}>출몰 시기* (설정)</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>시작 날짜</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowStartDatePicker(true)}
        >
          <Text style={styles.buttonText}>
            {startDate.toLocaleDateString()}
          </Text>
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
        <Text style={styles.result}>
          {formatDate(combinedEndDateTime)} 까지
        </Text>
        <Text style={styles.result}>
          선택된 요일 : {selectedDays.join(", ")}
        </Text>
      </View>
      <View style={styles.menuCategoryContainer}>
        <Text style={styles.title}>카테고리</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>선택하기</Text>
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
              <View style={{ flex: 1, width: "100%" }}>
                <FlashList
                  data={subcategoryData.filter(
                    (item) => item.category_id === selectedStoreType
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={4} // 4열로 구성
                  estimatedItemSize={100} // 성능 최적화를 위한 예상 크기
                  renderItem={({ item }) => (
                    <View style={styles.categoryItem}>
                      <TouchableOpacity
                        onPress={() => toggleSubcategory(item.id)}
                        style={[
                          styles.subcategoryButton,
                          selectedSubStoreType == item.id &&
                            styles.selectedSubcategoryButton,
                        ]}
                      >
                        <Text
                          style={[
                            styles.categoryName,
                            selectedSubStoreType == item.id &&
                              styles.selectedCategoryName,
                          ]}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  contentContainerStyle={styles.flatListContainer}
                />
              </View>
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

      <View style={styles.selectedContainer}>
        <Text style={styles.selectedTitle}>선택된 서브카테고리:</Text>
        {selectedSubcategoryData.length > 0 ? (
          selectedSubcategoryData.map((item) => (
            <Text key={item.id} style={styles.selectedItem}>
              {item.name}
            </Text>
          ))
        ) : (
          <Text style={styles.noSelection}>선택된 항목이 없습니다.</Text>
        )}
      </View>

      <Text style={styles.title}>태그 입력 (최대 10개 {tags.length}/10)</Text>

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
              <Text style={styles.tagText}>#{tag}</Text>
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
            <Text style={styles.optionText}>{type ? "본인" : "제보자"}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.title}>사진 </Text>
      <TouchableOpacity style={styles.imageButton} onPress={() => pickImage()}>
        <Text style={styles.imageButtonText}>사진 추가하기</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>선택된 이미지</Text>
      <ScrollView horizontal style={styles.imageScroll}>
        {selectedImages.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
      </ScrollView>

      <Button title="이미지 업로드" onPress={uploadImagesToS3} />
      {uploadedImageUrls.map((url, index) => (
        <TouchableOpacity key={index} onPress={() => Alert.alert(url)}>
          <ScrollView horizontal style={styles.imageScroll}>
            <Image key={index} source={{ uri: url }} style={styles.image} />
          </ScrollView>
        </TouchableOpacity>
      ))}
      {/* 입력 영역 */}
      <Text style={styles.title}>코멘트 </Text>
      <TextInput
        style={styles.textInput}
        multiline
        placeholder="추가 정보를 입력해주세요"
        value={inputCommentText}
        onChangeText={setInputCommentText}
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => updatePlace()}
      >
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
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  dayText: {
    fontSize: 16,
    color: "#333",
  },
  selectedDayText: {
    color: "#fff",
    fontWeight: "bold",
  },
  selectedDaysText: {
    marginTop: 20,
    fontSize: 16,
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
    flex: 1,
    width: "100%",
    height: 200,
  },
  map: {
    width: "100%",
    height: "100%",
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

  selectedMenuText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 모달 배경
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    height: "70%", // 고정된 높이 설정
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  flatListContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10, // 아이템 상하 여백
  },
  categoryItem: {
    flex: 1, // 열 안에서 균등한 크기
    alignItems: "center",
    justifyContent: "center",
    margin: 5, // 아이템 간격
  },
  categoryImage: {
    width: 60, // 이미지 크기
    height: 60,
    borderRadius: 30, // 둥근 이미지
    backgroundColor: "#d3d3d3", // 임시 배경색
  },
  subcategoryButton: {
    padding: 10,
    width: "100%",
    height: 60,
    backgroundColor: "#f0f0f0",
   
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedSubcategoryButton: {
    backgroundColor: "#007BFF",
    borderColor: "#0056b3",
  },
  categoryName: {
    fontSize: 14,
    color: "#333",
  },
  selectedCategoryName: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#f5a9a9",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    width: "80%",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  selectedContainer: {},
  selectedTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  selectedItem: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  noSelection: {
    fontSize: 14,
    color: "#999",
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

  tagInputContainer: {
    flexDirection: "row", // 입력 필드와 버튼을 같은 줄에 배치
    alignItems: "center",
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: "row", // 태그들을 한 줄에 나란히 배치
    flexWrap: "wrap", // 줄이 넘어가면 다음 줄로 이동

    padding: 10,
    paddingLeft: 0,
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

  imageButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 30,
    marginBottom: 20,
  },
  imageButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  imageScroll: {
    flexDirection: "row",
    marginBottom: 20,
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
  image: {
    width: 200,
    height: 200,
  },
  circle: {
    margin: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedCircle: {
    backgroundColor: "#ffcccb",
    borderColor: "#ff6f61",
  },
  circleText: {
    fontSize: 16,
    color: "#333",
  },
  selectedCircleText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PlaceCerateScreen;
