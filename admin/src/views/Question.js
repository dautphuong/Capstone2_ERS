import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import Grid from "@material-ui/core/Grid";
import API from "../api";
import ModalQuestion from "./Question/ModalQuestion";

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
import Pagination from "@material-ui/lab/Pagination";
import Button from "@material-ui/core/Button";
// react-bootstrap components

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataQuestion: [],
      addModalShow: false,
      addModalTypeQuestion: true,
      selectedFile: "",
      answerA: "",
      answerB: "",
      answerC: "",
      answerD: "",
      data: {
        answerRight: "",
        idTopic: "",
        note: "",
        title: "",
      },
    };
  }
  getAllQuestion() {
    API.get(`question/findAll`).then((res) => {
      const dataQuestion = res.data;
      this.setState({ dataQuestion });
    });
  }
  componentDidMount() {
    this.getAllQuestion();
  }
  DeleteQuestion(id) {
    const dataQuestion = [...this.state.dataQuestion];
    if (
      window.confirm(
        "Do you want to delete " +
          dataQuestion.find((x) => x.id === id).title +
          " ?"
      )
    ) {
      API.delete(`question/delete/${id}`).then((res) => {
        this.getAllQuestion();
      });
    }
  }
  createQuestion() {
    var answer = [];
    answer.push(
      this.state.answerA,
      this.state.answerB,
      this.state.answerC,
      this.state.answerD
    );
    var dataCreate = {
      ...this.state.data,
      answerChooses: answer,
      selectedFile: this.props.selectedFile,
    };
    API.post(`question/save`, dataCreate, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) => {
      if (res && res.status === 200) {
        this.setState({
          addModalShow: false,
          data: {
            answerRight: "",
            idTopic: "",
            note: "",
            title: "",
          },
          selectedFile: "",
          addModalTypeQuestion: true,
          answerA: "",
          answerB: "",
          answerC: "",
          answerD: "",
        });
        this.getAllQuestion();
      }
    });
  }
  updateQuestion() {
    var answer = [];
    answer.push(
      this.state.answerA,
      this.state.answerB,
      this.state.answerC,
      this.state.answerD
    );
    var dataUpdate = {
      ...this.state.data,
      answerChooses: answer,
      selectedFile: this.props.selectedFile,
    };
    API.put(`question/update`, dataUpdate, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) => {
      if (res && res.status === 200) {
        this.setState({
          addModalShow: false,
          data: {
            answerRight: "",
            idTopic: "",
            note: "",
            title: "",
          },
          selectedFile: "",
          addModalTypeQuestion: true,
          answerA: "",
          answerB: "",
          answerC: "",
          answerD: "",
        });
        this.getAllQuestion();
      }
    });
  }
  changeHandleFile = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };
  handleChangeInput(e) {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
      },
    });
  }
  render() {
    let addModalClose = () => this.setState({ addModalShow: false });
    let ViewDataTable = this.state.dataQuestion.map((data, i) => {
      let ViewAnswerChooses = data.answerChooses.map((answer) => {
        return <li style={{ "list-style-type": "none" }}>{answer}</li>;
      });
      return (
        <tr>
          <td style={{ width: "35%" }}>{data.title}</td>
          <td style={{ width: "20%" }}>{ViewAnswerChooses}</td>
          <td style={{ width: "10%" }}>{data.answerRight}</td>
          <td style={{ width: "35%" }}>{data.note} </td>
          <td>
            <i
              className="zmdi zmdi-edit"
              style={{ width: "10%", marginRight: "10px" }}
              onClick={() => {
                this.setState({ addModalShow: true });
                this.setState({ addModalTypeQuestion: false });
                this.setState({
                  data: {
                    ...this.state.data,
                    ...data,
                  },
                  answerA: data.answerChooses[0],
                  answerB: data.answerChooses[1],
                  answerC: data.answerChooses[2],
                  answerD: data.answerChooses[3],
                });
              }}
            />
            <i
              className="zmdi zmdi-delete"
              style={{ width: "10%", marginRight: "10px" }}
              onClick={this.DeleteQuestion.bind(this, data.id)}
            />
          </td>
        </tr>
      );
    });
    return (
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">List of question</Card.Title>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  style={{
                    float: "right",
                    height: "57px",
                    marginRight: "110px",
                  }}
                  onClick={() => {
                    this.setState({ addModalShow: true });
                    this.setState({ addModalTypeQuestion: true });
                    this.setState({
                      data: {
                        answerRight: "",
                        idTopic: "",
                        note: "",
                        title: "",
                      },
                      selectedFile: "",
                      answerA: "",
                      answerB: "",
                      answerC: "",
                      answerD: "",
                    });
                  }}
                >
                  Create question
                </Button>
                <ModalQuestion
                  show={this.state.addModalShow}
                  onHide={addModalClose}
                  data={this.state.data}
                  handleChangeInput={(e) => this.handleChangeInput(e)}
                  addModalTypeQuestion={this.state.addModalTypeQuestion}
                  createQuestion={() => this.createQuestion()}
                  updateQuestion={() => this.updateQuestion()}
                  changeHandleFile={(e) => this.changeHandleFile(e)}
                  answerA={this.state.answerA}
                  setStateAnswerA={(e) =>
                    this.setState({ answerA: e.target.value })
                  }
                  setStateAnswerB={(e) =>
                    this.setState({ answerB: e.target.value })
                  }
                  setStateAnswerC={(e) =>
                    this.setState({ answerC: e.target.value })
                  }
                  setStateAnswerD={(e) =>
                    this.setState({ answerD: e.target.value })
                  }
                  answerB={this.state.answerB}
                  answerC={this.state.answerC}
                  answerD={this.state.answerD}
                />
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                {/* <Grid>
                    <div style={{ height: 400, width: '100%' }}>
                      <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection style={{ height: "300px" }} />
                    </div>
                  </Grid> */}
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0" style={{ width: "35%" }}>
                        Question
                      </th>
                      <th className="border-0" style={{ width: "20%" }}>
                        Answer
                      </th>
                      <th className="border-0" style={{ width: "10%" }}>
                        Answer Right{" "}
                      </th>
                      <th className="border-0" style={{ width: "35%" }}>
                        Explain
                      </th>
                    </tr>
                  </thead>
                  <tbody>{ViewDataTable}</tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Pagination defaultPage={1} count={3} style={{ padding: "10px 0" }} />
      </Container>
    );
  }
}

export default Question;
