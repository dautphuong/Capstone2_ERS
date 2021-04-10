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
export default class Lesson extends Component {
    render() {
        return (
            <ImageBackground source={bgImage} style={styles.imageBackgroundContainer}>
                
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    imageBackgroundContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#fff',
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight:16,
    },
})