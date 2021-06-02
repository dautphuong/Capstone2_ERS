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
      addModalShow : false
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
    const report = this.state.dataNotification.find(x => x.id === id)
    console.log(report)
    if (
      window.confirm(
        "Do you want to delete report  " +
        this.state.dataQuestion.find((x) => x.id === report.idQuestion).title +
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
              onClick={()=>{
                this.setState({ addModalShow: true });
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
