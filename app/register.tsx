import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    ActivityIndicator,
    Alert,
    ScrollView
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH, FIRESTORE } from '../FirebaseConfig';
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where
} from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FirebaseError } from 'firebase/app';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signUp = async () => {
        setLoading(true);

        const usernameQuery = query(
            collection(FIRESTORE, 'users'),
            where('username', '==', username)
        );
        const usernameSnapshot = await getDocs(usernameQuery);

        if (!usernameSnapshot.empty) {
            Alert.alert(
                'Username already exists',
                'Please choose a different one.'
            );
            setLoading(false);
            return;
        }

        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            await setDoc(doc(FIRESTORE, 'users', response.user.uid), {
                // creates user in firestore db
                email: email,
                firstName: firstName,
                lastName: lastName,
                role: 'normal', // set all new users to normal role
                userID: response.user.uid, // copy the id from authed user and add to users collection
                username: username
            });
            console.log(response);
        } catch (e: any) {
            console.log(e);
            if (e instanceof FirebaseError) {
                handleAuthError(e.code); // Pass the error code to the handler
            } else {
                Alert.alert(
                    'An unexpected error occurred',
                    'Please try again.'
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAuthError = (errorCode: string) => {
        switch (errorCode) {
            case 'auth/email-already-in-use':
                Alert.alert(
                    'Email is already in use',
                    'Please use a different email.'
                );
                break;
            case 'auth/invalid-email':
                Alert.alert(
                    'Invalid email format',
                    'Please enter a valid email address.'
                );
                break;
            case 'auth/weak-password':
                Alert.alert(
                    'Password is too weak',
                    'Please enter a stronger password.'
                );
                break;
            default:
                Alert.alert(
                    'An unexpected error occurred',
                    'Please try again.'
                );
                break;
        }
    };

    return (
        <LinearGradient colors={['#000000', '#253031']} style={styles.gradient}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    <Image
                        source={require('../assets/fanzplay_logo_transparent.png')}
                        style={styles.logo}
                    ></Image>
                    <View style={styles.input}>
                        <MaterialCommunityIcons
                            name="email-outline"
                            size={24}
                            color="white"
                        />
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="white"
                            autoCapitalize="none"
                            style={styles.textInput}
                            onChangeText={(text) => setEmail(text)}
                        ></TextInput>
                    </View>
                    <View style={styles.input}>
                        <MaterialCommunityIcons
                            name="account-outline"
                            size={24}
                            color="white"
                        />
                        <TextInput
                            placeholder="First Name"
                            placeholderTextColor="white"
                            autoCapitalize="none"
                            style={styles.textInput}
                            onChangeText={(text) => setFirstName(text)}
                        ></TextInput>
                    </View>
                    <View style={styles.input}>
                        <MaterialCommunityIcons
                            name="account-outline"
                            size={24}
                            color="white"
                        />
                        <TextInput
                            placeholder="Last Name"
                            placeholderTextColor="white"
                            autoCapitalize="none"
                            style={styles.textInput}
                            onChangeText={(text) => setLastName(text)}
                        ></TextInput>
                    </View>
                    <View style={styles.input}>
                        <MaterialCommunityIcons
                            name="at"
                            size={24}
                            color="white"
                        />
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor="white"
                            autoCapitalize="none"
                            style={styles.textInput}
                            onChangeText={(text) => setUsername(text)}
                        ></TextInput>
                    </View>
                    <View style={styles.input}>
                        <MaterialCommunityIcons
                            name="lock-outline"
                            size={24}
                            color="white"
                        />
                        <TextInput
                            placeholder="Password"
                            secureTextEntry={true}
                            placeholderTextColor="white"
                            autoCapitalize="none"
                            style={styles.textInput}
                            onChangeText={(text) => setPassword(text)}
                        ></TextInput>
                    </View>

                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <Pressable onPress={signUp} style={styles.button}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </Pressable>
                    )}
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    gradient: {
        flex: 1
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
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

export default Register;
