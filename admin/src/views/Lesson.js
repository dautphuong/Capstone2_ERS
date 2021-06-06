import React from "react";
import Style from "../assets/css/lesson.css";
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
import Select from "react-select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { data, event } from "jquery";
import {  ButtonToolbar } from "react-bootstrap";
import PopupLesson from "./PopupLesson";
import CreateTypeLesson from "./CreateTypeLesson";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IntlMessages from "../util/IntlMessages";
import TablePagination from "@material-ui/core/TablePagination";
import Button from "@material-ui/core/Button";
import API from "../api";
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
      data: [],
      page: 0,
      dataTopic: [],
      statusCreate: true,
      dataModal: {
        idTopic: "",
        title: "",
        id: "",
      },
      content: "",
    };
    //this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handCkeditorState = this.handCkeditorState.bind(this);
  }
  getAllLesson() {
    API.get(`lesson/findAll`).then((res) => {
      const data = res.data;
      this.setState({ data: data });
    });
  }
  componentDidMount() {
    this.getAllLesson();
  }
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
  }
  handCkeditorState = (event, editor) => {
    const data = editor.getData();
    this.setState({ contentCKEditor: data });
  };
  DeleteLesson(id) {
    const dataLesson = [...this.state.data];
    if (
      window.confirm(
        "Do you want to delete " +
        dataLesson.find((x) => x.id === id).title +
        " ?"
      )
    ) {
      API.delete(`lesson/delete/${id}`)
        .then((res) => {
          this.getAllLesson();
        })
        .then(() => this.getAllLesson());
      // dataLesson.splice(index, 1);
      // this.setState({ data: dataLesson });
    }
  }
  EditLesson(data) {
    this.setState({
      dataModal: { ...this.state.dataModal, ...data },
      content: data.content,
      statusCreate: false,
      addModalShow: true,
    });
    // console.log(data);
  }
  onContactOptionSelect = (event) => {
    // setMenuState(true);
    // setAnchorEl(event.currentTarget);
    this.setState({ menuState: true });
  };
  handleRequestClose = (e) => {
    this.setState({ menuState: false });
  };
  handleInput = (e) => {
    this.setState({
      dataModal: {
        ...this.state.dataModal,
        [e.target.name]: e.target.value,
      },
    });
  };
  handleInputContent = (e) => {
    this.setState({
      content: e,
    });
  };
  buttonUpdate = () => {
    let data = {
      id: this.state.dataModal.id,
      content: this.state.content,
      createOnUTC: "2021-05-15 12:23:34",
      idTopic: this.state.dataModal.idTopic,
      title: this.state.dataModal.title,
    };
    API.put(`lesson/update`, data, {})
      .then((res) => {
        if (res && res.status === 200) {
          alert("Update is successful");
          this.setState({
            addModalShow: false,
            dataModal: { idTopic: "", title: "", id: "" },
            content: "",
          });
        }
      })
      .then(() => this.getAllLesson());
  };
  buttonCreate = () => {
    let data = {
      // id: this.state.dataModal.id,
      content: this.state.content,
      createOnUTC: "2021-05-15 12:23:34",
      idTopic: this.state.dataModal.idTopic,
      title: this.state.dataModal.title,
    };
    API.post(`lesson/save`, data, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        this.setState({
          addModalShow: false,
          dataModal: { idTopic: "", title: "", id: "" },
          content: "",
        });
      })
      .then(() =>
        setTimeout(() => {
          this.getAllLesson();
        }, 500));
  };
  render() {
    //alert(this.state.selectValue)
    const onContactOptionSelect = (event) => {
      // setMenuState(true);
      // setAnchorEl(event.currentTarget);
      this.setState({ menuState: true, anchorEl: event.currentTarget });
    };
    let options = [
      { name: "Edit", icon: "zmdi-edit" },
      { name: "Delete", icon: "zmdi-delete" },
    ];

    let addModalClose = () => this.setState({ addModalShow: false });
    let addModalTypeLessonClose = () =>
      this.setState({ addModalTypeLesson: false });
    const editorConfiguration = {
      toolbar: ["bold", "italic"],
    };
    let ViewDataTable = this.state.data.map((data, i) => {
      return (
        <tr>
          <td>{data.title}</td>
          <td>{data.nameTopic}</td>
          <td>{data.createOnUTC}</td>
          <td>
            <i
              className="zmdi zmdi-edit"
              style={{ width: "10%", marginRight: "10px" }}
              onClick={this.EditLesson.bind(this, data)}
            />
            <i
              className="zmdi zmdi-delete"
              onClick={this.DeleteLesson.bind(this, data.id)}
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
              style={{
              }}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    switch (option.name) {
                      case "Edit":break;
                        
                      case "Delete":
                        {this.DeleteLesson(this,data.id)};
                    }
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
      );
    });

    return (
      <>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card>
                <Card.Header>
                  <Card.Title as="h4" style={{ width: "35%", float: "left" }}>
                   Lesson
                  </Card.Title>
                  {/* <a
                    onClick={() => this.setState({ addModalTypeLesson: true })}
                  >
                    List of Topic
                  </a> */}
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    style={{
                      float: "right",
                      height: "57px",
                      marginRight: "110px",
                      marginTop:'35px'
                    }}
                    onClick={() => this.setState({ addModalTypeLesson: true })}
                  >
                    List of Topic
                    </Button>
                  <CreateTypeLesson
                    show={this.state.addModalTypeLesson}
                    onHide={addModalTypeLessonClose}
                    getAllLesson={() => this.getAllLesson()}
                  />
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                      style={{
                        float: "right",
                        height: "57px",
                        marginRight: "110px",
                        marginTop:'35px'
                      }}
                      onClick={() =>
                        this.setState({
                          addModalShow: true,
                          statusCreate: true,
                          dataModal: { idTopic: "", title: "", id: "" },
                          content: "",
                        })
                      }
                    >
                      Create Lesson
                    </Button>
                    <PopupLesson
                      show={this.state.addModalShow}
                      onHide={addModalClose}
                      statusCreate={this.state.statusCreate}
                      data={this.state.dataModal}
                      buttonUpdate={(data) => this.buttonUpdate(data)}
                      buttonCreate={(data) => this.buttonCreate(data)}
                      handleInput={(e) => this.handleInput(e)}
                      content={this.state.content}
                      handleInputContent={(e) => this.handleInputContent(e)}
                    />
                  {/* <p className="card-category" style={{ width: '50%' }}>
                    Created using Montserrat Font Family
                </p> */}
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
                    <tbody>{ViewDataTable}</tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            rowsPerPage={10}
            count={this.state.data.length}
            page={this.state.page}
            style={{ padding: "10px 0" }}
          />
        </Container>
      </>
    );
  }
}

export default Lesson;
