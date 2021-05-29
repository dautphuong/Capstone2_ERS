import React, { useReducer, useRef } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
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
class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUser: [],
      anchorEl: "",
    }
  }
  componentDidMount() {
    API.get(`user/findAllUser`)
      .then(res => {
        const dataUser = res.data;
        this.setState({ dataUser });
        console.log(this.state.dataUser)
      })
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
    return (
      <>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card className="strpied-tabled-with-hover">
                <Card.Header>
                  <Card.Title as="h4">Manager User Detail</Card.Title>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0">ID</th>
                        <th className="border-0"></th>
                        <th className="border-0">Email</th>
                        <th className="border-0">User</th>
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
