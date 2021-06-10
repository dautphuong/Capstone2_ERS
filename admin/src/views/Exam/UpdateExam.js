import React from "react";
import {
  Badge,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Button from "@material-ui/core/Button";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Pagination from "@material-ui/lab/Pagination";
import API from "../../api";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
class UpdateExam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataQuestion: [],
      checked: false,
      arrQuestion: [],
      questionExam: [],
      idExam: sessionStorage.getItem("idExam"),
      type: sessionStorage.getItem("type"),
      dataInfo: {
        timeSet: "",
        title: "",
        type: "",
        id: ""
      } || {},
      dataInfoLesson: {
        content: "",
        idTopic: "",
        title: "",
        id: ""
      }
    }
  }
  getAllQuestion() {
    API.get(`question/findAll`)
      .then(res => {
        const dataQuestion = res.data;
        this.setState({ dataQuestion });
        console.log(this.state.dataQuestion)
      })
  }
  getExam(idExam) {
    API.get(`question/findQuestionByIdExam/${idExam}`)
      .then(res => {
        const questionExam = res.data;
        this.setState({ questionExam });
        console.log("Data:", questionExam)
      })
  }
  getInfoExam(idExam) {
    API.get(`exam/findById/${idExam}`)
      .then(res => {
        const dataInfoArr = res.data;
        this.setState({ dataInfo: dataInfoArr[0] });
        //  console.log("Data:", res.data)
      })
  }
  getInfoLesson(idLesson) {
    API.get(`lesson/findById/${idLesson}`)
      .then(res => {
        const dataInfoLessonArr = res.data;
        this.setState({ dataInfoLesson: dataInfoLessonArr[0] });
        this.getAllLessonByIdTopic(this.state.dataInfoLesson.idTopic)
        console.log("Data:", this.state.dataInfoLesson)
      })
  }
  componentDidMount() {
    if (this.state.type == 'exam' || this.state.type == 'practice') {
      this.getAllQuestion();
      this.getExam(this.state.idExam);
      this.getInfoExam(this.state.idExam)
      console.log("IdExam:", this.state.idExam)
      console.log("IdExam:", this.state.type)
    }
    else {
      console.log("hahahaahahahha:", this.state.idExam)
      this.getInfoLesson(this.state.idExam)
      console.log("idTopic:", this.state.dataInfoLesson)
      //this.getAllLessonByIdTopic(this.state.dataInfoLesson.idTopic)
      this.getQuestionLesson(this.state.idExam)
    }
  }
  getQuestionLesson(idLesson) {
    API.get(`question/findQuestionByIdLesson/${idLesson}`)
      .then(res => {
        const questionExam = res.data;
        this.setState({ questionExam });
        console.log("Data:", questionExam)
      })

  }
  getAllLessonByIdTopic(idTopic) {
    console.log(idTopic)
    API.get(`question/findByTopic/${idTopic}`).then((res) => {
      const dataQuestion = res.data;
      this.setState({ dataQuestion });
      console.log("dataQuestion:", this.state.dataQuestion);
    });
  }
  updateLesson = () => {
    var updateLessonData = {
      ...this.state.dataInfoLesson,
      listQuestion: this.state.questionExam
    }
    console.log("dataUpdate",updateLessonData);
    API.put(`lesson/update`, updateLessonData, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) => {
      if (res && res.status === 200) {
        alert("Successful")
        setTimeout(() => {
          window.location = "/admin/exam";
        }, 150)
      }
    });
  }
  updateExam = () => {
    console.log("hahahahahaah", this.state.dataInfo)
    let dataUpdate = {
      ...this.state.dataInfo,
      listQuestion: this.state.questionExam,
    }
    console.log(dataUpdate);
    API.put(`exam/update`, dataUpdate, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) => {
      if (res && res.status === 200) {
        alert("Successful")
        setTimeout(() => {
          window.location = "/admin/exam";
        }, 150)
      }
    });
  }
  handleChange = (e) => {
    this.setState({ checked: e.target.value })
    if (e.target.checked == true) {
      console.log("dskfhdskj")
      var newArr = this.state.questionExam;
      newArr.push(e.target.id);
      this.setState({ questionExam: newArr })
    }
    else {
      var index = this.state.questionExam.indexOf(e.target.id);
      if (index > -1) {
        this.state.questionExam.splice(index, 1);
      }
    }
    console.log(this.state.questionExam);
  }
  handleChangeInputLesson(e) {
    this.setState({
      dataInfo: {
        ...this.state.dataInfo,
        [e.target.name]: e.target.value,
      },
    });
  }
  handleChangeInput(e) {
    this.setState({
      dataInfoLesson: {
        ...this.state.dataInfoLesson,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.dataInfo)
  }

  render() {
    // console.log("data:", this.state.questionExam)
    console.log("Idexam:", this.state.idExam);
    console.log("type:", this.state.type);
    // console.log("dataInfo:", this.state.dataInfo)
    let ViewDataTable = this.state.dataQuestion.map((data, i) => {
      let ViewAnswerChooses = data.answerChooses.map((answer) => {
        return (<li style={{ "list-style-type": "none" }}>{answer}</li>)
      })
      return (
        <tr>
          <td> <FormControlLabel
            control={<Checkbox
              onClick={this.handleChange}
              name="checkedA" id={data.id}
              checked={this.state.questionExam.find(element => element === data.id) ? true : false}
            />}
          /></td>
          <td style={{ "width": "35%" }}>{data.title}</td>
          <td style={{ "width": "20%" }}>{ViewAnswerChooses}</td>
          <td style={{ "width": "10%" }}>{data.answerRight}</td>
          <td style={{ "width": "35%" }}>{data.note} </td>
        </tr>
      )
    })
    return (
      // <MUIDataTable
      //   title={"Employee List"}
      //   data={data}
      //   columns={columns}
      //   options={options}
      // />
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>

              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                {this.state.type === 'exam' || this.state.type === 'practice' ? (
                  <>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select "
                      name="type"
                      value={this.state.type}
                      fullWidth
                      onChange={(e) => this.handleChangeInput(e)}
                    >
                      {/* <MenuItem value='lesson'>Lesson</MenuItem> */}
                      <MenuItem value='practice'>Practice</MenuItem>
                      <MenuItem value='exam'>Exam</MenuItem>
                    </Select>

                    <TextField
                      id="standard-textarea"
                      name="title"
                      label="Title"
                      placeholder="Title"
                      value={this.state.dataInfo.title}
                      // style={{ marginTop: '15px', width: '80%' }}
                      onChange={(e) => this.handleChangeInput(e)}
                      fullWidth
                      multiline
                      on
                    />
                    <TextField
                      id="standard-textarea"
                      name="timeSet"
                      label="TimeSet"
                      placeholder="Title"
                      value={this.state.dataInfo.timeSet}
                      style={{ marginTop: '15px' }}
                      onChange={(e) => this.handleChangeInput(e)}
                      fullWidth
                      multiline
                      on
                    />
                  </>
                ) : (
                  <>
                    <TextField
                      id="standard-textarea"
                      name="title"
                      label="Type"
                      placeholder="Title"
                      value="Lesson"
                      style={{ marginTop: '15px' }}
                      disabled
                      onChange={(e) => this.handleChangeTitle(e)}
                      fullWidth
                      multiline
                      on
                    />
                    <TextField
                      id="standard-textarea"
                      name="title"
                      label="Title"
                      placeholder="Title"
                      value={this.state.dataInfoLesson.title}
                      style={{ marginTop: '15px' }}
                      onChange={(e) => this.handleChangeTitle(e)}
                      fullWidth
                      multiline
                      on
                    />
                    {/* <TextField
                      id="standard-textarea"
                      name="Topic"
                      label="Title"
                      placeholder="Title"
                      style={{ marginTop: '15px' }}
                      onChange={(e) => this.handleChangeTitle(e)}
                      fullWidth
                      multiline
                      on
                    /> */}
                  </>
                )}
                <Table className="table-hover table-striped"
                   style={{
                    height: "800px",
                    display: "block",
                    overflowY: "scroll",
                    width: "100%"
                  }}
                >
                  <thead>
                    <tr>
                      <th className="border-0"></th>
                      <th className="border-0">Question</th>
                      <th className="border-0" style={{ "width": "20%" }}>Answer</th>
                      <th className="border-0" style={{ "width": "10%" }}>Answer Right </th>
                      <th className="border-0" style={{ "width": "35%" }}>Explain</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ViewDataTable}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "45%" }}
          onClick={this.state.type === "lesson" ? this.updateLesson : this.updateExam}
        >
          Update
            </Button>
        {/* //<Pagination defaultPage={1} count={3} style={{ padding: "10px 0" }} /> */}
      </Container>
    )
  }
}

export default UpdateExam;