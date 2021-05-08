import React, { Component } from 'react';
import {View,ScrollView, TouchableOpacity, Image, Text,StyleSheet, ViewComponent, ImageBackground} from 'react-native';

export default class Profile extends Component {
    render () {
        const {navigation} =this.props;
        return (
            <ImageBackground source={require('../image/logins.jpg')} style={styles.ImageBackground} >
                <ScrollView>
                    <View style={styles.Header}>
                    </View>
                    <View style={styles.avatar}>
                        <Image source={require('../image/avatar.jpg')} style={styles.Image2}></Image>
                        
                    </View>
                    <View style={styles.email}>
                        <Text style={styles.user}>Tên đăng nhập</Text>
                        <Text>Loc123</Text>
                    </View>
                    <View style={styles.pass}>
                        <Text style={styles.user}>Email</Text>
                        <Text>Linhle8599@gmai.com</Text>
                    </View>
                    <View style={styles.pass}>
                        <Text style={styles.user}>Đổi mật khẩu</Text>
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.logout}>
                        Logout
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </ImageBackground>
        );
    }
};
const styles = StyleSheet.create({
    Header: {
        padding: 5,
        width: '100%',
        height: 100,
    },
    Image1:{
        width:30,
        height:30,
    },
    Image2: {
        width: 140,
        height: 140,
        borderRadius: 100,
        marginTop: -70,

    },
    avatar:{
        alignItems: 'center',
    },
    name:{
        fontSize: 25,
        fontWeight: 'bold',
        padding: 10,
        color: 'grey'

    },
    email:{
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: '90%',
        padding: 20,
        paddingBottom: 22,
        borderRadius: 10,
        shadowOpacity: 80,
        elevation: 15,
        marginTop: 60,

    },
    pass:{
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: '90%',
        padding: 20,
        paddingBottom: 22,
        borderRadius: 10,
        shadowOpacity: 80,
        elevation: 15,
        marginTop: 20,
    },
    logout:{
        fontSize: 15,
        color: 'green',
        fontWeight: 'bold',
        marginLeft: 10
    },
    button:{
        alignSelf: 'center',
        flexDirection:'row',
        justifyContent: 'center',
        backgroundColor: 'black',
        width: '90%',
        padding: 20,
        paddingBottom: 22,
        borderRadius: 10,
        shadowOpacity: 80,
        elevation: 15,
        marginTop: 20,
    },
    ImageBackground:{
        width: "100%", 
        height: "100%",
    },
    user:{
        fontWeight: "bold",
        fontSize: 15,
    }
});