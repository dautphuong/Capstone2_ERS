/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Keyboard,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class Login extends Component {
    render() {
        const Divider = (props) => {
            return <View {...props}>
                <View style={styles.line}></View>
                <Text style={styles.textOR}>OR</Text>
                <View style={styles.line}></View>
            </View>
        }
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <View style={styles.container}>
                <View style={styles.up}>
                    <Ionicons 
                    name="school-outline"
                    size={100}
                    color={"rgba(255, 35, 88, 1)"}>
                    </Ionicons>
                    < Text style={styles.title}>
                        English Review System
                    </Text>
                    <Text Text style={styles.description}>
                        Login
                    </Text>
                </View>
                <View style={styles.down}>
                    <View style={styles.TextInputContainer}>
                        <TextInput style={styles.input}
                        textContentType='username'
                        keyboardType='email-address'
                        placeholder='Enter your UserName'
                        >
                        </TextInput>
                    </View>
                    <View style={styles.TextInputContainer}>
                        <TextInput style={styles.input}
                        placeholder='Enter your password'
                        secureTextEntry= {true}
                        >
                        </TextInput>
                    </View>
                    <TouchableOpacity style={styles.loginButton}>
                        <Text style={styles.loginButtonTitle}>
                            Login
                        </Text>
                    </TouchableOpacity>
                    <Divider style={styles.divider}></Divider>
                    <FontAwesome.Button 
                    style={styles.googleButton}
                    name="google"
                    backgroundColor="red"
                    >
                        <Text style={styles.loginButtonTitle}>
                            Login With Google
                        </Text>
                    </FontAwesome.Button>
                </View>
            </View>
            </TouchableWithoutFeedback>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: "rgba(255, 181, 88, 1)"
    },
    up: {
        flex: 3,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "red"
    },
    down: {
        flex: 6.5,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    title:{
        textAlign: "center",
        width: 400,
        fontSize: 35,
        color: "white",
    },
    description:{
        textAlign: "center",
        width: 200,
        color: "white",
        fontSize: 30
    },
    TextInputContainer:{
        paddingHorizontal: 10,
        borderRadius:6,
        marginBottom: 20,
        backgroundColor: "rgba(249, 124, 28, 0.4)",
    },
    input:{
        width: 280,
        height: 45,
    },
    loginButton: {
        width: 300,
        height: 45,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(249, 124, 28, 1)",
    },
    loginButtonTitle:{
        fontSize: 20,
        color: "white",
    },
    googleButton:{
        width: 300,
        height: 45,
        borderRadius: 6,
        justifyContent: "center",
    },
    line: {
        height:1,
        flex: 2,
        backgroundColor: "black",
    },
    textOR:{
        flex:1,
        textAlign: "center",
    },
    divider:{
        flexDirection: "row",
        width : 300,
        height :40,
        justifyContent: "center",
        alignItems: "center",
    }
})