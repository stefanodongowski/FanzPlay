import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, Modal, Pressable } from 'react-native';
import { updateUser } from '../../services/userUpdater';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { useRouter } from 'expo-router';
import { User } from '../../types/User';
import { handleDeleteAccount } from '../../services/deleteAccount';
import { LinearGradient } from 'expo-linear-gradient';
import getUser from '../../services/userFetcher';
import loading from '../loading';

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
  const { user, loading } = getUser(auth.currentUser?.uid!);
  
  
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
    <View style={styles.background}>
      <LinearGradient colors={['#000000', '#253031']} style={styles.gradient}>
        <View style={styles.container}>
      {!isUpdating && !loading && user && <Text style={styles.header}>Hello, {user.username}</Text>}
      {isUpdating ? (
        <>
              <TextInput placeholder="First Name" value={firstName} onChangeText={setFirstName} style={styles.input} />
              <TextInput placeholder="Last Name" value={lastName} onChangeText={setLastName} style={styles.input} />
              <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />

              <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Confirm</Text>
              </Pressable>
              
              <View style={styles.space} />

              <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
        </>
      ) : (
        <>
          <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={() => setIsUpdating(true)}>
            <Text style={styles.buttonText}>Update My Profile</Text>
          </Pressable>
          <View style={styles.space} />
          <Pressable style={({ pressed }) => [styles.button, styles.deleteButton, pressed && styles.buttonPressed]} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete My Account</Text>
          </Pressable>
          <View style={styles.space} />
          <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={() => {
            auth.signOut();
            router.replace('/');
          }}>
            <Text style={styles.buttonText}>Logout</Text>
          </Pressable>
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
    </LinearGradient>
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
  background: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    deleteButton: {
      backgroundColor: 'red',
    },
    
    input: {
      backgroundColor: 'white',
      color: 'black',
      borderBottomWidth: 2,
      borderBottomColor: '#DDE819',
      padding: 10,
      width: 300, 
      fontSize: 16,
      borderRadius: 5,
      marginBottom: 15,
    },
    button: {
      backgroundColor: '#DDE819',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      minWidth: 80,
      marginHorizontal: 10,
    },
    buttonText: {
      color: '#000',
      fontSize: 19,
      fontWeight: '500',
    },
    space: {
      height: 10,
    },

  textInput: {
      fontWeight: '300',
      color: 'white',
      width: 340,
      paddingLeft: 20,
      fontSize: 18,
  },
  
  header: {
    color: '#DDE819',
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    fontSize: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    borderRadius: 10,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
});

export default ProfilePage;