import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import bgImage from '../image/logins.jpg';
import Logo from '../image/English_REVIEW.png';
import Pra from '../image/Pra.jpg';
import Exam from '../image/Exam.jpg';
import Learn from '../image/startlearn.jpg';



export default class Login extends React.Component {
    render() {
        return (
            <ImageBackground
                source={bgImage}
                style={{ width: "100%", height: "100%" }}>
                <View style={styles.menu}>
                    <Image source={Logo} style={styles.logo} />
                    <Icon name={'account-circle'}
                        size={50}
                        color={'rgba(255,255,255,0.7)'}
                        style={styles.accountCircle} />
                </View>
                <View style={styles.header}>
                    <Text style={styles.welcome}>
                        Yay, you're here!
                    </Text>
                    <Text style={styles.welcomehere}>
                        <Text >
                            Rất hân hạnh được giúp bạn học Tiếng Anh.
                        </Text>
                        <Text >
                            Chúng ta bắt đầu nào.
                        </Text>
                    </Text>
                    <View style={styles.box}>
                        <TouchableOpacity style={styles.content}>
                            <Image
                                source={Learn}
                                style={styles.image}
                            />
                            <Text style={styles.Text}>
                                Bắt đầu học
                                </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.content}>
                            <Image
                                source={Pra}
                                style={styles.image}
                            />
                            <Text style={styles.Text}>
                                Luyện Tập
                                </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.content}>
                            <Image
                                source={Exam}
                                style={styles.image} />
                            <Text style={styles.Text}>
                                Thi
                                </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
};
const styles = StyleSheet.create({
    menu: {
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        width: 55,
        height: 55,
        justifyContent: 'center',
        borderRadius: 50,

    },
    Text: {
        fontSize: 25,
        paddingLeft: 15,
        fontFamily: 'Helvetica',
    },
    box: {
        padding: 20,
        backgroundColor: "#F5FBEF",
        borderRadius: 40,
        flexDirection: 'column',
    },
    content: {
        marginTop: 20,
        height: 70,
        width: "100%",
        borderRadius: 20,
        backgroundColor: 'green',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    logo: {
        width: 150,
        height: 150,
    },
    accountCircle: {
        marginLeft: 200,
    },
    header: {
        paddingHorizontal: 40,
        marginTop: 25,
    },
    welcome: {
        fontSize: 25,
        color: "#522289",
        fontFamily: "RobotoBold",
    },
    welcomehere: {
        fontSize: 17,
        fontFamily: "RobotoBold",
        color: "#FFF",
        height: 130,
        paddingTop: 20,
        width: 330,
    },
})