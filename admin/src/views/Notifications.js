import React from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// react-bootstrap components
import {
  Alert,
  Badge,
  Button,
  Card,
  Modal,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Table
} from "react-bootstrap";
import API from '../api';
import UpdateReport from './Notification/UpdateReport'
class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataNotification: [],
      dataQuestion: [],
      addModalShow: false,
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
  getAllNotifications() {
    API.get(`report/findReportQuestion`)
      .then(res => {
        const dataNotification = res.data;
        this.setState({ dataNotification });
        console.log("Notification:", dataNotification)
      })
  }
  componentDidMount() {
    console.log("data:")
    this.getAllNotifications();
  }
  DeleteNotification(id) {
    console.log(id);
    const report = this.state.dataNotification.find(x => x.id === id)
    console.log(report)
    if (
      window.confirm(
        "Do you want to delete report  " +
        this.state.dataNotification.find((x) => x.id === id).question.title +
        " ?"
      )
    ) {
      //alert("Successful")
      API.delete(`report/delete/${id}`)
        .then((res) => {
          this.getAllNotifications();
        })
        .then(() => this.getAllNotifications());
    }
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
    console.log(dataUpdate)
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
        this.getAllNotifications();
      }
    });
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
    let addModalClose = () => this.setState({ addModalShow: false });
    let viewNotification = this.state.dataNotification.map((data, i) => {
      let ViewAnswerChooses = data.question.answerChooses.map((answer) => {
        return <li style={{ "list-style-type": "none" }}>{answer}</li>;
      });

      return (
        <tr>
          <td style={{ width: "35%" }}>{data.question.title}</td>
          <td style={{ width: "20%" }}>{ViewAnswerChooses}</td>
          <td style={{ width: "10%" }}>{data.question.answerRight}</td>
          <td>{data.question.note}</td>
          {/* <td style={{ width: "35%" }}>{data.note} </td> */}
          <td>{data.content}</td>
          <td>
            <i
              className="zmdi zmdi-edit"
              style={{ width: "10%", marginRight: "10px" }}
              onClick={() => {
                this.setState({ addModalShow: true });
                this.setState({
                  data: {
                    ...this.state.data,
                    ...data.question,
                  },
                  answerA: data.question.answerChooses[0],
                  answerB: data.question.answerChooses[1],
                  answerC: data.question.answerChooses[2],
                  answerD: data.question.answerChooses[3],
                });
              }}
            />
            <i
              className="zmdi zmdi-delete"
              style={{ width: "10%", marginRight: "10px" }}
              onClick={this.DeleteNotification.bind(this, data.id)}
            />
          </td>
        </tr>
      )
    })
    return (
      <>
        <Container fluid>
          <Card>
            <Card.Header>
              <Card.Title as="h4">Report Manager</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0" >
                      Question
                      </th>
                    <th className="border-0">
                      Answer
                      </th>
                    <th className="border-0">
                      Answer Right{" "}
                    </th>
                    <th className="border-0" >
                      Explain
                      </th>
                    <th className="border-0">
                      Content Report
                      </th>
                  </tr>
                </thead>
                {viewNotification}
                <UpdateReport
                  show={this.state.addModalShow}
                  onHide={addModalClose}
                  data={this.state.data}
                  answerA={this.state.answerA}
                  handleChangeInput={(e) => this.handleChangeInput(e)}
                  updateQuestion={() => this.updateQuestion()}
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
              </Table>
            </Card.Body>
          </Card>
        </Container>
      </>

    );
  }
}

export default Notifications;
