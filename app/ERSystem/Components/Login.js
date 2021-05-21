
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Image,
    TextInput,
    Keyboard,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    Alert,
} from 'react-native';
import axios from 'axios';
import bgImage from '../image/logins.jpg';
import logo from '../image/English_REVIEW.png';

const { width: WIDTH } = Dimensions.get('window')

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            showPass: true,
            press: false,
            username: '',
            password: '',
            messageSuccess: '',
            messageError: '',
            loading: false
        }
    }
    checkLogin() {
        const { navigation } = this.props;
        const { username, password } = this.state;
        if (username !== '' && password) {
            const req = {
                "username": username,
                "password": password
            }
            this.setState({
                loading: true,
            })
            axios.post("/user/login", req)
                .then(
                    res => {
                        console.log(req.username)
                        Alert.alert('Bạn đã đăng nhập thành công',
                            this.setState({
                                "messageSuccess": this.state.messageSuccess,
                                messageError: ''
                            }))
                        const item = res.data
                        console.log(res.data.id),
                        AsyncStorage.setItem("token", res.data.token)
                        AsyncStorage.setItem("idUser", res.data.id)
                            

                    },
                    
            ).then(
                res => {
                    navigation.navigate('Home')
                }
            )
                .catch(err => {
                    console.log(err)
                    Alert.alert('Error', 'Tài khoản/ Mật khẩu không đúng',
                        this.setState({
                            loading: false,
                            messageError: this.state.messageError,
                            messageSuccess: ''
                        }))

                })
        } else {
            Alert.alert('Error', 'Vui lòng Tên tài khoản và Mật khẩu',
                this.setState({
                    loading: false,
                    messageError: this.state.messageError,
                    messageSuccess: ''
                }))
        }
    }
    showPass = () => {
        if (this.state.press == false) {
            this.setState({ showPass: false, press: true })
        } else {
            this.setState({ showPass: true, press: false })
        }
    }

    render() {
        const { username, password, loading } = this.state;
        const { navigation } = this.props;
        const Divider = (props) => {
            return <View {...props}>
                <View style={styles.line}></View>
                <Text style={styles.textOR}>OR</Text>
                <View style={styles.line}></View>
            </View>
        }

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <ImageBackground source={bgImage} style={styles.imageBackgroundContainer}>
                    <View style={styles.containerLogo}>
                        <Image source={logo} style={styles.logo}></Image>
                        <Text style={styles.textLogin}>Đăng Nhập</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name={'person-outline'}
                            size={28}
                            color={'rgba(255,255,255,0.7)'}
                            style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder={'Tên tài khoản'}
                            placeholderTextColor={'rgba(68, 248, 161, 0.7)'}
                            underlineColorAndroid='transparent'
                            value={username}
                            onChangeText={(text) => this.setState({ username: text })}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name={'lock-closed-outline'}
                            size={28}
                            color={'rgba(255,255,255,0.7)'}
                            style={styles.passIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder={'Mật Khẩu'}
                            secureTextEntry={this.state.showPass}
                            placeholderTextColor={'rgba(68, 248, 161, 0.7)'}
                            underlineColorAndroid='transparent'
                            value={password}
                            onChangeText={(text) => this.setState({ password: text })}
                        />
                        <TouchableOpacity style={styles.btnEye}
                            onPress={this.showPass.bind(this)}>
                            <Ionicons name={this.state.press == false ? 'eye-outline' : 'eye-off-outline'}
                                size={26}
                                color={'rgba(255,255,255,0.7)'} >
                            </Ionicons>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{
                            ...styles.btnLogin,
                            backgroundColor: loading ? "#ddd" : "#3399CC"
                        }}
                        onPress={() => this.checkLogin()}
                        disabled={loading}
                    >
                        <Text style={styles.Text}>
                            {loading ? "Loading..." : "Đăng Nhập"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btnRegister}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.Text}>Tạo tài khoản</Text>
                    </TouchableOpacity>
                    <Divider style={styles.divider}></Divider>
                    <TouchableOpacity style={styles.btnGoogle}>
                        <Ionicons name={'logo-google'}
                            size={28}
                            color={'rgba(238,0,0,0.7)'}
                            style={styles.inputIconGoogle} />
                        <Text style={styles.textGoogle}>Đăng nhập với Google</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </TouchableWithoutFeedback>
        );
    }
};


const styles = StyleSheet.create({
    imageBackgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerLogo: {
        bottom: 120,
        alignItems: 'center',
    },
    logo: {
        width: 250,
        height: 250,
    },
    textLogin: {
        color: 'green',
        fontSize: 25,
        fontWeight: '200',
        opacity: 0.6
    },
    input: {
        width: WIDTH - 55,
        height: 55,
        bottom: 120,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
    },
    inputIcon: {
        position: 'absolute',
        bottom: 133,
        left: 37
    },
    passIcon: {
        position: 'absolute',
        bottom: 135,
        left: 37
    },
    inputContainer: {
        marginTop: 15,
    },
    btnEye: {
        position: 'absolute',
        bottom: 133,
        right: 37
    },
    btnLogin: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        justifyContent: 'center',
        bottom: 90
    },
    Text: {
        textAlign: 'center',
        fontSize: 20,
        color: '#F8F8FF'
    },
    btnRegister: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#3399CC',
        justifyContent: 'center',
        bottom: 75
    },
    line: {
        height: 1,
        flex: 2,
        backgroundColor: "black",
    },
    textOR: {
        flex: 1,
        textAlign: "center",
    },
    divider: {
        flexDirection: "row",
        width: 300,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        bottom: 75
    },
    btnGoogle: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#3399CC',
        justifyContent: 'center',
        bottom: 75
    },
    inputIconGoogle: {
        position: 'absolute',
        left: 20
    },
    textGoogle: {
        textAlign: 'center',
        fontSize: 20,
        color: '#F8F8FF'
    }
})
