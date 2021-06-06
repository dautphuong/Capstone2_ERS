import React from 'react'
import { Modal, Row, Col, Form, Table, ModalBody } from 'react-bootstrap'
import API from '../api';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
class CreateTypeLesson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataType: [],
            name: '',
            showModal: false,
            topicEdit: '',
            idTopic: ''
        }
    }
    getAllTopic() {
        API.get(`topic/findAll`)
            .then(res => {
                const dataType = res.data;
                this.setState({ dataType });
            })
    }
    componentDidMount() {
        this.getAllTopic()
    }
    DeleteType(id) {
        console.log(id);
        const dataType = [...this.state.dataType]
        if (window.confirm('Do you want to delete ' + dataType.find(x => x.id === id).name + ' ?')) {
            API.delete(`topic/delete/${id}`)
                .then(res => {
                    console.log(res.data)
                    this.getAllTopic();
                })
        }
    }
    updateCreate = (event) => {
        event.preventDefault();
        const data = {
            id: this.state.idTopic,
            name: this.state.topicEdit
        };
        console.log("data", data)
        console.log("data:", data)
        API.put(`topic/update`, data, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.setState ({showModal: false,topicEdit: '',idTopic: ''})
                this.getAllTopic();
            })
    }

    buttonCreate = (event) => {
        event.preventDefault();
        const data = {
            name: this.state.name
        };
        console.log(data)
        // console.log("data:" ,data)
        API.post(`topic/save`, data, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.getAllTopic();
            })
    }
    handleName = (e) => {
        this.setState({ name: e.target.value })
        console.log(e.target.value)
    }
    handleChangeTopic = (e) => {
        this.setState({ topicEdit: e.target.value })
        console.log(this.state.topicEdit)
    }
    render() {
        let addModalClose = () => this.setState({ showModal: false })
        let options = [
            { name: "Edit", icon: "zmdi-edit" },
            { name: "Delete", icon: "zmdi-delete" },
        ];
        const ViewDataTable = this.state.dataType.map((data, i) => {
            return (
                <tr>
                    <td disabled >{data.name}</td>
                    <td>
                        <i
                            className="zmdi zmdi-edit"
                            onClick={() => this.setState({ showModal: true, topicEdit: data.name, idTopic: data.id })}
                            style={{ width: "10%", marginRight: "10px" }}
                        />
                        <i
                            className="zmdi zmdi-delete" onClick={this.DeleteType.bind(this, data.id)}
                            style={{ width: "10%", marginRight: "10px" }}
                        />
                    </td>
                </tr>
            )
        })
        return (
            <>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Create Topic
    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <TextField
                            id="standard-textarea"
                            label="Name"
                            placeholder="Name"
                            style={{ marginTop: '15px', float: 'left', width: '75%' }}
                            onChange={this.handleName}
                            multiline
                            on
                        />
                        <Button variant="contained"
                            color="primary"
                            disableElevation style={{ float: 'right', height: '43px', width: '129px', marginTop: '20px', fontSize: 'small' }}
                            onClick={this.buttonCreate}
                        >
                            Create type
                    </Button>
                        <Table className="table-hover table-striped"
                            style={{

                                height: "300px",
                                display: "block",
                                overflowY: "scroll",
                                width: "100%"
                            }}
                            fullWidth
                        >
                            <thead style={{ width: "100%" }}>
                                < tr >
                                    <th className="border-0">Name</th>
                                    <th className="border-0"></th>
                                </tr>
                            </thead>
                            <tbody
                            // style={{
                            //     height: "50px !important",
                            //     overflowY: "scroll"
                            // }}
                            >
                                {ViewDataTable}
                            </tbody>
                        </Table>
                    </Modal.Body >
                </Modal >
                <Modal show={this.state.showModal} onHide={addModalClose} style={{ paddingTop: '250px' }}>
                    <ModalBody>
                        <TextField
                            id="standard-textarea"
                            name="topicEdit"
                            label="topicEdit"

                            placeholder="Name"
                            value={this.state.topicEdit}
                            //style={{ marginTop: '15px', float: 'left', width: '75%' }}
                            onChange={this.handleChangeTopic}
                            multiline
                            on
                        />
                        <Button variant="contained"
                            color="primary"
                            disableElevation style={{ float: 'right', height: '43px', width: '129px', marginTop: '20px', fontSize: 'small' }}
                            onClick={this.updateCreate}
                        >
                            Update  type
                    </Button>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}
export default CreateTypeLesson;