import { extend } from "chartist";
import React from "react";
import API from "../api";
// react-bootstrap components
import {
  Badge,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import Button from "@material-ui/core/Button";
import ModalContest from "./Contest/ModalContest";
import moment from 'moment';
class Icons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataContest: [],
      addModalShow: false,
      addModalTypeLesson: true,
      data: {
        idExam: "",
        timeEnd: "",
        timeStart: "",
        title: "",
      },
    };
  }
  getAllContest() {

    API.get(`contest/findAll`).then((res) => {
      const dataContest = res.data;
      this.setState({ dataContest });
      console.log(this.state.dataContest);
    });
  }
  componentDidMount() {
    this.getAllContest();
  }
  validate() {
    if (!this.state.data.timeStart) {
      alert("Time start  not exist")
      return false;
    }
    if (!this.state.data.timeEnd) {
      alert("Time start  not exist")
      return false;
    }
    if (!this.state.data.title) {
      alert("Title is empty")
      return false;
    }
    if (!this.state.data.idExam) {
      alert("Exam is empty")
      return false;
    }
    if (moment(this.state.data.timeStart).isAfter(this.state.data.timeEnd)) {
      alert("Time contest incorrect ")
      return false;
    }
    if (!moment(this.state.data.timeEnd).isAfter(Date().toLocaleString())) {
      alert("Time end  incorrect ")
      return false;
    }
    if (!moment(this.state.data.timeStart).isAfter(Date().toLocaleString())) {
      alert("Time start  incorrect ")
      return false;
    }
    return true;
  }
  createContest = () => {
    //console.log(moment(this.state.data.timeStart).format("YYYY-MM-DDTHH:mm:ss.SSSSZ"));
    const validate = this.validate();
    if (validate) {
      var dataCreate = {
        title: this.state.data.title,
        timeStart: moment(this.state.data.timeStart).format("YYYY-MM-DD HH:mm:ss"),
        timeEnd: moment(this.state.data.timeEnd).format("YYYY-MM-DD HH:mm:ss"),
        idExam: this.state.data.idExam,
      };
      API.post(`contest/save`, dataCreate, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((res) => {
        if (res && res.status === 200) {
          this.setState({ addModalShow: false });
          this.getAllContest();
        }
      });
    }
    //console.log(data)
  };
  updateContest = () => {
    var dataUpdate = {
      id: this.state.data.id,
      title: this.state.data.title,
      timeStart: moment(this.state.data.timeStart).format("YYYY-MM-DD HH:mm:ss"),
      timeEnd: moment(this.state.data.timeEnd).format("YYYY-MM-DD HH:mm:ss"),
      idExam: this.state.data.idExam,
    };
    API.put(`contest/update`, dataUpdate, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) => {
      if (res && res.status === 200) {
        this.setState({ addModalShow: false });
        this.getAllContest();
      }
    });
  };
  DeleteContest(id) {
    const dataContest = [...this.state.dataContest];
    if (
      window.confirm(
        "Do you want to delete " +
        dataContest.find((x) => x.id === id).title +
        " ?"
      )
    ) {
      API.delete(`contest/delete/${id}`).then((res) => {
        console.log(res.data);
        this.componentDidMount();
      });
    }
  }
  getUpdate(dataUpdate) {
    this.setState({ addModalTypeLesson: false });
    this.setState({ addModalShow: true });
    this.setState({
      data: {
        ...this.state.data,
        ...dataUpdate,
      },
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

    const ViewDataTable = this.state.dataContest.map((data, i) => {
      return (
        <tr>
          <td>{data.title}</td>
          <td>{data.timeStart}</td>
          <td>{data.timeEnd}</td>
          <td>
            <i
              className="zmdi zmdi-edit"
              style={{ width: "10%", marginRight: "10px" }}
              onClick={this.getUpdate.bind(this, data)}
            />
            <i
              className="zmdi zmdi-delete"
              style={{ width: "10%", marginRight: "10px" }}
              onClick={this.DeleteContest.bind(this, data.id)}
            />
          </td>
        </tr>
      );
    });
    return (
      <>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Number of contest</Card.Title>
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
                      this.setState({
                        data: {
                          idExam: "",
                          timeEnd: "",
                          timeStart: "",
                          title: "",
                          id: "",
                        },
                      });
                      this.setState({ addModalShow: true });
                      this.setState({ addModalTypeLesson: true });
                    }}
                  >
                    Create Contest
                  </Button>
                  <ModalContest
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                    data={this.state.data}
                    handleChangeInput={(e) => this.handleChangeInput(e)}
                    addModalTypeLesson={this.state.addModalTypeLesson}
                    createContest={() => this.createContest()}
                    updateContest={() => this.updateContest()}
                  />
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0">Name</th>
                        <th className="border-0">Time Start</th>
                        <th className="border-0">Time End</th>
                        <th className="border-0"></th>
                      </tr>
                    </thead>
                    <tbody>{ViewDataTable}</tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Icons;
