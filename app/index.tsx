import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, Image, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const router = useRouter()

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                router.replace('/(app)/home')
                console.log("signed in")
            } else {
                console.log("signed out")
            }
        })
    }, [])

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response)
        } catch (e: any) {
            console.log(e);
            alert(e.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <LinearGradient colors={['#000000', '#253031']} style={styles.gradient}>
            <View style={styles.container}>
                <Image source={require('../assets/fanzplay_logo_transparent.png')} style={styles.logo}></Image>
                <Text>Sign in to your account: </Text>
                <TextInput placeholder='Email' autoCapitalize='none' style={styles.input} 
                    onChangeText={(text) => setEmail(text)}>
                </TextInput>
                <TextInput placeholder='Password' secureTextEntry={true} autoCapitalize='none' style={styles.input}
                    onChangeText={(text) => setPassword(text)}>
                </TextInput>

                { loading ? (
                        <ActivityIndicator size='large' color="#0000ff" />
                    ) : (
                        <Pressable onPress={signIn} style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                        </Pressable>
                    )
                }
                <Link href='/register' asChild>
                    <Text>Don't have an account? Sign up here</Text>
                </Link>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {

    },
    logo: {
        width: 230,
        height: 210,
    },
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
    },
    button: {
        backgroundColor: '#DDE819',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 4,
        width: 340,
        height: 50,
        alignContent: 'center',
        justifyContent: 'center',
        margin: 20,
    },
    buttonText: {
        fontSize: 24,
        color: '#253031',
        alignContent: 'center',
        textAlign: 'center',
        padding: 5,
        fontWeight: '500',
        },
});

export default Login;
