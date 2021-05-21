import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Result extends Component {
    state = {
        totalScore: '',
        totalUserAnswers: [],
    }

    componentDidMount() {
        const { navigation } = this.props;
        const { totalUserAnswers, totalScore, totalTime } = this.props.route.params;
        console.log("navigation ==>> ", navigation)
        this.setState({ totalUserAnswers, totalScore, totalTime })
    }

    render() {
        const { navigation } = this.props
        const { totalUserAnswers, totalScore, totalTime } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>React Native Quiz Result</Text>
                <Text style={styles.text}>Correct answer {totalScore / 10} out {totalUserAnswers.length} </Text>
                <Text style={styles.text}>Total time {(totalTime / 60000).toFixed(2)} min</Text>
                <Button
                    onPress={() => navigation.navigate('Home')}
                    title="Kết thúc"
                    color="#28a745"
                />
                <Button
                    onPress={this.reset}
                    title="Làm lại"
                    color="#28a745"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        color: '#343a40',
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        color: '#343a40',
        marginBottom: 5,
    },
    btnRegister: {
        width: 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#3399CC',
        justifyContent: 'center',
    },
});