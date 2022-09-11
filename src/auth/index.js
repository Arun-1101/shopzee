import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { primaryGrey } from "../styles/colors";
import { Dimensions } from 'react-native';
import Loading from "../common/loading";
const AuthHome = () => {
    const { width, height } = Dimensions.get('window')
    const navigation = useNavigation()
    const fadeAnim = useRef(new Animated.Value(0)).current
    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 2500,
                useNativeDriver: true
            }
        ).start();
    }, [fadeAnim])
    const handleNavigate = (page) => {
        navigation.navigate(page)
    }
    return (
        <View style={styles.container} >
            <Animated.View style={{ opacity: fadeAnim, alignItems: 'center', marginVertical: 20 }} >
                <Image source={require('../assets/trolley.gif')} style={{ width: 250, height: 250 }} />
            </Animated.View>
            <Animated.View style={[styles.welcome, { opacity: fadeAnim }]} >
                <Text style={{ fontSize: 28, fontFamily: 'serif', fontWeight: 'bold', color: 'black' }} >Welcome to</Text>
                <Text style={{ fontFamily: 'serif', fontWeight: 'bold', fontSize: 28, color: 'black' }}> S H O P Z E E</Text>
            </Animated.View>
            <Animated.View style={[styles.welcome, { opacity: fadeAnim }]} >
                <Text style={{ textAlign: 'center', fontSize: 16 }} >Shop & get updates on new products</Text>
            </Animated.View>
            <View style={styles.buttonContainer} >
                <TouchableOpacity onPress={() => handleNavigate('signIn')} >
                    <View style={styles.button} >
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', fontFamily: 'serif' }} >Log In</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleNavigate('register')} >
                    <View style={styles.signButton} >
                        <Text style={{ color: primaryGrey, fontSize: 15, fontWeight: 'bold', fontFamily: 'serif' }} >Sign Up</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default AuthHome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 2,
        backgroundColor: 'white'
    },
    welcome: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    button: {
        width: 280,
        height: 60,
        borderRadius: 30,
        backgroundColor: primaryGrey,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    signButton: {
        width: 280,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: primaryGrey,
        borderWidth: 1
    },
    buttonContainer: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
})