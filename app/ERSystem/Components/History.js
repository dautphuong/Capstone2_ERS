import React, { Component } from 'react';
import axios from 'axios';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native';
import bgImage from '../image/logins.jpg';
import contest from '../image/contest.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class CalendarExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contests: [],
        }
    }
    async componentDidMount() {
        const idUser = await AsyncStorage.getItem('id');
        console.log(idUser)
        await axios.get(`/history/findHistoryByUser/${idUser}`)
        try {
            await axios.get(`/history/findHistoryByUser/${idUser}`)
                .then(res => {

                    this.setState({
                        contests: res.data
                    })
                    console.log(res.data)
                })
        } catch (error) {
            console.error(error);
        }

    }
    checkOpen(content) {
        var timeStart = (content.contest.timeStart.split(' ')[0].split('-')).concat(content.contest.timeStart.split(' ')[1].split(':'));
        var timeEnd = (content.contest.timeEnd.split(' ')[0].split('-')).concat(content.contest.timeEnd.split(' ')[1].split(':'));
        var d1 = new Date(timeStart[0], timeStart[1] - 1, timeStart[2], timeStart[3], timeStart[4], timeStart[5]);
        var d2 = new Date(timeEnd[0], timeEnd[1] - 1, timeEnd[2] - 1, timeEnd[3], timeEnd[4], timeEnd[5]);
        var now = new Date();
        console.log(d2);
        console.log(now);
        console.log(d2 - now);
        if (d2 - now < 0) {
            return false
        }
        else {
            return true
        }
    }

    render() {
        const { navigation } = this.props;
        const { contests } = this.state;
        if (contests.length !== 0) {
            return (
                <ImageBackground source={bgImage} style={styles.imageBackgroundContainer}>
                    <FlatList
                        data={contests}
                        renderItem={({ item }) => (
                            < TouchableOpacity
                                disabled={this.checkOpen(item)}
                                activeOpacity={0.6}
                                onPress={() => navigation.navigate('Result', {
                                    Contest: item.contest.title,
                                    idExam: item.idExam,
                                    idHistory: item.id
                                })}
                            >
                                <View style={styles.container}>
                                    <Text style={styles.title}>{item.contest.title}</Text>
                                    <Text style={styles.title}>Thời gian nộp bài: {item.createOnUTC}</Text>
                                    <Image style={styles.bookImage} source={contest}></Image>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ImageBackground>
            )
        } else {
            return (
                <ImageBackground source={bgImage} style={styles.imageBackgroundContainer}>
                </ImageBackground>

            )
        }

    }

};
const styles = StyleSheet.create({
    bookImage: {
        width: 70,
        height: 70
    },
    imageBackgroundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#fff',
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
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
    title: {
        textTransform: 'uppercase',
        marginBottom: 8,
        fontWeight: '700',
    },

})