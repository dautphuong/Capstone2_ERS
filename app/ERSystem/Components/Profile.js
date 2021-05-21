import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    Text,
    StyleSheet,
    FlatList,
    ImageBackground
} from 'react-native';
import axios from 'axios';
export default class Profile extends Component {
    constructor() {
        super();
        this.state = {
            Profile: []
        }
    }
    componentDidMount() {
        const { id } = this.props.route.params;
        try {
            console.log(AsyncStorage.getItem("idUser"))
            console.log('`/user/findById/`' + AsyncStorage.getItem("idUser")),
                axios.get(`/user/findById/` + AsyncStorage.getItem("idUser"), {
                    headers: {
                        'Authorization': 'Bearer ' + AsyncStorage.getItem("token")
                    }
                })
                    .then(res => {
                        this.setState({
                            Profile: res.data
                        })
                    })
        } catch (error) {
            console.error(error);
        }
    }
    render() {
        const { navigation } = this.props;
        const { Profile } = this.state;
        return (
            <ImageBackground source={require('../image/logins.jpg')} style={styles.ImageBackground} >
                <FlatList
                    data={Profile}
                    renderItem={({ item }) => (
                        <View>
                            <View style={styles.Header}></View>
                            {/* <View style={styles.avatar}>
                                <UserAvatar name="Avishay Bar" style={styles.Image2} />
                            </View> */}
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
        );
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
    }
});