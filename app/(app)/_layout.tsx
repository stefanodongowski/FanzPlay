//import liraries
import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons"

// create a component
const Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen 
                name="Home" 
                options= {{
                    tabBarLabel: "Home",
                    tabBarIcon: ({size, color}) => <Ionicons name='home' size={size} color={color}/>
                }}
            />
            <Tabs.Screen 
                name="Profile" 
                options= {{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({size, color}) => <Ionicons name='person' size={size} color={color}/>
                }}
            />
        </Tabs>
        
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Layout;
