import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import bgImage from '../image/logins.jpg';
import Logo from '../image/English_REVIEW.png';
import Pra from '../image/Pra.jpg';
import Exam from '../image/Exam.jpg';
import Learn from '../image/startlearn.jpg';

export default class ReadyContest extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <ImageBackground
                source={bgImage}
                style={{ width: "100%", height: "100%" }}>
                <View style={styles.menu}>
                    <Image source={Logo} style={styles.logo} />
                </View>
                <View style={styles.header}>
                    <Text style={styles.welcome}>
                        Yay, Ready to do test!
                    </Text>
                    <View style={styles.box}>
                        <TouchableOpacity
                            style={styles.content}
                            onPress={() => navigation.navigate('ListTopic')}>
                            <Image
                                source={Learn}
                                style={styles.image}
                            />
                            <Text style={styles.Text}>
                                Bắt đầu làm bài
                                </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.content}>
                            <Image
                                source={Pra}
                                style={styles.image}
                            />
                            <Text style={styles.Text}>
                                Xem đáp án
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
        backgroundColor: 'white'
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
        marginLeft: 100,
        width: 200,
        height: 200,
    },
    header: {
        paddingHorizontal: 40,
        marginTop: 25,
    },
    welcome: {
        marginBottom: 30,
        marginLeft: 45,
        fontSize: 25,
        color: "#522289",
    },
    welcomeHere: {
        fontSize: 17,
        fontFamily: "RobotoBold",
        color: "#FFF",
        height: 130,
        paddingTop: 20,
        width: 330,
    },
})