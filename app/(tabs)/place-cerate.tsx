import React, { useState } from 'react';
import { View, Text, TouchableOpacity,Button, TextInput, ScrollView, StyleSheet , Dimensions  } from 'react-native';
import { useRouter } from 'expo-router';
const { width: SCREEN_WIDTH } = Dimensions.get("window");
console.log(SCREEN_WIDTH)

const PlaceCerateScreen: React.FC = () => {
  const [selectedStoreType, setSelectedStoreType] = useState<string | null>(null);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [openingTime, setOpeningTime] = useState<string>('');
  const [closingTime, setClosingTime] = useState<string>('');

  const storeTypes: string[] = ['길거리', '매장', '편의점'];
  const paymentMethods: string[] = ['현금', '카드', '계좌이체'];
  const days: string[] = ['월', '화', '수', '목', '금', '토', '일'];
  const router = useRouter();
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

      <Text style={styles.label}>가게형태 (선택)</Text>
     
      <View style={styles.optionsContainer}>
        {storeTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.option,
              selectedStoreType === type && styles.selectedOption,
            ]}
            onPress={() => setSelectedStoreType(type)}
          >
            <Text style={styles.optionText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>결제방식 (선택) *다중선택 가능</Text>
      <View style={styles.optionsContainer}>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method}
            style={[
              styles.option,
              selectedPaymentMethods.includes(method) && styles.selectedOption,
            ]}
            onPress={() => togglePaymentMethod(method)}
          >
            <Text style={styles.optionText}>{method}</Text>
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
    fontWeight: 'bold',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  option: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#ffcccb',
    borderColor: '#ff6f61',
  },
  optionText: {
    fontSize: 14,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  timeInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    width: 80,
    textAlign: 'center',
  },
  timeLabel: {
    marginHorizontal: 10,
  },
  menuCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#ffcccb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#ff6f61',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 30,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PlaceCerateScreen;
