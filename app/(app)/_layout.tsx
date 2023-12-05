import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomePage from './home';
import ProfilePage from './profile';
import RewardsPage from './rewards';
import GamesPage from './games';

const Tab = createBottomTabNavigator();

const Layout = () => {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen
                name="Home"
                component={HomePage}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="home" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Games"
                component={GamesPage}
                options={{
                    tabBarLabel: 'Games',
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons
                            name="game-controller"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Rewards"
                component={RewardsPage}
                options={{
                    tabBarLabel: 'Rewards',
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="gift" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfilePage}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="person" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
};

export default Layout;
