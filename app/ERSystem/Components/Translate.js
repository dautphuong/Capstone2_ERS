import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import bgImage from '../image/logins.jpg';
import Logo from '../image/English_REVIEW.png';
import Pra from '../image/Pra.jpg';
import Exam from '../image/Exam.jpg';
import Learn from '../image/startlearn.jpg';

export default class Translate extends Component {
    render() {
        return (
            <ImageBackground source={bgImage} style={styles.ImageBackground}>
                
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    ImageBackground:{
        width: '100%',
        height: '100%',
    },
})