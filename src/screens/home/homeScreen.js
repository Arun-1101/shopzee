import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { StyleSheet, Text, View } from "react-native";
import { primaryGrey } from "../../styles/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { gql, useQuery } from "@apollo/client";
import Loading from "../../common/loading";

const USER_DETAILS = gql`
query user_details($email: String) {
    shopzee_customer(where: {email: {_eq: $email}}) {
      id
      name
      phone
      created_at
    }
  }  
`

const HomeScreen = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [freezeLoading, setFreezeLoading] = useState(true)
    const { loading, data } = useQuery(USER_DETAILS, {
        variables: {
            email: email
        },
        skip: !email,
        onCompleted() { setFreezeLoading(false) },
        onError() { setEmail(false) },
        fetchPolicy: 'cache-and-network'
    })
    const getUserEmail = async () => {
        await AsyncStorage.getItem('email').then((res) => {
            setEmail(res)
        })
    }
    useEffect(() => {
        getUserEmail()
    }, []);
    console.log(email, 'ema');
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <View style={styles.icon}>
                <Icon name="shopping-cart" type="entypo" containerStyle={{ margin: 5 }} size={22} />
            </View>,
            headerTitle: () => <View style={styles.icon}>
                <Text style={styles.brandName} >S H O P Z E E</Text>
            </View>
        })
    })
    return (
        freezeLoading ? <Loading /> : 
        <View style={styles.container} >
            <Text>Hi</Text>
        </View>
    )
}
export default HomeScreen

const styles = StyleSheet.create({
    brandName: {
        fontFamily: 'serif',
        color: primaryGrey,
        fontWeight: '900',
        fontSize: 20
    },
    icon: {
        alignItems: "center",
        justifyContent: 'center',
        marginHorizontal: 5
    },
    container:{
        flex:1,
        backgroundColor:'white'
    }
})