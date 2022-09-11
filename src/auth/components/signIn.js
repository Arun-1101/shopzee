import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import { primaryGrey } from "../../styles/colors";
import auth from "@react-native-firebase/auth";
import Loading from "../../common/loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
    const navigation = useNavigation()
    const [freezeLoading, setFreezeLoading] = useState(false)
    const [field, setField] = useState({ email: '', password: '' })
    const handleSignIn = async () => {
        setFreezeLoading(true)
        if (field.email.length > 0 && field.password.length > 0) {
            auth().signInWithEmailAndPassword(field.email, field.password).then((response) => {
                AsyncStorage.setItem('email', response.user.email)
                setFreezeLoading(false)
            }).catch((err) => {
                setFreezeLoading(false)
            })
        } else if (field.email.length <= 0) {
            ToastAndroid.show("Please enter the email", ToastAndroid.SHORT)
        } else { ToastAndroid.show("Please enter the password", ToastAndroid.SHORT) }
    }
    console.log(field.email.length <= 0, field.password.length, 'field.email.length <= 0');
    return (
        freezeLoading ? <Loading /> : <View style={styles.container}>
            <View style={{ alignItems: 'flex-start', margin: 15 }} >
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-back-ios" type="materialIcons" size={36} />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{ fontWeight: "bold", fontSize: 25, fontFamily: "serif", color: primaryGrey, marginLeft: 20, marginVertical: 20 }} >Sign In</Text>
                <View style={styles.inputContainer} >
                    <TextInput style={styles.inputBox} autoComplete={'email'} placeholder={"Email"} autoCapitalize="none" placeholderTextColor={primaryGrey} onChangeText={(e) => { setField({ ...field, email: e }) }} />
                    <TextInput style={styles.inputBox} placeholder={"Password"} autoCapitalize="none" secureTextEntry placeholderTextColor={primaryGrey} onChangeText={(e) => { setField({ ...field, password: e }) }} />
                </View>
            </View>
            <View style={styles.buttonContainer} >
                <TouchableOpacity onPress={handleSignIn} >
                    <View style={styles.button} >
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', fontFamily: 'serif' }} >Log In</Text>
                    </View>
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', marginVertical: 20, fontWeight: 'bold', fontFamily: 'serif' }} >OR</Text>
                <TouchableOpacity onPress={undefined} >
                    <View style={styles.signButton} >
                        <Icon name="smartphone" type="feather" size={20} style={{ margin: 5 }} />
                        <Text style={{ color: primaryGrey, fontSize: 15, fontWeight: 'bold', fontFamily: 'serif' }} >OTP Login</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View >
    )
}
export default SignIn
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    inputBox: {
        width: "83%",
        height: 50,
        borderColor: primaryGrey,
        borderWidth: 2,
        borderRadius: 30,
        justifyContent: "center",
        marginTop: 20
    },
    inputContainer: {
        width: "100%",
        justifyContent: 'center',
        alignItems: "center"
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
        flexDirection: 'row',
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
        alignItems: 'center'
    }
})