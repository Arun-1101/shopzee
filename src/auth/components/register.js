import React, { useState } from "react";
import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import { primaryGrey } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import auth from "@react-native-firebase/auth";
import { gql, useMutation } from "@apollo/client";
const INSERT_EMPLOYEE = gql`
mutation user_insert($name: String, $email: String, $phone: String) {
    insert_shopzee_customer(objects: {name: $name, email: $email, phone: $phone, is_active: true}) {
      returning {
        id
      }
    }
  }  
`
const Register = () => {
    const navigation = useNavigation()
    const [field, setField] = useState({ name: '', phone: '', email: '', password: '', nameValidation: false, emailValidation: false, phoneValidation: false, passValidation: false })
    const [insertUserDetail] = useMutation(INSERT_EMPLOYEE, { onCompleted() {}, onError(err) { console.log(err, 'errinsert'); } })
    const validation = (key) => {
        if (key ==key && field.name.length <= 0) {
            setField({ ...field, nameValidation: true })
        } else setField({ ...field, nameValidation: false })
    }
    const handleSignIn = () => {
        auth().createUserWithEmailAndPassword(field.email, field.password).then((response) => {
            if (response) {
                console.log(response, 'resssss');
                ToastAndroid.show("Registered Successfully 🎉", ToastAndroid.SHORT)
                insertUserDetail({
                    variables: {
                        name: field.name,
                        email: field.email,
                        phone: field.phone.toString()
                    }
                })
            }
        }).catch((err) => {
            if (err.code == 'auth/email-already-in-use') {
                ToastAndroid.show('Email already registered please sign in!!')
            } else if (err.code == 'auth/invalid-email') {
                ToastAndroid.show('Invalid email please enter a correct email-id', ToastAndroid.SHORT)
            }
            else ToastAndroid.show('Something went wrong please try again later', ToastAndroid.SHORT)
            console.log(err.code, 'ererer');
        })
    }
    return (
        <View style={styles.container} >
            <View style={{ alignItems: 'flex-start', margin: 15 }} >
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-back-ios" type="materialIcons" size={36} />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{ fontWeight: "bold", fontSize: 25, fontFamily: "serif", color: primaryGrey, marginLeft: 20, marginVertical: 20 }} >Create new account</Text>
                <View style={styles.inputContainer} >
                    <TextInput onBlur={() => { validation('name') }} style={[styles.inputBox, { borderColor: field.nameValidation ? 'red' : 'grey' }]} placeholder={"Full Name"} placeholderTextColor={'grey'} onChangeText={(e) => { setField({ ...field, name: e }) }} />
                    <TextInput style={styles.inputBox} placeholder={"Phone Number"} placeholderTextColor={'grey'} keyboardType="phone-pad" onChangeText={(e) => { setField({ ...field, phone: e }) }} />
                    <TextInput style={styles.inputBox} placeholder={"E-mail Address"} autoCapitalize="none" placeholderTextColor={'grey'} onChangeText={(e) => { setField({ ...field, email: e }) }} />
                    <TextInput style={styles.inputBox} placeholder={"password"} autoCapitalize="none" secureTextEntry placeholderTextColor={'grey'} onChangeText={(e) => { setField({ ...field, password: e }) }} />
                </View>
            </View>
            <View style={styles.buttonContainer} >
                <TouchableOpacity onPress={handleSignIn} >
                    <View style={styles.button} >
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', fontFamily: 'serif' }} >Sign Up</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    inputBox: {
        width: "83%",
        height: 45,
        borderWidth: 2,
        borderRadius: 30,
        justifyContent: "center",
        marginVertical: 15
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
        margin: 20,
        marginVertical: 30
    },
    buttonContainer: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    }
})