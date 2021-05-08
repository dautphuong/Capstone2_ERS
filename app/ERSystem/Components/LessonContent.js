import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import bgImage from '../image/logins.jpg';

export default class LessonContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lessons: []
        }
    }
    async componentDidMount() {
        const { idLesson } = this.props.route.params;
        console.log(this.props.route);
        try {
            axios.get(`/lesson/findById/${idLesson}`, {
                headers: {
                    'Authorization': 'Bearer ' + AsyncStorage.getItem("token")
                }
            })
                .then(res => {
                    this.setState({
                        lessons: res.data
                    })
                })
        } catch (error) {
            console.error(error);
        }
    }
    render() {
        const { lessons } = this.state;
        console.log(lessons)
        const b = (props) => <Text style={{ fontWeight: 'bold' }}>{props.content}</Text>
        return (
            <ImageBackground source={bgImage} style={styles.imageBackgroundContainer}>
                <FlatList
                    data={lessons}
                    keyExtractor={(item, index) => {
                        return item.id;
                    }}
                    renderItem={({ item }) => (
                        <View style={styles.container}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.content}>{item.content}</Text>

                            <TouchableOpacity
                                style={styles.btnPractice}
                            >
                                <Text style={styles.Text}>Làm Bài Tập</Text>
                            </TouchableOpacity>
                        </View>
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
        paddingTop: 12,
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
        fontWeight: 'bold',
    },
    content: {
        marginBottom: 8,
        fontWeight: '200',
    },
    btnPractice: {
        width: 100,
        height: 50,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#3399CC',
        justifyContent: 'center',
    },
    Text: {
        textAlign: 'center',
        fontSize: 15,
        color: '#F8F8FF'
    },
})