import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from "@expo/vector-icons";
import HomePage from './home';
import ProfilePage from './profile';
import RewardsPage from './rewards';
import GamesPage from './games';

const Drawer = createDrawerNavigator();
// The navigation will handeled by a drawer style navigator

const Layout = () => {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen 
                name="Home" 
                component={HomePage}
                options={{
                    drawerLabel: "Home",
                    drawerIcon: ({size, color}) => <Ionicons name='home' size={size} color={color}/>
                }}
            />
            <Drawer.Screen 
                name="Games" 
                component={GamesPage}
                options={{
                    drawerLabel: "Games",
                    drawerIcon: ({size, color}) => <Ionicons name='game-controller' size={size} color={color}/> 
                }}
            />
            <Drawer.Screen 
                name="Rewards" 
                component={RewardsPage}
                options={{
                    drawerLabel: "Rewards",
                    drawerIcon: ({size, color}) => <Ionicons name='gift' size={size} color={color}/> 
                }}
            />
            <Drawer.Screen 
                name="Profile" 
                component={ProfilePage}
                options={{
                    drawerLabel: "Profile",
                    drawerIcon: ({size, color}) => <Ionicons name='person' size={size} color={color}/>
                }}
            />
        </Drawer.Navigator>
    );
};

//make this component available to the app
export default Layout;