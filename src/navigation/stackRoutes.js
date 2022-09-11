import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { navigationRef } from "./rootNavigation";
import HomeScreen from '../screens/home/homeScreen';
import Shop from '../screens/shop/shop';
import Profile from '../screens/profile/profile';
const StackRoutes = () => {
    const Drawer = createDrawerNavigator();
    return (
        <NavigationContainer ref={navigationRef}>
            <Drawer.Navigator initialRouteName='home' >
                <Drawer.Screen name="home" component={HomeScreen} />
                <Drawer.Screen name="shop" component={Shop} />
                <Drawer.Screen name="profile" component={Profile} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
export default StackRoutes
