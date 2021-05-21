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
        }
        this.handleTopic = this.handleTopic.bind(this);
        this.buttonCreate = this.buttonCreate.bind(this);
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
        this.setState({ idTopic: e.target.value });
        console.log("IDtopic:" + this.state.idTopic)
    }
    handleTitle = (e) => {
        this.setState({ dataTitle: e.target.value })
        console.log(e.target.value)
    }
    buttonCreate = (event) => {
        console.log("hahahahah")
        event.preventDefault();
        let data = {
            content: this.state.dataCKE,
            createOnUTC: "2021-05-15 12:23:34",
            idTopic: "-M_jyUM7Cj2wT37qiEka",
            title: this.state.dataTitle,
        }
        // console.log("data:" + data)
        API.post(`lesson/save`, data, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }
    render() {
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
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create Lesson
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <FormControl className={useStyles.formControl} style={{ "width": "100%" }}>
                        <InputLabel id="demo-simple-select-label">Topic</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select "
                            fullWidth
                            onClick={this.handleTopic}
                        >
                            {viewTopic}
                            {/* <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem> */}
                        </Select>
                    </FormControl>
                    <TextField
                        id="standard-textarea"
                        label="Title"
                        placeholder="Title"
                        style={{ marginTop: '15px' }}
                        onChange={this.handleTitle}
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
                            console.log({ event, editor, data });
                            this.setState({ dataCKE: data })
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ marginLeft: '26%' }} onClick={this.buttonCreate}>Create</Button>
                    <Button variant="danger" style={{ marginRight: '26%' }} onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default PopupLesson;