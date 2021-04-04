import React, { Component } from 'react';
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
import logo from '../image/English_REVIEW.png';
import book from '../image/book.png';
import dumbbell from '../image/dumbbell.png';
import exam from '../image/exam.png';

export default class ListTopic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [
                {id: '1', name:'Cấu trúc chung của một câu trong tiếng Anh'},
                {id: '2', name:'Noun phrase (ngữ danh từ)'},
                {id: '3', name:'Verb phrase (ngữ động từ)'},
                {id: '4', name:'Sự hòa hợp giữa chủ ngữ và động từ'},
                {id: '5', name:'Đại từ'},
                {id: '6', name:'Tân ngữ (complement / object) và các vấn đề liên quan'},
                {id: '7', name:'Một số động từ đặc biệt (need, dare, to be, get)'},

            ],
        }
    }
    render() {
        const {navigation} =this.props;
        const { pages } = this.state;
        return (
            <ImageBackground source={bgImage} style={styles.imageBackgroundContainer}>
                <FlatList
                    data={pages}
                    renderItem={({item}) =>(
                <TouchableOpacity 
                activeOpacity={0.6}
                onPress={() => navigation.navigate('ListLesson',{
                    Topics: item.name
                })}
                >
                <View style={styles.container}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Image style={styles.bookImage} source={book}></Image>
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
        width: 70 ,
        height: 70
    },
    imageBackgroundContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#fff',
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight:16,
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