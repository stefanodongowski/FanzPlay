import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, Modal } from 'react-native';
import { updateUser } from '../../services/userUpdater';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { useRouter } from 'expo-router';
import { User } from '../../types/User';
import { handleDeleteAccount } from '../../services/deleteAccount';

const auth = FIREBASE_AUTH;

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
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
    resetFields();
    setIsUpdating(false);
  };

  const handleCancel = () => {
    resetFields();
    setIsUpdating(false);
  };

  const resetFields = () => {
    setFirstName('');
    setLastName('');
    setUsername('');
  };

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const confirmDelete = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter your email and password.");
      return;
    }

    try {
      // handleDeleteAccount takes email and password as arguments
      await handleDeleteAccount(auth, email, password);
      Alert.alert("Account Deleted", "Your account has been successfully deleted.");
      setIsDeleting(false); // Close the modal
      router.replace('/'); // Redirect to root
    } catch (error) {
      Alert.alert("Error", 'Failed to delete account. try again');
    }
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
          <Button title="Cancel" onPress={handleCancel} />
        </>
      ) : (
        <>
          <Button title="Update My Profile" onPress={() => setIsUpdating(true)} />
          <View style={styles.space} />
          <Button title="Delete My Account" onPress={handleDelete} color="red" />
          <View style={styles.space} />
          <Button title="Logout" onPress={() => {
            auth.signOut();
            router.replace('/');
          }} />
        </>
      )}

      <Modal
        transparent={true}
        visible={isDeleting}
        onRequestClose={() => {
          setIsDeleting(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
            <Button title="Confirm Delete" onPress={confirmDelete} color="red" />
            <View style={styles.space} />
            <Button title="Cancel" onPress={() => setIsDeleting(false)} />
          </View>
        </View>
      </Modal>
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
    height: 10,
  },
  header: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    fontSize: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    borderRadius: 10,
  },
});

export default ProfilePage;