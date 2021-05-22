import React, { Component } from 'react';

import { View, FlatList, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserAvatar from 'react-native-user-avatar';
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            learners: []
        }
    }

    async componentDidMount() {
        let idUser = await AsyncStorage.getItem('id');
        try {
            axios.get(`/user/findById/${idUser}`)
                .then(res => {
                    this.setState({
                        learners: res.data
                    })
                })
        } catch (error) {
            console.error(error);
        }
    }
    render() {
        const { learners } = this.state;
        return (
            <ImageBackground source={require('../image/logins.jpg')} style={styles.ImageBackground} >
                <FlatList
                    data={learners}
                    renderItem={({ item }) => (
                        <View>
                            <View style={styles.Header}></View>
                            <View style={styles.avatar}>
                                <UserAvatar name="Avishay Bar" style={styles.Image2} />
                            </View>
                            <View style={styles.email}>
                                <Text style={styles.user}>Tên đăng nhập</Text>
                                <Text>{item.username}</Text>
                            </View>
                            <View style={styles.pass}>
                                <Text style={styles.user}>Email</Text>
                                <Text>{item.email}</Text>
                            </View>
                            <View style={styles.pass}>
                                <Text style={styles.user}>Đổi mật khẩu</Text>
                            </View>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.logout} >
                                    Đăng xuất
                            </Text>
                            </TouchableOpacity>

                        </View>
                    )}
                />
            </ImageBackground>
        )
    }
};
const styles = StyleSheet.create({
    Header: {
        padding: 5,
        width: '100%',
        height: 100,
    },
    Image1: {
        width: 30,
        height: 30,
    },
    Image2: {
        width: 140,
        height: 140,
        borderRadius: 100,
        marginTop: -70,

    },
    avatar: {
        alignItems: 'center',
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 10,
        color: 'grey'

    },
    email: {
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
    pass: {
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
    logout: {
        fontSize: 15,
        color: 'green',
        fontWeight: 'bold',
        marginLeft: 10
    },
    button: {
        alignSelf: 'center',
        flexDirection: 'row',
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
    ImageBackground: {
        width: "100%",
        height: "100%",
    },
    user: {
        fontWeight: "bold",
        fontSize: 15,
    },
    container: {
        alignItems: 'center',
        padding: 16,
        borderRadius: 5,
        backgroundColor: '#F5FBEF',
        shadowColor: '#000',
        elevation: 3,
        shadowOpacity: 0.5,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 0 },
        marginBottom: 16
    },
});