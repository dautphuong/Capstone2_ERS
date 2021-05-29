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
class CreateExam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataQuestion: [],
      checked: false,
      arrQuestion: [],
      title:'',
      type:'',
      timeSet:''
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
  componentDidMount() {
    this.getAllQuestion();
  }
  handleInput=(e) =>{
    this.setState({[e.target.name]: e.target.value})
  }
  buttonCreate = () => {
    let data = {
      type:this.state.type,
      title: this.state.title,
      listQuestion:this.state.arrQuestion,
      timeSet : this.state.timeSet
    };
    console.log("data",data)
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
    }, 150)
    });
  };
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
              <TextField
                        id="standard-textarea"
                        name="title"
                        label="Title"
                        placeholder="Title"
                        style={{ marginTop: '15px' }}
                        onChange={(e)=>this.handleInput(e)}
                        fullWidth
                        multiline
                        on
                    />
                      <TextField
                        id="standard-textarea"
                        name="type"
                        label="Type"
                        placeholder="Type"
                        style={{ marginTop: '15px' ,width: '80%' }}
                        onChange={(e)=>this.handleInput(e)}
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
                        onChange={(e)=>this.handleInput(e)}
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
              style={{ marginLeft: "26%" }}
              onClick={this.buttonCreate}
            >
              Create
            </Button>
      </Container>
    )
  }
}

export default CreateExam;