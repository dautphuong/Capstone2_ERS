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
// import Select from "react-select/src/select";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
class CreateExam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataQuestion: [],
      checked: false,
      arrQuestion: [],
      dataLesson: [],
      title: '',
      type: '',
      timeSet: '',
      idLesson: '',
     // idLesson:''
    }
  }
  getAllQuestion() {
    console.log("Exam or practice")
    API.get(`question/findAll`)
      .then(res => {
        const dataQuestion = res.data;
        this.setState({ dataQuestion: dataQuestion });
        console.log("dataQuestion:",res.data)
      })
  }
  getAllLesson() {
    API.get(`lesson/findAll`).then((res) => {
      const dataLesson = res.data;
      this.setState({ dataLesson: dataLesson });
      console.log("Lesson:", this.state.dataLesson);
    });
  }
  getAllLessonByIdTopic(idTopic) {
    console.log(idTopic)
    API.get(`question/findByTopic/${idTopic}`).then((res) => {
      const dataQuestion = res.data;
      this.setState({ dataQuestion });
      console.log("dataQuestion:", this.state.dataQuestion);
    });
  }
  ViewData() {
    if (this.state.type === 'lesson') {
      this.setState({ dataQuestion: [], })
      this.getAllLesson();
      
      if (this.state.idLesson !== '') {
        console.log("idLesson:" , this.state.idLesson)
       // console.log("idTopic",this.state.dataLesson.find(x =>x.id === this.state.idLesson).idTopic)
       this.getAllLessonByIdTopic(this.state.dataLesson.find(x =>x.id === this.state.idLesson).idTopic)
      }
      //console.log("id Topic :", this.state.idLesson)
    }
    else {
      this.setState({ dataQuestion: [], idLesson: '' })
      this.getAllQuestion();
    }
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    setTimeout(() => {
      this.ViewData();
    }, 100)
  }
  handleChangeTitle=(e)=>{
    this.setState({title:e.target.value})
    console.log(this.state.title)
  }
  handleChangeTime=(e)=>{
    this.setState({timeSet:e.target.value})
    console.log(this.state.title)
  }
  createQuestionLesson() {
    let data = {
      listQuestion: this.state.arrQuestion,
      id: this.state.idLesson
    };
    console.log("data", data)
    API.put(`lesson/updateLQ`, data, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        alert(res.data);
        setTimeout(() => {
          window.location = "/admin/exam";
        }, 150)
      });
  }
  handleChangeType=(e)=>{

  }
  buttonCreate = () => {
    if (this.state.type === "lesson") {
      this.createQuestionLesson();
    }
    else{
      this.createQuestionExamAndPractice();
    }
  };
  createQuestionExamAndPractice() {
    let data = {
      type: this.state.type,
      title: this.state.title,
      listQuestion: this.state.arrQuestion,
      timeSet: this.state.timeSet
    };
    console.log("data", data)
    API.post(`exam/save`, data, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        alert(res.data);
        setTimeout(() => {
          window.location = "/admin/exam";
        }, 1000)
      });
  }
  handleChange = (e) => {
    this.setState({ checked: e.target.value })
    if (e.target.checked == true) {
      console.log("dskfhdskj")
      var newArr = this.state.arrQuestion;
      newArr.push(e.target.id);
      this.setState({ arrQuestion: newArr })
    }
    else {
      var index = this.state.arrQuestion.indexOf(e.target.id);
      if (index > -1) {
        this.state.arrQuestion.splice(index, 1);
      }
    }

    console.log(this.state.arrQuestion);
    // console.log(e.target.id)
    // console.log(e.target.checked)
    // console.log(this.state.checked)
  }

  render() {
    //console.log(this.state.idTopic)
    let ViewDataTable = this.state.dataQuestion.map((data, i) => {
      let ViewAnswerChooses = data.answerChooses.map((answer) => {
        return (<li style={{ "list-style-type": "none" }}>{answer}</li>)
      })
      return (
        <tr>
          <td> <FormControlLabel
            control={<Checkbox onClick={this.handleChange} name="checkedA" id={data.id} />}
          /></td>
          <td style={{ "width": "35%" }}>{data.title}</td>
          <td style={{ "width": "20%" }}>{ViewAnswerChooses}</td>
          <td style={{ "width": "10%" }}>{data.answerRight}</td>
          <td style={{ "width": "35%" }}>{data.note} </td>
        </tr>
      )
    })
    const viewLesson = this.state.dataLesson.map((data, i) => {
      return (
        <MenuItem value={data.id}>{data.title}</MenuItem>
      )
    })
    return (

      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <h4>Create Exam </h4>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select "
                  name="type"
                  //value={this.props.data.idTopic}
                  fullWidth
                  onChange={(e) => this.handleInput(e)}
                >
                  <MenuItem value='lesson'>Lesson</MenuItem>
                  <MenuItem value='practice'>Practice</MenuItem>
                  <MenuItem value='exam'>Exam</MenuItem>
                </Select>
                {this.state.type === 'lesson' ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select "
                    name="idLesson"
                    //value={this.props.data.idTopic}
                    fullWidth
                    onChange={(e) => this.handleInput(e)}
                  >
                    {viewLesson}
                  </Select>
                ) : (''
                )}
                {/* <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select "
                  name="idTopic"
                  //value={this.props.data.idTopic}
                  fullWidth
                  onChange={(e) => this.handleInput(e)}
                >
                  {viewTopic} */}
                {/* <MenuItem value='lesson'>Lesson</MenuItem>
                  <MenuItem value='practice'>Practice</MenuItem>
                  <MenuItem value='exam'>Exam</MenuItem> */}
                {/* </Select> */}
                {(this.state.type === 'practice' || this.state.type === 'exam') ? (
                  <>
                    <TextField
                      id="standard-textarea"
                      name="title"
                      label="Title"
                      placeholder="Title"
                      style={{ marginTop: '15px' }}
                      onChange={(e) => this.handleChangeTitle(e)}
                      fullWidth
                      multiline
                      on
                    />
                    <TextField
                      id="standard-textarea"
                      name="timeSet"
                      label="TimeSet"
                      placeholder="TimeSet"
                      style={{ marginTop: '15px' }}
                      onChange={(e) => this.handleChangeTime(e)}
                      fullWidth
                      multiline
                      on
                    />
                  </>
                ) : (
                  ''
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
          onClick={this.buttonCreate}
        >
          Create
            </Button>
      </Container>
    )
  }
}

export default CreateExam;