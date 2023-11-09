import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';
import { updateUser } from '../../services/userUpdater';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { useRouter } from 'expo-router';
import { User } from '../../types';

const auth = FIREBASE_AUTH;

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');

  const handleUpdate = async () => {
    if (!firstName.trim() || !lastName.trim() || !username.trim()) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    const userData: Partial<User> = {
      firstName,
      lastName,
      username,
    };
    await updateUser(auth.currentUser?.uid, userData);
    setIsUpdating(false);
  };

  return (
    <View style={styles.container}>
       {!isUpdating && <Text style={styles.header}>Profile Page</Text>}
      {isUpdating ? (
        <>
          <TextInput placeholder="First Name" value={firstName} onChangeText={setFirstName} style={styles.input} />
          <TextInput placeholder="Last Name" value={lastName} onChangeText={setLastName} style={styles.input} />
          <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
          <Button title="Confirm" onPress={handleUpdate} />
          <View style={styles.space} />
          <Button title="Cancel" onPress={() => setIsUpdating(false)} />
        </>
      ) : (
        <>
          <Button title='Update My Profile' onPress={() => setIsUpdating(true)} />
          <View style={styles.space} />
          <Button title='Logout' onPress={() => {
              auth.signOut();
              router.replace('/');
          }} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
  space: {
    height: 10, // Adjust the height for more or less space
  },
  header: { // stable header style
    position: 'absolute', 
    top: 20, 
    alignSelf: 'center', 
    fontSize: 24, 
  },
});

export default ProfilePage;