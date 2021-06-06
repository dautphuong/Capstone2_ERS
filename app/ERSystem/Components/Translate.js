import React, { Component } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    ImageBackground
} from 'react-native';
import axios from 'axios';
import bgImage from '../image/logins.jpg';
export default class Translator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languageCode: "vi",
            inputText: "",
            outputText: ""
        };
    }
    changeLanguage() {
        const inputText = this.state.inputText
        const req = {
            "content": inputText
        }
        axios.post('/translate', req)
            .then(
                res => {
                    // console.log(res.data)
                    this.setState({
                        outputText: res.data
                    })
                    console.log(this.state.outputText)
                },
            ).catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <ImageBackground source={bgImage} style={{ width: "100%", height: "100%" }}>
                <View style={styles.container}>
                    <Text style={styles.Titles}>Dịch Anh Việt</Text>
                    <View style={styles.input}>
                        <TextInput
                            style={{ flex: 1, height: 80 }}
                            placeholder="Nhập từ tiếng anh muốn dịch"
                            underlineColorAndroid='transparent'
                            onChangeText={inputText => this.setState({ inputText })}
                            value={this.state.inputText}
                        />
                    </View>
                    <View style={styles.output}>
                        <Text>{this.state.outputText}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={() => { this.changeLanguage() }}
                    >
                        <Text style={styles.submitButtonText}>Tra từ</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 53
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: .5,
        borderColor: '#000',
        // height: 40,
        borderRadius: 5,
        margin: 10
    },
    output: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: .5,
        borderColor: '#000',
        borderRadius: 5,
        margin: 10,
        height: 80,
    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        alignItems: 'center'
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        borderRadius: 5,
        height: 40,
    },
    submitButtonText: {
        fontWeight: 'bold',
        color: 'white',
        justifyContent: 'center',
        textAlign: 'center'
    },
    Titles: {
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center'
    },
})