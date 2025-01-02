import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';

const ReviewScreen: React.FC = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams(); // URL에서 place_id 가져오기
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = () => {
    if (!reviewText.trim()) {
      Alert.alert('작성오류', '리뷰를 입력해주세요.');
      return;
    }
    Alert.alert('성공', '리뷰가 제출되었습니다.');
    setReviewText('');
  };

  return (
    <View style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* 타이틀 */}
      <Text style={styles.title}>{id}리뷰 작성</Text>

      {/* 리뷰 입력 칸 */}
      <TextInput
        style={styles.textInput}
        placeholder="리뷰를 작성해주세요"
        placeholderTextColor="#aaa"
        multiline
        value={reviewText}
        onChangeText={setReviewText}
      />

      {/* 작성 버튼 */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>리뷰 작성하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  backButton: {
    marginBottom: 20,
    alignSelf: 'flex-start',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#444',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReviewScreen;
