import React from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import '../assets/css/popupLesson.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import API from '../api';
class PopupLesson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTopic: [],
            idTopic: "",
            dataCKE: "",
            dataTitle: "",
            statusCreate: this.props.statusCreate,
        }
        //this.handleTopic = this.handleTopic.bind(this);
        //this.buttonCreate = this.buttonCreate.bind(this);
    }
    componentDidMount() {
        API.get(`topic/findAll`)
            .then(res => {
                const dataTopic = res.data;
                this.setState({ dataTopic });
                console.log(this.state.dataTopic);
            })
    }
    handleTopic = (e) => {
        console.log(e.target.value);
        // this.setState({ idTopic: e.target.value });
        this.setState({
            dataModal: {
                ...this.state.dataModal,
                [e.target.name]: e.target.value
            }
        })
        // console.log("IDtopic:" + this.state.idTopic)
    }
    handleTitle = (e) => {
        this.setState({ dataTitle: e.target.value })
        console.log(e.target.value)
    }

    // buttonUpdate = (idLesson) => {
    //     console.log("hahahahah")
    //     //e.preventDefault();
    //     let data = {
    //         id :idLesson,
    //         content: this.state.dataCKE,
    //         createOnUTC: "2021-05-15 12:23:34",
    //         idTopic: this.state.idTopic,
    //         title: this.state.dataTitle,
    //     }
    //     console.log("data:" ,data)
    //     API.put(`lesson/update`, data, {
    //     })
    //         .then(res => {
    //             console.log(res);
    //             console.log(res.data);
    //             this.setState({ addModalShow: false })
    //         })
    // }
    render() {
        console.log("data:", this.state.dataModal)
        console.log("Status create : ", this.state.statusCreate)
        const useStyles = makeStyles((theme) => ({
            formControl: {
                margin: theme.spacing(1),
                width: "100%"
            },
            selectEmpty: {
                marginTop: theme.spacing(2),
            },
        }));
        const viewTopic = this.state.dataTopic.map((data, i) => {
            return (
                <MenuItem value={data.id}>{data.name}</MenuItem>
            )
        })
        return (

            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    {this.props.statusCreate ? (
                        <Modal.Title id="contained-modal-title-vcenter">
                            Create Lesson
                        </Modal.Title>
                    ) : (
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update  Lesson
                        </Modal.Title>
                    )
                    }
                </Modal.Header>
                <Modal.Body >
                    <FormControl className={useStyles.formControl} style={{ "width": "100%" }}>
                        <InputLabel id="demo-simple-select-label" >Topic</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select "
                            name="idTopic"
                            value={this.props.data.idTopic}
                            fullWidth
                            onChange={(e) => this.props.handleInput(e)}
                        >
                            {this.state.dataTopic.map((data, i) => {
            return (
                <MenuItem value={data.id}>{data.name}</MenuItem>
            )})}
                            {/* <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem> */}
                        </Select>
                    </FormControl>
                    <TextField
                        id="standard-textarea"
                        name="title"
                        label="Title"
                        placeholder="Title"
                        style={{ marginTop: '15px' }}
                        onChange={(e) => this.props.handleInput(e)}
                        defaultValue={this.props.statusCreate ? '' : this.props.data.title}
                        fullWidth
                        multiline
                        on
                    />
                    <CKEditor
                        editor={ClassicEditor}
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            //console.log({ event, editor, data });
                           this.props.handleInputContent(data)
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                        data={ this.props.content}
                    />
                </Modal.Body>
                <Modal.Footer>
                    {this.props.statusCreate ? (
                        <Button style={{ marginLeft: '26%' }} onClick={this.props.buttonCreate}>Create</Button>
                    ) : (
                        <Button style={{ marginLeft: '26%' }} onClick={this.props.buttonUpdate}>Update</Button>
                    )}
                    <Button variant="danger" style={{ marginRight: '26%' }} onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default PopupLesson;