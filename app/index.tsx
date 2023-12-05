import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator,
    Image,
    Pressable
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                router.replace('/loading');
            } else {
                console.log('signed out');
            }
        });

        // This will be called when the component unmounts or the auth state changes,
        // effectively removing the listener
        return () => unsubscribe();
    }, []);

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log('signed in');
        } catch (e: any) {
            console.log(e);
            alert(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.background}>
            <LinearGradient
                colors={['#000000', '#253031']}
                style={styles.gradient}
            >
                <View style={styles.container}>
                    <Image
                        source={require('../assets/fanzplay_logo_transparent.png')}
                        style={styles.logo}
                    ></Image>
                    <Text style={styles.text}>Sign in to your account: </Text>

                    <View style={styles.input}>
                        <MaterialCommunityIcons
                            name="email-outline"
                            size={24}
                            color="white"
                        />
                        <TextInput
                            style={styles.textInput}
                            autoCapitalize="none"
                            placeholder="Email"
                            placeholderTextColor="white"
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>

                    <View style={styles.input}>
                        <MaterialCommunityIcons
                            name="lock-outline"
                            size={24}
                            color="white"
                        />
                        <TextInput
                            style={styles.textInput}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            placeholder="Password"
                            placeholderTextColor="#FFF"
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>

                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <Pressable onPress={signIn} style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                        </Pressable>
                    )}
                    <Text style={styles.text}>Don't have an account?</Text>
                    <Link href="/register" asChild>
                        <Pressable onPress={signIn} style={styles.button}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </Pressable>
                    </Link>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    gradient: {
        flex: 1
    },
    logo: {
        width: 230,
        height: 210
    },
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: '300',
        margin: 20
    },
    input: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        padding: 10,
        width: 360,
        flexDirection: 'row',
        marginBottom: 20
    },
    textInput: {
        fontWeight: '300',
        color: 'white',
        width: 340,
        paddingLeft: 20,
        fontSize: 18
    },
    button: {
        backgroundColor: '#DDE819',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 4,
        width: 340,
        height: 50,
        alignContent: 'center',
        justifyContent: 'center',
        margin: 20
    },
    buttonText: {
        fontSize: 24,
        color: '#000',
        alignContent: 'center',
        textAlign: 'center',
        padding: 5,
        fontWeight: '500'
    }
});

export default Login;
