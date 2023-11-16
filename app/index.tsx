import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import getUser from './services/userFetcher';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const router = useRouter()
    

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            router.replace('/loading');
          } else {
            console.log("signed out");
          }
        });
      
        // This will be called when the component unmounts or the auth state changes,
        // effectively removing the listener
        return () => unsubscribe();
      }, []);

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log("signed in")
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
                    <Button title='Login' onPress={signIn} />
                )
            }
            <Link href='/register' asChild>
                <Text>Don't have an account? Sign up here</Text>
            </Link>
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

export default Login;
