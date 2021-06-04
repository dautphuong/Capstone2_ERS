import React from "react";
import axios from 'axios';
import CountDown from 'react-native-countdown-component';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
    ImageBackground,
    TouchableOpacity,
    Image,
    Dimensions,

} from "react-native";
import DialogInput from "react-native-dialog-input";
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
            result: "Xem đáp án ...",
            start: false,
            startResult: false,
            isDialogVisible: false,
            index: 0,
            correct: 0,
            contentPractice: [],
            questionReport: '',
            content: '',
            Chooses: [],
        };
    }

    async componentDidMount() {
        const { contentPractice } = this.state;
        const { id } = this.props.route.params;
        console.log(this.props.route);
        try {
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
                    this.state.Chooses[listIdQuestion.length - 1] = undefined
                })
        } catch (error) {
            console.error(error);
        }
    }
    showDialog(isShow, question) {

        this.setState(
            {
                questionReport: question,
                isDialogVisible: isShow,

            });
        console.log(this.state.questionReport)
    }
    sendInput(text, question) {//??? truyền có cái à function 2 tham số
        console.log("text :" + text)
        console.log("question :" + question)
        const req = {
            "content": text,
            "idQuestion": question
        };
        console.log("req :" + req)
        axios.post('/report/save', req)
            .then(
                res => {
                    console.log(res)
                    this.setState({
                        isDialogVisible: false,
                        content: text

                    })
                }
            ).catch(error => {
                console.log(error)
            })

        console.log("Nội Dung Report: " + text);
    }
    choosesValue(number, value, idQuestion) {
        const arrChoose = this.state.Chooses;
        arrChoose[number] = { question: idQuestion, choose: value };
    }
    final() {
        const { navigation } = this.props
        if (this.state.correct >= 5) {
            return (
                Alert.alert(
                    'Số câu đúng của bạn: ' + this.state.correct,
                    'Chúc mừng bạn ❤❤❤',
                    [
                        {
                            text: 'Xem đáp án', onPress: () => {
                                this.setState(
                                    {
                                        startResult: false,
                                    }
                                )
                            }
                        },
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
                    'Số câu đúng của bạn: ' + this.state.correct,
                    'Chúc mừng bạn 💪💪💪',
                    [
                        {
                            text: 'Xem đáp án', onPress: () => {
                                this.setState(
                                    {
                                        startResult: true,
                                    }
                                )
                            }
                        },
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
        const { navigation } = this.props
        const { contentPractice, start, startResult, correct, content } = this.state;
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
        if (startResult) {
            return (
                <ImageBackground source={quiz} style={styles.container}>

                    <ScrollView>
                        {contentPractice.map((v, i) => {
                            return (
                                <View
                                    key={`${i}`}
                                    style={styles.paperQuestion}
                                >
                                    <Text style={styles.question}>
                                        Câu Hỏi {i + 1}: {v.title}

                                    </Text>
                                    {this.state.Chooses.map((value, index) => {
                                        if (i === index) {
                                            return (
                                                <Text
                                                    key={index}
                                                    style={styles.answer}>Đáp án bạn đã chọn: {value.choose}</Text>
                                            )
                                        }
                                    })
                                    }
                                    <Text style={styles.answer}>Đáp án: {v.answerRight}</Text>
                                    <Text style={styles.answer}>Giải thích:
                                     {"\n"}
                                        {v.note}
                                    </Text>
                                </View>
                            )

                        })
                        }
                        <TouchableOpacity
                            style={styles.btnFinish}
                            onPress={() => navigation.navigate('Home')}
                        >
                            <Text style={styles.textSubmit}>Kết Thúc</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </ImageBackground >
            )
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

                            let radio = v.answerChooses.map((answer) => {
                                return (
                                    <Text>{answer}</Text>
                                )
                            })
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
                                        message={"Vui lòng nhập báo cáo"}
                                        hintInput={"............."}
                                        submitInput={(inputText) => { this.sendInput(inputText, this.state.questionReport.id) }}//??? truyền có cái à function 2 tham số
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
                                            labelStyle={{ fontSize: 15, color: '#000066' }}
                                            animation={false}
                                            initial={-1}
                                            onPress={(value) => {
                                                this.choosesValue(i, value, v.id, v.answerRight);
                                            }}
                                        />
                                    </View>

                                </View>

                            )
                        })
                        }
                        <TouchableOpacity
                            style={styles.btnSubmit}
                            onPress={() => {
                                var result = this.state.correct;
                                var contentPractice = this.state.contentPractice;
                                const arrChoose = this.state.Chooses;
                                if (arrChoose.includes(undefined)) {
                                    return (
                                        Alert.alert('Error', 'Vui lòng làm hết các câu hỏi',
                                        )
                                    )
                                } else {
                                    for (let i = 0; i < contentPractice.length; i++) {
                                        if (arrChoose[i].choose === contentPractice[i].answerRight) {
                                            result++;
                                        }
                                    }
                                    this.setState({
                                        correct: result
                                    }, () => {
                                        console.log(this.state.correct);
                                        this.final()
                                    });


                                }
                            }}
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
        marginBottom: 16,
        marginRight: 30
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
        marginTop: 10
    },
    image: {
        width: 55,
        height: 55,
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: 'white',

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
        bottom: 150,
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
    btnFinish: {
        width: WIDTH - 40,
        height: 60,
        borderRadius: 25,
        backgroundColor: '#003399',
        justifyContent: 'center',
        marginHorizontal: 5,
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
    },
    answer: {
        color: "#ff0000",
        fontSize: 18
    }
});

