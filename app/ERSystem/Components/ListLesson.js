import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Image,
    FlatList,
} from 'react-native';
import bgImage from '../image/logins.jpg';
import logo from '../image/English_REVIEW.png';
import book from '../image/book.png';
import dumbbell from '../image/dumbbell.png';
import exam from '../image/exam.png';

export default class ListLesson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [
                {id: '1', name:'Bài Học'},
                {id: '2', name:'Luyện Tập'},
                {id: '3', name:'Kỳ Thi'},
            ],
        }
    }
    render() {
        const { pages } = this.state;
        return (
            <ImageBackground source={bgImage} style={styles.imageBackgroundContainer}>
                <FlatList
                    data={pages}
                    renderItem={({item}) =>(
                <View style={styles.container}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Image style={styles.bookImage} source={book}></Image>
                </View>
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
        paddingLeft: 16,
        paddingRight:16,
    },
    container: {
        alignItems: 'center',
        padding: 16,
        borderRadius: 4,
        backgroundColor: '#006666',
        shadowColor: '#000000',
        elevation: 10,
        shadowOpacity: 0.5,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 0 },
        marginBottom: 16
    },
    title: {
        textTransform: 'uppercase',
        marginBottom: 8,
        fontWeight: '700'
    },
    
})