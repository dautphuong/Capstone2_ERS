import React from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
 class CreateTypeLesson extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create Type Lesson
    </Modal.Title>
            </Modal.Header>
            <Modal.Body >
               <div>hello</div>
            </Modal.Body>
        </Modal>
        )
    }
}
export default CreateTypeLesson;