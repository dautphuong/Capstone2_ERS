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
import dumbbell from '../image/dumbbell.png';

export default class ListLesson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lessons: []
        }
    }
    async componentDidMount() {
        const { id } = this.props.route.params;
        console.log(this.props.route);
        try {
            axios.get(`/lesson/findByTopic/${id}`)
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
        const { navigation } = this.props;
        return (
            <ImageBackground source={bgImage} style={styles.imageBackgroundContainer}>
                <FlatList
                    data={lessons}
                    renderItem={({ item }) => (
                        <TouchableOpacity activeOpacity={0.6}
                            onPress={() => navigation.navigate('LessonContent', {
                                name: item.title,
                                idLesson: item.id,
                            })}
                        >
                            <View style={styles.container}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Image style={styles.bookImage} source={dumbbell}></Image>
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
        fontWeight: '700',
    },

})