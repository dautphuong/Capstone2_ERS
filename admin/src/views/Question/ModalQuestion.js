import React from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import API from '../../api';
class ModalQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTopic: [],
            dataCKE: '',
            selectedFile: ''
        }
    }
    componentDidMount() {
        API.get(`topic/findAll`)
            .then(res => {
                const dataTopic = res.data;
                this.setState({ dataTopic });
                console.log(this.state.dataTopic);
            })
    }
    changeHandler = (event) => {
        this.setState({ selectedFile: event.target.files[0] })
    };
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
                        Create Question
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
                        </Select>
                    </FormControl>
                    <TextField
                        id="standard-password-input"
                        label="title"
                        autoComplete="current-password"
                    />
                    <br/>
                    <TextField
                        id="standard-password-input"
                        label="A."
                        autoComplete="current-password"
                    />
                      <br/>
                    <TextField
                        id="standard-password-input"
                        label="B."
                        autoComplete="current-password"
                    />
                      <br/>
                     <TextField
                        id="standard-password-input"
                        label="C."
                        autoComplete="current-password"
                    />
                      <br/>
                     <TextField
                        id="standard-password-input"
                        label="D."
                        autoComplete="current-password"
                    />
                      <br/>
                         <TextField
                        id="standard-password-input"
                        label="Answer Right"
                        autoComplete="current-password"
                    />
                      <br/>
                     <TextField
                        id="standard-password-input"
                        label="Note"
                        autoComplete="current-password"
                    />
                    {/* <CKEditor
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
                    /> */}
                    <br/>
                    <input type="file" name="file" onChange={this.changeHandler} />
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ marginLeft: '26%' }} onClick={this.buttonCreate}>Create</Button>
                    <Button variant="danger" style={{ marginRight: '26%' }} onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default ModalQuestion;