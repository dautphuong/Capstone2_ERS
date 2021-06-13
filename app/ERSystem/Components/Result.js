import React from "react";
import axios from 'axios';
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
import bgImage from '../image/logins.jpg';
import Learn from '../image/startlearn.jpg';
import logo from '../image/English_REVIEW.png';
import quiz from '../image/bgQuiz.png';
axios.defaults.timeout = 1000;
const { width: WIDTH } = Dimensions.get('window')
export default class Result extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ready: "Xem kết quả ...",
            start: false,
            index: 0,
            contentPractice: [],
            Chooses: [],

        };
    }

    async componentDidMount() {
        const { contentPractice } = this.state;
        const idExam = this.props.route.params.idExam;
        const idHistory = this.props.route.params.idHistory;
        console.log("id history:" + idHistory)
        try {
            axios.get(`/history/findById/${idHistory}`)
                .then(res => {
                    console.log(res.data[0].answer);
                    this.setState(
                        {
                            Chooses: res.data[0].answer
                        })

                })
            await axios.get(`/question/findAllByIdExam/${idExam}`)
                .then(res => {
                    let listIdQuestion = res.data
                    let arrQuestion = [];
                    for (let i = 0; i < listIdQuestion.length; i++) {
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
    render() {
        const { navigation } = this.props
        const { contentPractice, start, Chooses } = this.state;
        console.log(contentPractice)
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
                            return (
                                <View
                                    key={`${i}`}
                                    style={styles.paperQuestion}
                                >
                                    <Text style={styles.question}>
                                        Câu Hỏi {i + 1}: {v.title}
                                    </Text>
                                    {this.state.Chooses.map((value, index) => {
                                        if (v.id === value.question) {
                                            return (
                                                <View
                                                    key={index}
                                                >
                                                    <Text style={styles.answer}>Đáp án của bạn: {value.choose}</Text>
                                                </View>
                                            )
                                        }
                                    })
                                    }
                                    <Text style={styles.answer}>Đáp án đúng:{v.answerRight}</Text>
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
                            onPress={() => navigation.navigate('History')}
                        >
                            <Text style={styles.textSubmit}>Kết Thúc</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </ImageBackground >
            )
        }
    }
}

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

