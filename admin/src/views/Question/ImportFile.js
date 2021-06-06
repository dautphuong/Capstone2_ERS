import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Grid from "@material-ui/core/Grid";
//import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import API from "../../api";
import moment from 'moment';
class ImportFile  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataExam: [],
            dataTopic: [],
        };
    }
    // componentDidMount() {
    //     API.get(`exam/findAll`).then((res) => {
    //         const dataExam = res.data;
    //         this.setState({ dataExam });
    //     });
    // }
    componentDidMount() {
        API.get(`topic/findAll`).then((res) => {
          const dataTopic = res.data;
          this.setState({ dataTopic });
        });
      }
    render() {
        const useStyles = makeStyles((theme) => ({
            formControl: {
              margin: theme.spacing(1),
              width: "100%",
            },
            selectEmpty: {
              marginTop: theme.spacing(2),
            },
          }));
          const viewTopic = this.state.dataTopic.map((data, i) => {
            return <MenuItem value={data.id}>{data.name}</MenuItem>;
          });
        // const viewExam = this.state.dataExam.map((data, i) => {
        //     return <MenuItem value={data.id}>{data.title}</MenuItem>;
        // });
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create User
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <FormControl
            className={useStyles.formControl}
            style={{ width: "100%" }}
          >
            <InputLabel id="demo-simple-select-label">Topic</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select "
              fullWidth
              name="idTopic"
             //value={this.props.data.idTopic}
              onChange={(e) => this.props.changeTopicFile(e)}
            >
              {viewTopic}
            </Select>
            <input type="file" name="file" onChange={(e) => this.props.changeHandleFile(e)} />
          </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    {/* {this.props.addModalTypeLesson ? ( */}
                    <Button
                        style={{ marginLeft: "26%" }}
                        onClick={() => this.props.uploadFile()}
                    >
                        Create
                        </Button>
                    {/* // ) : (
                    //     <Button */}
                    {/* //         style={{ marginLeft: "26%" }}
                    //     //onClick={() => this.props.updateContest()}
                    //     >
                    //         Submit
                    //     </Button>
                    // )} */}

                    <Button
                        variant="danger"
                        style={{ marginRight: "26%" }}
                        onClick={this.props.onHide}
                    >
                        Close
          </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default ImportFile;
