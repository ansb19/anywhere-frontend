// app/screens/profileScreen.tsx
import { View, Text, StyleSheet, Button, Alert, TextInput } from 'react-native';

import { useState } from 'react';
import { User, createUser, test } from '@/services/apiService';

export default function ProfileScreen() {


  const [currentName, setCurrentName] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [userInfo, setUserInfo] = useState<User | null>(null);



  const handleCreateAndGetDataUserName = async () => {
    try {
      const updatedInfo = await createUser();


      setUserInfo(updatedInfo.data);


      Alert.alert('Success', 'User name updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update user name');
    }
  };
  const handleGetUserInfo = async () => {
    Alert.alert('Success', 'User name updated successfully');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>프로필 화면</Text>

      <Text style={styles.label}>Current Name:</Text>
      <TextInput
        style={styles.input}
        value={currentName}
        onChangeText={setCurrentName}
        placeholder="Enter current name"
      />

      <Text style={styles.label}>New Name:</Text>
      <TextInput
        style={styles.input}
        value={newName}
        onChangeText={setNewName}
        placeholder="Enter new name"
      />

      <Button title="Get User Info" onPress={handleGetUserInfo} />
      <Button title="Create and GetUser" onPress={handleCreateAndGetDataUserName} />

      {userInfo && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>User Info: {JSON.stringify(userInfo)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 16,
    borderRadius: 4,
  },
  infoContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
});
