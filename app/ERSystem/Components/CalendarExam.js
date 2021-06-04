import React, { Component } from 'react';
import axios from 'axios';
import { format } from "date-fns";
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
            IdContest: []
        }
    }
    async componentDidMount() {
        const idUser = await AsyncStorage.getItem('id');
        axios.get('/contest/findAll')
            .then(res => {
                this.setState({
                    contests: res.data

                })
                console.log(res.data[0].id)
            })
            .catch(error => {
                console.error(error)
            })

        await axios.get(`/history/findHistoryByUser/${idUser}`)
            .then(res => {
                let arrIdContest = [];
                let listHistory = res.data;

                for (let i = 0; i < listHistory.length; i++) {
                    arrIdContest.push(listHistory[i].contest.id)
                }
                this.setState({ IdContest: arrIdContest })
            })
            .catch(error => {
                console.error(error)
            })

    }
    checkOpen(content) {
        const { contests, history } = this.state;
        let listIdContest = this.state.IdContest;
        let len = 0;
        len = listIdContest.length;
        if (len > 0) {
            if (listIdContest.some(value => value == content.id)) {
                return true;
            }
        }
        // console.log("id" + content.id)
        // console.log(listIdContest.some(content.id))


        var timeStart = (content.timeStart.split(' ')[0].split('-')).concat(content.timeStart.split(' ')[1].split(':'));
        var timeEnd = (content.timeEnd.split(' ')[0].split('-')).concat(content.timeEnd.split(' ')[1].split(':'));
        var d1 = new Date(timeStart[0], timeStart[1] - 1, timeStart[2], timeStart[3], timeStart[4], timeStart[5]);
        var d2 = new Date(timeEnd[0], timeEnd[1] - 1, timeEnd[2], timeEnd[3], timeEnd[4], timeEnd[5]);
        var now = new Date();
        if (d1 - now < 0 && d2 - now > 0) {
            return false
        }
        else {
            return true
        }

    }
    render() {
        const { navigation } = this.props;
        const { contests } = this.state;
        return (
            <ImageBackground source={bgImage} style={styles.imageBackgroundContainer}>
                <FlatList
                    data={contests}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            disabled={this.checkOpen(item)}
                            activeOpacity={0.6}
                            onPress={() => navigation.push('ReadyContest', {
                                Contest: item.title,
                                idExam: item.idExam,
                                idContest: item.id
                            })}
                        >
                            <View style={styles.container}>
                                <Text style={styles.title}>Tên cuộc thi: {item.title}</Text>
                                <Text style={styles.title}>Thời gian bắt đầu {item.timeStart}</Text>
                                <Text style={styles.title}>Thời gian kết thúc: {item.timeEnd}</Text>
                                <Image style={styles.bookImage} source={contest}></Image>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </ImageBackground>
        )
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