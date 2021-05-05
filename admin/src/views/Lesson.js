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
import  PopupLesson  from './PopupLesson';

class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: "",
      contentCKEditor: "",
      addModalShow: false,
      data: []
    }
    //this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handCkeditorState = this.handCkeditorState.bind(this);
  }
  componentDidMount() {
    const dataSet = [
      {
        Name: "Cuộc thi năm 2021",
        Topic: "Danh Từ",
        NumberOfQuestion: 60,
        Time: 45
      },
      {
        Name: "Cuộc thi năm 2022",
        Topic: "Tính Từ",
        NumberOfQuestion: 60,
        Time: 45
      },
      {
        Name: "Cuộc thi năm 2023",
        Topic: "Động Từ",
        NumberOfQuestion: 60,
        Time: 45
      },
    ];
    this.setState({ data: dataSet })
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
  render() {
    //alert(this.state.selectValue)
    console.log(this.state.selectValue)
    let addModalClose = () => this.setState({ addModalShow: false })
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ]
    const editorConfiguration = {
      toolbar: ['bold', 'italic']
    };

    let ViewDataTable = this.state.data.map((data, i) => {
      return (
        <tr>
          <td>{data.Name}</td>
          <td>{data.Topic}</td>
          <td>{data.NumberOfQuestion}</td>
          <td>{data.Time}</td>
          <td>
            <div>
              <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
            </div>
            <div>
              <a onClick={() => this.DeleteLesson(i)}><i class="fa fa-trash" aria-hidden="true" ></i></a>
            </div>
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
                  <Card.Title as="h4" style={{ width: '50%', float: 'left' }}>Light Bootstrap Table Heading</Card.Title>
                  <ButtonToolbar>
                    <Button 
                    variant="primary"
                    onClick = {()=>this.setState({addModalShow : true})}
                    >
                        Import
                    </Button>
                    <PopupLesson
                    show={this.state.addModalShow}
                    onHide = {addModalClose}
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
                        <th className="border-0">Time</th>
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
        </Container>
      </>
    )
  }
}


export default Lesson;
