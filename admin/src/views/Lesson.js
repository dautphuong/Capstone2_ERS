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
class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: ""
    }
    //this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }
  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value })
  }

  render() {
    //alert(this.state.selectValue)
    console.log(this.state.selectValue)
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ]
    return (
      <>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Light Bootstrap Table Heading</Card.Title>
                  <p className="card-category">
                    Created using Montserrat Font Family
                </p>
                </Card.Header>
                <Card.Body>
                  <div id = "area-select">
                    <Select options={options} onChange={e => this.handleDropdownChange(e)}  ></Select>
                  </div>
                  <form>
                    <CKEditor
                      editor={ClassicEditor}

                      onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                      }}
                      onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                      }}
                      onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                      }}
                      style={Style.CKEditor}
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
