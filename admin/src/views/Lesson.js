import React from "react";
import Style from '../assets/css/lesson.css'
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Select from 'react-select';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { data, event } from "jquery";

class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: "",
      contentCKEditor: ""
    }
    //this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handCkeditorState = this.handCkeditorState.bind(this);
  }
  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value })
  }
  handCkeditorState = (event, editor) => {
      const data = editor.getData();
      this.setState({contentCKEditor : data})
      console.log(this.state.contentCKEditor)
  }

  render() {
    //alert(this.state.selectValue)
    console.log(this.state.selectValue)
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ]
    const editorConfiguration = {
      toolbar: ['bold', 'italic']
    };
    return (
      <>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card>
                <Card.Header>
                  <Card.Title as="h4" style = {{width:'50%', float:'left'}}>Light Bootstrap Table Heading</Card.Title>
                  <button type="button" class="btn btn-primary btn-lg" style = {{width:'18%', float:'right'}} >Import</button>
                  <p className="card-category" style={{width:'50%' }}>
                    Created using Montserrat Font Family
                </p>
                </Card.Header>
                <Card.Body>
                  <div id="area-select">
                    <Select options={options} onChange={e => this.handleDropdownChange(e)}  ></Select>
                  </div>
                  <form>
                    <CKEditor
                      editor={ClassicEditor}
                      //config={ editorConfiguration }
                      onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                      }}
                      onChange={this.handCkeditorState}
                      onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                      }}
                      onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                      }}
                    />
                    <input type="submit" value="Submit" />
                  </form>
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
