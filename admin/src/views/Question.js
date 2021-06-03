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
import { storage } from "../util/firebase_connect";
import ImportFile from './Question/ImportFile'
class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataQuestion: [],
      addModalShow: false,
      addModalTypeQuestion: true,
      addModalFile: false,
      idTopicFile: "",
      file: '',
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
  //  onFileChange = async (e) => {
  //   const file = e.target.files[0];
  //   const storageRef = app.storage().ref();
  //   const fileRef = storageRef.child(file.name);
  //   await fileRef.put(file);
  //  console.log(await fileRef.getDownloadURL());
  // };
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
  validate() {
    if (!this.state.data.answerRight) {
      alert("answer right is empty")
      return false;
    }
    if (!this.state.data.idTopic) {
      alert("Topic is empty")
      return false;
    }
    if (!this.state.data.note) {
      alert("Note is empty")
      return false;
    }
    if (!this.state.data.title) {
      alert("Title is empty")
      return false;
    }
    if (this.state.answerB === '') {
      alert("answer B is empty")
      return false;
    }
    if (this.state.answerC === '') {
      alert("answer C is empty")
      return false;
    }
    if (this.state.answerD === '') {
      alert("answer D is empty")
      return false;
    }
    if (this.state.answerA === '') {
      alert("answer A is empty")
      return false;
    }
    return true
  }
  createQuestion() {
    // if (this.state.file !== '') {
    //   this.uploadFile();
    //   this.setState({
    //     addModalShow: false,
    //     data: {
    //       answerRight: "",
    //       idTopic: "",
    //       note: "",
    //       title: "",
    //     },
    //     selectedFile: "",
    //     addModalTypeQuestion: true,
    //     answerA: "",
    //     answerB: "",
    //     answerC: "",
    //     answerD: "",
    //   });
    //   this.getAllQuestion();
    // }
    // else {
      const validate = this.validate();
      if (validate) {
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
    //}
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
  uploadFile() {
    if (this.state.file !== '') {
      const uploadTask = storage.ref(`images/${this.state.file.name}`).put(this.state.file);
      uploadTask.on(
        "state_changed",
        snapshot => {
        },
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(this.state.file.name)
            .getDownloadURL()
            .then(url => {
              this.updateUrlBE(url);
            });
        }
      )
    }
  }
  updateUrlBE(urlFile) {
    const data = {
      url: urlFile,
      idTopic:this.state.idTopicFile
    }
    console.log(data)
    API.post(`question/getFile`, data, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) => {
      if (res && res.status === 200) {
        alert("Upload file is successful")
      }
    })
  }
  changeHandleFile(e) {
    this.setState({ file: e.target.files[0] })
    const file = e.target.files[0];
    console.log("File:", this.state.file)
  };
  changeTopicFile(e) {
    this.setState({ idTopicFile: e.target.value })
    console.log(this.state.idTopicFile)
  }
  handleChangeInput(e) {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
      },
    });
  }
  render() {
    console.log(this.state.dataQuestion)
    let addModalClose = () => this.setState({ addModalShow: false });
    let addModalFileClose = () => this.setState({ addModalFile: false })
    let ViewDataTable = this.state.dataQuestion.map((data, i) => {
      let ViewAnswerChooses = data.answerChooses.map((answer) => {
        return <li style={{ "list-style-type": "none" }}>{answer}</li>;
      });
      //console.log(data.answerChooses)
      return (
        <tr>
          <td style={{ width: "35%" }}>{data.title}</td>
          <td style={{ width: "20%" }}>{ViewAnswerChooses}</td>
          <td style={{ width: "10%" }}>{data.answerRight}</td>
          <td>{data.nameTopic}</td>
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
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  style={{
                    float: "right",
                    height: "57px",
                    marginRight: "110px",
                    //marginTop: '35px'
                  }}
                  onClick={() => this.setState({ addModalFile: true })}
                >
                  Import File
                    </Button>
                <ImportFile
                  show={this.state.addModalFile}
                  onHide={addModalFileClose}
                  changeHandleFile={(e) => this.changeHandleFile(e)}
                  changeTopicFile = {(e) => this.changeTopicFile(e)}
                  uploadFile = {()=>this.uploadFile()}
                />

              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                {/* <Grid>
                    <div style={{ height: 400, width: '100%' }}>
                      <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection style={{ height: "300px" }} />
                    </div>
                  </Grid> */}
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
                      <th className="border-0" style={{ width: "35%" }}>
                        Question
                      </th>
                      <th className="border-0" style={{ width: "20%" }}>
                        Answer
                      </th>
                      <th className="border-0" style={{ width: "10%" }}>
                        Answer Right{" "}
                      </th>
                      <th className="border-0" style={{ width: "10%" }}>
                        Topic
                      </th>
                      <th className="border-0" style={{ width: "35%" }}>
                        Explain
                      </th>
                    </tr>
                  </thead>
                  <tbody
                  >
                    {ViewDataTable}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* <Pagination defaultPage={1} count={3} style={{ padding: "10px 0" }} /> */}
      </Container >
    );
  }
}

export default Question;
