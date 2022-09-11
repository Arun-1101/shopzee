import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import AuthHome from "../../auth";
import Register from "../../auth/components/register";
import SignIn from "../../auth/components/signIn";
const AuthStackRoutes = () => {
    const Stack = createNativeStackNavigator()
    return (
        <NavigationContainer independent={true} >
            <Stack.Navigator initialRouteName="authHome" ani >
                <Stack.Screen name="authHome" component={AuthHome} options={{ headerShown: false }} />
                <Stack.Screen name="signIn" component={SignIn} options={{ headerShown: false, animation: "slide_from_right" }} />
                <Stack.Screen name="register" component={Register} options={{ headerShown: false, animation: 'slide_from_right' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AuthStackRoutes