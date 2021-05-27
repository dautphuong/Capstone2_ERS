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
  createContest = () => {
    API.post(`contest/save`, this.state.data, {
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
    //console.log(data)
  };
  updateContest = () => {
    API.post(`contest/update`, this.state.data, {
      // Thay api update
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
    console.log(id);
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
       ... dataUpdate,
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
