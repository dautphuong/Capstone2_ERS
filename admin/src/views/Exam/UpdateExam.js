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
        createOnUTC: "",
        timeSet: "",
        title: "",
        type: "",
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
  componentDidMount() {
    if (this.state.idExam != '') {
      this.getAllQuestion();
      this.getExam(this.state.idExam);
      this.getInfoExam(this.state.idExam)
      console.log("IdExam:", this.state.idExam)
      console.log("IdExam:", this.state.type)
    }
  }
  updateExam() {
    console.log("hahahahahaah")
    let dataUpdate = {
      id: this.state.dataInfo.id,
      title:this.state.dataInfo.title,
      type: this.state.dataInfo.type,
      timeSet: this.state.dataInfo.timeSet,
      listQuestion: this.state.questionExam,
    }
  console.log(dataUpdate);
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
handleChangeInput(e) {
  this.setState({
    dataInfo: {
      ...this.state.dataInfo,
      [e.target.name]: e.target.value,
    },
  });
  console.log(this.state.dataInfo)
}

render() {
  // console.log("data:", this.state.questionExam)
  console.log("dataInfo:", this.state.dataInfo)
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
              ) : ('')}
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
              <Table className="table-hover table-striped">
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
        onClick={this.updateExam}
      >
        Update
            </Button>
      {/* //<Pagination defaultPage={1} count={3} style={{ padding: "10px 0" }} /> */}
    </Container>
  )
}
}

export default UpdateExam;