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
} from 'react-native';
import bgImage from '../image/logins.jpg';
import contest from '../image/contest.png';


export default class CalendarExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contests: [],
        }
    }
    componentDidMount() {
        axios.get('/contest/findAll')
            .then(res => {
                this.setState({
                    contests: res.data

                })
                console.log(res.data)
            })
            .catch(error => {
                console.error(error)
            })
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
                            activeOpacity={0.6}
                            onPress={() => navigation.navigate('ReadyContest', {
                                Contest: item.name,
                                id: item.id
                            })}
                        >
                            <View style={styles.container}>
                                <Text style={styles.title}>{item.name}</Text>
                                <Text style={styles.title}>{item.timeStart}</Text>
                                <Text style={styles.title}>{item.timeEnd}</Text>
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