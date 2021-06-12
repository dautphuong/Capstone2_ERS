import React, { Component } from 'react';
import { View, FlatList, Modal, Pressable, Alert, TouchableOpacity, Image, Text, StyleSheet, ImageBackground, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from "react-native-image-picker";
import * as firebase from 'firebase';
import storage from '@react-native-firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCSPHnqJ20SJ2IUXhLVR-elG1JcaMCNPMg",
    authDomain: "er-system-2b346.firebaseapp.com",
    databaseURL: "https://er-system-2b346-default-rtdb.firebaseio.com",
    projectId: "er-system-2b346",
    storageBucket: "er-system-2b346.appspot.com",
    messagingSenderId: "458386443472",
};
firebase.initializeApp(firebaseConfig);


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            learners: [],
            modalIsOpen: false,
            modalIsOpen1: false,
            modalIsOpen2: false,
            modalVisible: false,
            modalVisible1: false,
            modalVisible2: false,
            email: '',
            password: '',
            rePassNew: '',
            passOld: '',
            passnew: '',
            showPass: true,
            fileUri: '',
            fileName: '',
            uploading: false,
            setUploading: false,
            transferred: 0,
            setTransferred: 0,
            URL: ''
        };
    }

    async componentDidMount() {
        this.reload();
    }
    async reload() {
        let token = await AsyncStorage.getItem('token');
        let idUser = await AsyncStorage.getItem('id');
        console.log(idUser)
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
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    setModalVisible1 = (visible) => {
        this.setState({ modalVisible1: visible });
    }
    setModalVisible2 = (visible) => {
        this.setState({ modalVisible2: visible });
    }
    logout() {
        const { navigation } = this.props;
        try {
            axios.put(`/user/logout`)
                .then(res => {
                    AsyncStorage.removeItem('token')
                    AsyncStorage.removeItem('id')
                })
                .then(
                    res => {

                        navigation.navigate('Login')
                    }
                )
        } catch (error) {
            console.error(error);
        }
    }
    onUpdate = async () => {
        const { navigation } = this.props;
        const learnerInfo = JSON.parse(JSON.stringify(this.state.learners));
        console.log("Email: ", this.state.email)
        const emailUpdateObject = learnerInfo[0];
        emailUpdateObject['email'] = this.state.email;
        if (this.state.email !== '' && this.state.email.includes("@")) {
            console.log("data payload 123: ", emailUpdateObject);
            axios.put('/user/updateEmail', emailUpdateObject)
                .then(
                    res => {
                        Alert.alert('Bạn đã đổi Email thành công',
                        )
                    })

                .catch(err => {
                    console.log(err)
                })
            this.setModalVisible(false)
        } else {
            Alert.alert('Error', 'Email không hợp lệ', [{
                text: 'Làm lại'
            }])
        }
    }
    onUpdatePassword = async () => {
        const { navigation } = this.props;
        const learnerInfo = JSON.parse(JSON.stringify(this.state.learners));
        console.log(learnerInfo.password);
        console.log("Password: ", this.state.passnew)
        const passwordUpdateObject = learnerInfo[0];
        passwordUpdateObject['password'] = this.state.passnew;
        if (this.state.passOld !== '' && this.state.passnew !== '' && this.state.rePassNew !== '') {
            if (this.state.passnew == this.state.rePassNew) {
                console.log("data payload 123: ", passwordUpdateObject);
                axios.put('/user/updatePassword', passwordUpdateObject)
                    .then(
                        res => {
                            Alert.alert('Bạn đã đổi mật khẩu thành công',
                            )
                        })
                    .catch(err => {
                        console.log(err)
                        Alert.alert('Error', 'Mật khẩu phải có ít nhất 6 ký tự',
                        )
                    })
                this.setModalVisible1(false)
            }
            else {
                Alert.alert('Error', 'mật khẩu cũ hoặc nhập lại mật khẩu không đúng', [{
                    text: 'ok'
                }])
            }
        } else {
            Alert.alert('Error', 'Vui lòng điền đây đủ thông tin', [{
                text: 'Oke'
            }])
        }
    }
    showPass = () => {
        if (this.state.press == false) {
            this.setState({ showPass: false, press: true })
        } else {
            this.setState({ showPass: true, press: false })
        }
    }
    uploadimage = async (uri, fileName) => {
        console.log("haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        console.log("URI:", uri)
        const response = await fetch(uri);
        const blod = await response.blob();
        var ref = firebase.storage().ref().child("avatars/" + fileName);
        //const url = await response.getDownloadURL().catch((error) => { throw error });
        const url = await firebase.storage().ref("avatars/" + fileName).getDownloadURL();
        this.setState({ URL: url })
        console.log("URL:", url)
        // console.log(response);
        // console.log(blod);
        return ref.put(blod);
    }
    save = async () => {
        const uri = this.state.fileUri;

        if (uri != '') {
            await this.uploadimage(uri)
            const URL = this.state.URL;
            console.log(URL)
            const data = {
                id: await AsyncStorage.getItem('id'),
                avatar: URL
            }
            console.log(data)
            axios.put(`/user/updateAvatar`, data)
                .then((res) => {
                    console.log("Status:", res.data)
                    AsyncStorage.removeItem('token')
                    AsyncStorage.removeItem('id')
                    Alert.alert("thay ảnh đại diện thành công");

                })
                .catch((error) => {
                    Alert.alert(error);
                    Alert.alert('Error', 'Thất bại')
                });
            this.setModalVisible2(false)
            this.reload();
        }
    }
    launchImageLibrary = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'avatar',
            },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
            const imageUrl = response.assets[0].uri;
            const imagefilename = response.assets[0].fileName
            console.log(imageUrl)
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri, fileName: response.fileName };
                console.log('response', JSON.stringify(response));
                this.setState({
                    fileUri: imageUrl,
                    fileName: imagefilename
                });
            }
        });
    }

    renderFileUri() {
        const { fileUri } = this.state
        console.log("uri : ", this.state.learners);
        if (this.state.fileUri.length > 0) {
            return <Image
                source={{ uri: this.state.fileUri }}
                style={styles.Image3}
            />
        } else {
            return <Image
                source={{ uri: this.state.learners.avatar }}
                style={styles.Image3}
            />
        }
    }
    render() {
        const { learners } = this.state;
        const { modalVisible } = this.state;
        const { modalVisible1 } = this.state;
        const { modalVisible2 } = this.state;
        const { password } = this.state;
        return (
            <ImageBackground source={require('../image/logins.jpg')} style={styles.ImageBackground} >
                <FlatList
                    data={learners}
                    renderItem={({ item }) => (
                        <View>
                            <View style={styles.Header}></View>
                            <View>
                                <View>
                                    <Modal style={styles.update} animationType="slide"
                                        transparent={true}
                                        visible={modalVisible2}
                                        onRequestClose={() => {
                                            this.setModalVisible2(!modalVisible2);
                                        }}>
                                        <View style={styles.centeredView}>
                                            <View style={styles.modalView3}>
                                                <Text style={styles.user5}>Ảnh đại diện</Text>
                                                <View >
                                                    {this.renderFileUri()}
                                                </View>
                                                <View style={styles.save1}>
                                                    <Text style={styles.textStyle}
                                                        onPress={() => this.launchImageLibrary()}>chọn ảnh</Text>
                                                    <Text style={styles.textStyle} onPress={() => this.save()}>Lưu</Text>
                                                    <Pressable
                                                        onPress={() => this.setModalVisible2(!modalVisible2)}
                                                    >
                                                        <Text style={styles.textStyle11}>Huỷ</Text>
                                                    </Pressable>
                                                </View>

                                            </View>
                                        </View>
                                    </Modal>
                                    <Pressable onPress={() => this.setModalVisible2(true)}>
                                        <View>
                                            <View style={styles.avatar}>
                                                <Image style={styles.Image2}
                                                    source={{ uri: item.avatar }}

                                                />
                                            </View>
                                        </View>
                                    </Pressable>
                                </View>
                            </View>
                            <View style={styles.email}>
                                <Text style={styles.user}>Tên đăng nhập</Text>
                                <Text>{item.username}</Text>
                            </View>
                            <View style={styles.pass}>
                                <Text style={styles.Text}>
                                    <View>
                                        <Modal style={styles.update} animationType="slide"
                                            transparent={true}
                                            visible={modalVisible}
                                            onRequestClose={() => {
                                                this.setModalVisible(!modalVisible);
                                            }}>
                                            <View style={styles.centeredView}>
                                                <View style={styles.modalView}>
                                                    <Text style={styles.user}>Đổi Email</Text>
                                                    <TextInput
                                                        placeholder={'E-mail'}
                                                        keyboardType='email-address'
                                                        underlineColorAndroid='transparent'
                                                        onChangeText={(text) => this.setState({ email: text })}
                                                        style={styles.TextInput} />
                                                    <View style={styles.save}>
                                                        <Text style={styles.textStyle}
                                                            onPress={() => this.onUpdate()}>Lưu</Text>
                                                        <Pressable
                                                            onPress={() => this.setModalVisible(!modalVisible)}
                                                        >
                                                            <Text style={styles.textStyle11}>Đóng</Text>
                                                        </Pressable>
                                                    </View>

                                                </View>
                                            </View>
                                        </Modal>
                                        <Pressable onPress={() => this.setModalVisible(true)}>
                                            <View style={styles.input}>
                                                <Text style={styles.user}>Email</Text>
                                                <Text style={styles.textStyle1}>sửa</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                </Text>
                                <Text>{this.state.email ? this.state.email : item.email}</Text>
                            </View>
                            <View>
                                <View style={styles.pass}>
                                    <Modal animationType="slide"
                                        transparent={true}
                                        visible={modalVisible1}
                                        onRequestClose={() => {
                                            this.setModalVisible1(!modalVisible1);
                                        }}>
                                        <View style={styles.centeredView}>
                                            <View style={styles.modalView1}>
                                                <Text style={styles.user}>Đổi mật Khẩu</Text>
                                                <View style={styles.TextInput2}>
                                                    <Text>Mật khẩu cũ: </Text>
                                                    <TextInput
                                                        secureTextEntry={this.state.showPass}
                                                        underlineColorAndroid='transparent'
                                                        onChangeText={(text) => this.setState({ passOld: text })}
                                                        style={styles.TextInput3} />
                                                </View>
                                                <View style={styles.TextInput2}>
                                                    <Text>Mật khẩu mới: </Text>
                                                    <TextInput
                                                        secureTextEntry={this.state.showPass}
                                                        underlineColorAndroid='transparent'
                                                        onChangeText={(text) => this.setState({ passnew: text })}
                                                        style={styles.TextInput3} />
                                                </View>
                                                <View style={styles.TextInput2}>
                                                    <Text>Nhập lại mật khẩu: </Text>
                                                    <TextInput
                                                        secureTextEntry={this.state.showPass}
                                                        underlineColorAndroid='transparent'
                                                        onChangeText={(text) => this.setState({ rePassNew: text })}
                                                        style={styles.TextInput3} />
                                                </View>
                                                <View style={styles.save1}>
                                                    <Text style={styles.textStyle}
                                                        onPress={() => this.onUpdatePassword()}
                                                    >Lưu</Text>
                                                    <Pressable
                                                        onPress={() => this.setModalVisible1(!modalVisible1)}
                                                    >
                                                        <Text style={styles.textStyle11}>Đóng</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </View>
                                    </Modal>
                                    <Pressable onPress={() => this.setModalVisible1(true)}>
                                        <Text style={styles.user}>Đổi mật khẩu</Text>
                                    </Pressable>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.button1}
                                activeOpacity={0.6}
                                onPress={() => this.logout()}>
                                <Text style={styles.logout}>Đăng xuất</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </ImageBackground>
        )
    };
}

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
    textStyle1: {
        color: 'blue',
        flexDirection: "row",
        marginLeft: 250,
    },
    TextInput: {
        backgroundColor: '#A9F5F2',
        height: 38,
        width: '80%',
        marginTop: 20,
        borderRadius: 10
    },
    TextInput2: {
        height: 30,
        width: '80%',
        marginTop: 40,
        borderRadius: 10
    },
    TextInput3: {
        backgroundColor: '#A9F5F2',
        height: 38,
        borderRadius: 10,
        marginTop: 5,
    },
    Image2: {
        width: 140,
        height: 140,
        borderRadius: 100,
        marginTop: -70,

    },
    Image3: {
        width: 110,
        height: 110,
        borderRadius: 100,

    },
    text: {
        flexDirection: 'row'
    },
    avatar: {
        alignItems: 'center',
        marginTop: 20
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
    button1: {
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
    user5: {
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    modalView: {
        height: '25%',
        width: '80%',
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 70,
            height: 70
        },
        shadowOpacity: 15,
        shadowRadius: 10,
        elevation: 30
    },
    modalView1: {
        height: '45%',
        width: '80%',
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 70,
            height: 70
        },
        shadowOpacity: 15,
        shadowRadius: 10,
        elevation: 30
    },
    modalView3: {
        height: '40%',
        width: '80%',
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 70,
            height: 70
        },
        shadowOpacity: 15,
        shadowRadius: 10,
        elevation: 30
    },
    button: {
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "blue",
        textAlign: "center",
        marginRight: 40
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    input: {
        flexDirection: "row",

    },
    save: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 20,
    },
    save1: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 50,
    },
    textStyle11: {
        color: 'blue'
    }
});