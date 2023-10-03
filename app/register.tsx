import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, ActivityIndicator, Button } from 'react-native';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { User } from 'firebase/auth';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { TextInput } from 'react-native-gesture-handler';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
  
    
    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response)
            alert("New user created")
        } catch (e: any) {
            console.log(e);
            alert(e.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput placeholder='Email' autoCapitalize='none' style={styles.input} 
                onChangeText={(text) => setEmail(text)}>
            </TextInput>
            <TextInput placeholder='Password' secureTextEntry={true} autoCapitalize='none' style={styles.input}
                onChangeText={(text) => setPassword(text)}>
            </TextInput>
            { loading ? (
                <ActivityIndicator size='large' color="#0000ff" />
            ) : (
                <Button title='Sign up' onPress={signUp} />
            )}
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        marginVertical: 4,
        height: 50,
        width: 200,
        borderWidth: 1,
        borderRadius: 1,
        padding: 10,
        backgroundColor: "#fff"
    }
});

export default Register;
