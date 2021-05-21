import React from "react";
import Style from '../assets/css/lesson.css'
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
import Select from 'react-select';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { data, event } from "jquery";
import { Button, ButtonToolbar } from 'react-bootstrap'
import PopupLesson from './PopupLesson';
import CreateTypeLesson from './CreateTypeLesson'
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IntlMessages from "../util/IntlMessages";
import Pagination from "@material-ui/lab/Pagination";
import API from '../api';
class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: "",
      contentCKEditor: "",
      addModalShow: false,
      addModalTypeLesson: false,
      menuState: false,
      anchorEl: "",
      data: []
    }
    //this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handCkeditorState = this.handCkeditorState.bind(this);
  }
  componentDidMount() {
    API.get(`lesson/findAll`)
    .then(res => {
      const data = res.data;
      this.setState({ data });
      console.log(this.state.data);
    })
  }
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  }
  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value })
  }
  handCkeditorState = (event, editor) => {
    const data = editor.getData();
    this.setState({ contentCKEditor: data })
    console.log(this.state.contentCKEditor)
  }
  DeleteLesson = (index) => {
    const dataLesson = [...this.state.data]
    if (window.confirm('Do you want to delete ' + dataLesson[index].Name + ' ?')) {
      dataLesson.splice(index, 1);
      this.setState({ data: dataLesson });
    }
  }
  onContactOptionSelect = (event) => {
    console.log("Select menu")
    // setMenuState(true);
    // setAnchorEl(event.currentTarget);
    this.setState({ menuState: true })
  };
  handleRequestClose = () => {
    this.setState({ menuState: false })
  };
  render() {
    //alert(this.state.selectValue)
    const onContactOptionSelect = (event) => {
      // setMenuState(true);
      // setAnchorEl(event.currentTarget);
      this.setState({ menuState: true, anchorEl: event.currentTarget })
    };
    let options = [
      { name: "Edit", icon: "zmdi-edit" },
      { name: "Delete", icon: "zmdi-delete" },
    ];

    console.log(this.state.selectValue)
    let addModalClose = () => this.setState({ addModalShow: false })
    let addModalTypeLessonClose = () => this.setState({ addModalTypeLesson: false })
    const editorConfiguration = {
      toolbar: ['bold', 'italic']
    };

    let ViewDataTable = this.state.data.map((data, i) => {
      return (
        <tr>
          <td>{data.title}</td>
          <td>{data.idTopic}</td>
          <td>{data.createOnUTC}</td>
          <td>
            <IconButton onClick={this.handleClick}>
              <i className="zmdi zmdi-menu" />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={this.state.anchorEl}
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
              style={{
              }}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={index}
                  onClick={this.handleClose}
                // onClick={() => {
                //   switch (option.name) {
                //     case "Edit":
                //       history.push(
                //         "/bookingOrderAdmin/app/settings/edit-template"
                //       );
                //     case "Delete":
                //       break;
                //   }
                // }}
                >
                  <i
                    className={`zmdi ${option.icon}`}
                    style={{ width: "10%", marginRight: "10px" }}
                  />
                  {/* <IntlMessages id={option.name} /> */}
                </MenuItem>
              ))}
            </Menu>
          </td>
        </tr>
      )
    })

    return (
      <>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card>
                <Card.Header>
                  <Card.Title as="h4" style={{ width: '35%', float: 'left' }}>Light Bootstrap Table Heading</Card.Title>
                  <a onClick={() => this.setState({ addModalTypeLesson: true })}>List of  Topic</a>
                  {/* <CreateTypeLesson
                  show = {this.state.addModalTypeLesson}
                  onHide={addModalTypeLessonClose}
                  /> */}
                  <ButtonToolbar style={{ paddingLeft: '29%' }}>
                    <Button
                      variant="primary"
                      onClick={() => this.setState({ addModalShow: true })}

                    >
                      Create Lesson
                    </Button>
                    <PopupLesson
                      show={this.state.addModalShow}
                      onHide={addModalClose}
                    />

                  </ButtonToolbar>
                  {/* <main>
                    <button type="button" class="btn btn-primary btn-lg" style={{ width: '18%', float: 'right' }} onClick={() => this.setState({ buttonPopup: true })} >Import</button>
                  </main> */}
                  {/* <PopupLesson trigger={this.state.buttonPopup}>
                    <h3>My lesson</h3>
                  </PopupLesson> */}
                  <p className="card-category" style={{ width: '50%' }}>
                    Created using Montserrat Font Family
                </p>
                </Card.Header>
                <Card.Body>
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0">Name</th>
                        <th className="border-0">Topic</th>
                        <th className="border-0">Number of question</th>
                        <th className="border-0"></th>
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
          <Pagination defaultPage={1} count={3} style={{ padding: "10px 0" }} />
        </Container>
      </>
    )
  }
}


export default Lesson;
