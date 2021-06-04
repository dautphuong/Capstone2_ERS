import React, { Component } from 'react';
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
    Alert
} from 'react-native';
import axios from 'axios';
import bgImage from '../image/logins.jpg';
import logo from '../image/English_REVIEW.png';

const { width: WIDTH } = Dimensions.get('window');
const initialState = {
    showPass: true,
    press: false,
    username: '',
    email: '',
    account: '',
    password: '',
    nameError: '',
    passwordError: '',
    mailError: '',
}
export default class Register extends Component {
    state = initialState;
    validate() {
        let nameError = '';
        let passwordError = '';
        let mailError = '';
        if (!this.state.password) {
            passwordError = 'Mật khẩu không được để trống';
        }
        if (!this.state.username) {
            nameError = 'Tên tài khoản không được để trống';
        }
        if (!this.state.email.includes("@")) {
            mailError = "Email sai";
        }

        if (mailError || nameError || passwordError) {
            this.setState({ mailError, nameError, passwordError });
            return false;
        }
        return true;
    }
    registerClickHandler() {
        const { navigation } = this.props
        console.log(this.state.username, this.state.email, this.state.password)
        const invalid = this.validate();
        if (invalid) {
            console.log(this.state)
            this.setState(initialState)
            const dataPayloads = {
                "username": this.state.username,
                "email": this.state.email,
                "password": this.state.password
            }
            axios.post('/user/register', dataPayloads)

                .then(res => {
                    console.log(res.data)
                    if (res.data === "Account already exists") {
                        Alert.alert("'Error', 'Vui lòng Tên tài khoản và Mật khẩu'")
                    } else {
                        Alert.alert('Bạn đã đăng ký thành công',
                            navigation.navigate('Login'),
                        )
                    }
                })
                .catch(err => {
                    console.log(err)

                })

        } else {


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
        const { navigation } = this.props;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <ImageBackground source={bgImage} style={styles.imageBackgroundContainer}>
                    <View style={styles.containerLogo}>
                        <Image source={logo} style={styles.logo}></Image>
                        <Text style={styles.textRegister}>Đăng Ký</Text>
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
                            onChangeText={(text) => this.setState({ username: text })}
                        />

                    </View>
                    <Text style={{ fontSize: 12, color: "red", bottom: 120 }}>{this.state.nameError}</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name={'lock-closed-outline'}
                            size={28}
                            color={'rgba(255,255,255,0.7)'}
                            style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder={'Mật Khẩu'}
                            minLength={5}
                            secureTextEntry={this.state.showPass}
                            placeholderTextColor={'rgba(68, 248, 161, 0.7)'}
                            underlineColorAndroid='transparent'
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
                    <Text style={{ fontSize: 12, color: "red", bottom: 120 }}>{this.state.passwordError}</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name={'logo-google'}
                            size={28}
                            color={'rgba(255,255,255,0.7)'}
                            style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder={'E-mail'}
                            keyboardType='email-address'
                            placeholderTextColor={'rgba(68, 248, 161, 0.7)'}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({ email: text })}
                        />
                    </View>
                    <Text style={{ fontSize: 12, color: "red", bottom: 120 }}>{this.state.mailError}</Text>
                    <TouchableOpacity
                        style={styles.btnRegister}
                        onPress={() => this.registerClickHandler()}
                    >
                        <Text style={styles.Text}>Đăng Ký</Text>
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
        bottom: 110,
        alignItems: 'center',
    },
    logo: {
        width: 230,
        height: 230,
    },
    textRegister: {
        color: 'green',
        fontSize: 25,
        fontWeight: '200',
        opacity: 0.6
    },
    inputContainer: {
        marginTop: 15,
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
    btnRegister: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#3399CC',
        justifyContent: 'center',
        bottom: 90
    },
    Text: {
        textAlign: 'center',
        fontSize: 20,
        color: '#F8F8FF'
    },
})