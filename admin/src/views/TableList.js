import React, { useReducer, useRef } from "react";

// react-bootstrap components
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
import API from '../api';
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import ModalContest from "./User/CreateUser";
class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUser: [],
      anchorEl: "",
      addModalShow: false,
      userName: '',
      rePassword: '',
      email: '',
      password: '',
      role: ''
    }
  }
  getAllUser() {
    API.get(`user/findAllUser`)
      .then(res => {
        const dataUser = res.data;
        this.setState({ dataUser });
        console.log(this.state.dataUser)
      })
  }
  componentDidMount() {
    this.getAllUser();
  }
  CreateUser(e) {
    if (this.state.password === this.state.rePassword) {
      const data = {
        username: this.state.userName,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role
      }
      console.log(data)
      API.post(`user/save`, data, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((res) => {
        console.log("data",res.data)
        if (res && res.status === 200) {
          console.log(res.data)
          console.log("status:", res.status)
          this.setState({ addModalShow: false });
          this.getAllUser();
        }
        if(res.data==="Account already exists"){
            alert("Account already exist")
        }
      });
      // console.log(data)
    }
  }
  handleChangeInput(e) {
    this.setState({ [e.target.name]: e.target.value })
    console.log(e.target.value)
  }
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  }
  DeleteUser(id) {
    console.log(id);
    const dataUser = [...this.state.dataUser]
    if (window.confirm('Do you want to delete ' + dataUser.find(x => x.id === id).username + ' ?')) {
      API.delete(`user/delete/${id}`)
        .then(res => {
          console.log(res.data)
          this.componentDidMount();
        })
    }
  }
  render() {
    let options = [
      { name: "Edit", icon: "zmdi-edit" },
      { name: "Delete", icon: "zmdi-delete" },
    ];
    let ViewUser = this.state.dataUser.map((user, i) => {
      return (
        <tr>
          <td>{i + 1}</td>
          <td><img src={user.avatar} style={{ width: '70px', height: '40px' }}></img></td>
          <td>{user.email}</td>
          <td>{user.username}</td>
          <td>{user.createOnUTC}</td>
          <td>{user.lastLogin}</td>
          <td>
            <i
              className="zmdi zmdi-delete" onClick={this.DeleteUser.bind(this, user.id)}
              style={{ width: "10%", marginRight: "10px" }}
            />
            {/* <IconButton onClick={this.handleClick}>
              <i className="zmdi zmdi-menu" />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={this.state.anchorEl}
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
              {console.log(user.id)}
              {options.map((option, index) => (
                <MenuItem
                  key={index}
                  //onClick={this.handleClose}
                  onClick={() => {console.log(user.id)
                    // switch (option.name) {
                    //   case "Edit": break;

                    //   case "Delete":
                    //     {this.DeleteLesson(user.id) };
                    // }
                  }}
                >
                  <i
                    className={`zmdi ${option.icon}`}
                    style={{ width: "10%", marginRight: "10px" }}
                  />

                </MenuItem>
              ))}
            </Menu> */}
          </td>
        </tr>
      )
    })
    let addModalClose = () => this.setState({ addModalShow: false });
    return (
      <>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card className="strpied-tabled-with-hover">
                <Card.Header>
                  <Card.Title as="h4">Manager User Detail</Card.Title>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    style={{
                      //width:"150px",
                      float: "right",
                      height: "57px",
                      marginRight: "110px",
                    }}

                    onClick={() => {
                      this.setState({ addModalShow: true });
                      // this.setState({ addModalTypeQuestion: true });
                      //   this.setState({
                      //     data: {
                      //       answerRight: "",
                      //       idTopic: "",
                      //       note: "",
                      //       title: "",
                      //     },
                      //     selectedFile: "",
                      //     answerA: "",
                      //     answerB: "",
                      //     answerC: "",
                      //     answerD: "",
                      //   });
                    }}
                  >
                    Create User
                </Button>
                  <ModalContest
                    show={this.state.addModalShow}
                    onHide={addModalClose}
                    handleChangeInput={(e) => this.handleChangeInput(e)}
                    CreateUser={() => this.CreateUser()}
                  >

                  </ModalContest>
                </Card.Header>

                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0">ID</th>
                        <th className="border-0"></th>
                        <th className="border-0">Email</th>
                        <th className="border-0">User</th>
                        <th className="border-0">CreateOnUTC</th>
                        <th className="border-0">Last Login </th>
                        <th className="border-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {ViewUser}
                    </tbody>
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


export default TableList;
