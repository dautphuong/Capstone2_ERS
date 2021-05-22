import React from "react";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text,
    Button,
    StyleSheet,
    ScrollView,
    Alert,
    ImageBackground,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import DialogInput from "react-native-dialog-input";
import Modal from "react-native-modal"
import Ionicons from 'react-native-vector-icons/Ionicons';
import RadioForm from 'react-native-simple-radio-button';
import bgImage from '../image/logins.jpg';
import Learn from '../image/startlearn.jpg';
import logo from '../image/English_REVIEW.png';
import quiz from '../image/bgQuiz.png';
axios.defaults.timeout = 1000;
const { width: WIDTH } = Dimensions.get('window')
class StartQuiz extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ready: "Bắt Đầu ...",
            start: false,
            isDialogVisible: false,
            index: 0,
            correct: 0,
            contentPractice: [{
                answerChooses: []
            }],
            questionReport: '',
            content: ''
        };
    }
    showDialog(isShow, question) {

        this.setState(
            {
                questionReport: question,
                isDialogVisible: isShow,

            });

    }
    sendInput(inputText) {
        this.setState({ isDialogVisible: false });
        console.log("sendInput (DialogInput#1): " + inputText);
    }
    async componentDidMount() {
        const { contentPractice } = this.state;
        const { id } = this.props.route.params;
        console.log(this.props.route);
        try {
            console.log(AsyncStorage.getItem("id"));
            await axios.get(`/question/findAllByIdExam/${id}`)
                .then(res => {
                    let listIdQuestion = res.data
                    let arrQuestion = [];
                    for (let i = 0; i < listIdQuestion.length; i++) {
                        // axios.get(`/question/findById/` + listIdQuestion[i].idQuestion.trim())
                        axios({
                            method: "get",
                            url: `/question/findById/` + listIdQuestion[i].idQuestion.trim(),
                        })
                            .then(res => {
                                arrQuestion = arrQuestion.concat(res.data);
                                this.setState(
                                    {
                                        contentPractice: arrQuestion
                                    }
                                )
                            })
                    }
                })
        } catch (error) {
            console.error(error);
        }
    }

    final() {
        const { navigation } = this.props
        if (this.state.correct >= 5) {
            return (
                Alert.alert(
                    'Your Score is ' + this.state.correct + '\n Congratulations ❤❤❤',
                    'You Want to Play Again',
                    [
                        {
                            text: 'Yes', onPress: () => {
                                this.setState(
                                    {
                                        start: false,
                                        correct: 0
                                    }
                                )
                                navigation.navigate('Quiz')
                            }
                        },

                        { text: 'No', onPress: () => this.setState({ start: true }) },
                        {
                            text: 'Kết Thúc', onPress: () => {
                                this.setState({ start: true })
                                navigation.navigate('Home')
                            }
                        },

                    ],
                    { cancelable: false }
                )
            )
        } else {
            return (
                Alert.alert(
                    'Your Score is ' + this.state.correct + '\n Come on 💪💪💪',
                    'You Want to Play Again',
                    [
                        {
                            text: 'Yes', onPress: () => {
                                this.setState(
                                    {
                                        start: false,
                                        correct: 0
                                    }
                                )
                                navigation.navigate('Quiz')
                            }
                        },

                        { text: 'No', onPress: () => this.setState({ start: true }) },
                        {
                            text: 'Kết Thúc', onPress: () => {
                                this.setState({ start: true })
                                navigation.navigate('Home')
                            }
                        },

                    ],
                    { cancelable: false }
                )
            )
        }
    }
    render() {
        const { contentPractice, start, correct } = this.state;
        if (!start) {
            return (
                <ImageBackground source={bgImage} style={{ flex: 1, flexDirection: "column", justifyContent: 'center', }}>
                    <View style={styles.containerLogo}>
                        <Image source={logo} style={styles.logo}></Image>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity
                            style={styles.content}
                            onPress={() => this.setState({ start: true })}>
                            <Image
                                source={Learn}
                                style={styles.image}
                            />
                            <Text style={styles.Text}>
                                {this.state.ready}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            );
        }
        else {
            return (

                <ImageBackground source={quiz} style={styles.container}>
                    <ScrollView>
                        {contentPractice.map((v, i) => {
                            var radio_props = [
                                { label: v.answerChooses[0], value: v.answerChooses[0] },
                                { label: v.answerChooses[1], value: v.answerChooses[1] },
                                { label: v.answerChooses[2], value: v.answerChooses[2] },
                                { label: v.answerChooses[3], value: v.answerChooses[3] },
                            ];
                            return (
                                <View
                                    key={`${i}`}
                                    style={styles.paperQuestion}
                                >
                                    <Text style={styles.question}>
                                        Câu Hỏi {i + 1}: {v.title}
                                    </Text>

                                    <DialogInput
                                        isDialogVisible={this.state.isDialogVisible}
                                        title={this.state.questionReport.title}
                                        message={"Message for DialogInput #1"}
                                        hintInput={"HINT INPUT"}
                                        submitInput={(inputText) => { this.sendInput(inputText) }}
                                        closeDialog={() => { this.showDialog(false, this.state.questionReport) }}
                                        modalStyle={{ backgroundColor: '#78C8E8' }}
                                    >
                                    </DialogInput>
                                    <TouchableOpacity
                                        onPress={() => { this.showDialog(true, v) }} >
                                        <Ionicons
                                            style={styles.report}
                                            name={'warning-outline'}
                                        />
                                    </TouchableOpacity>
                                    <View style={styles.valueText}>
                                        <RadioForm
                                            style={{ fontWeight: 'bold' }}
                                            radio_props={radio_props}
                                            formHorizontal={false}
                                            labelHorizontal={true}
                                            buttonColor={'#000066'}
                                            labelStyle={{ fontSize: 18, color: '#000066' }}
                                            animation={false}
                                            initial={-1}
                                            onPress={(value) => {
                                                var result = this.state.correct;
                                                if (value === v.answerRight) result++;
                                                console.log("result :" + result)
                                                this.setState(
                                                    { correct: result }
                                                )
                                            }}
                                        />
                                    </View>

                                </View>

                            )
                        })
                        }
                        <TouchableOpacity
                            style={styles.btnSubmit}
                            onPress={() => this.final()}
                        >
                            <Text style={styles.textSubmit}>Nộp bài</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </ImageBackground >
            )



        }

    }
}

export default StartQuiz;
const styles = StyleSheet.create({
    paperQuestion: {
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
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        width: "100%",
        borderRadius: 20,
        backgroundColor: 'green',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    image: {
        width: 55,
        height: 55,
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: 'white'
    },
    Text: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingLeft: 15,
    },
    box: {
        padding: 20,
        backgroundColor: "#F5FBEF",
        borderRadius: 40,
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: 30,
        bottom: 150
    },
    containerLogo: {
        bottom: 200,
        alignItems: 'center',
    },
    logo: {
        width: 300,
        height: 300,
    },
    question: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight: 'bold',
        color: "#000066"
    },
    btnSubmit: {
        width: WIDTH - 40,
        height: 60,
        borderRadius: 25,
        backgroundColor: '#003399',
        justifyContent: 'center',
        marginHorizontal: 20,
        bottom: 10
    },
    textSubmit: {
        textAlign: 'center',
        fontSize: 20,
        color: '#F8F8FF'
    },
    report: {
        fontSize: 50,
        color: 'red'
    }
});

