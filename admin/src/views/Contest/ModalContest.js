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
class ModalContest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataExam: [],
    };
  }
  componentDidMount() {
    API.get(`exam/findAll`).then((res) => {
      const dataExam = res.data;
      this.setState({ dataExam });
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
    const useStyles1 = makeStyles((theme) => ({
      container: {
        display: "flex",
        flexWrap: "wrap",
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
    }));
    const viewExam = this.state.dataExam.map((data, i) => {
      return <MenuItem value={data.id}>{data.title}</MenuItem>;
    });
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
        <Modal.Body>
          <TextField
            id="standard-textarea"
            label="Title"
            placeholder="Title"
            name="title"
            value={this.props.data.title}
            style={{ marginTop: "15px" }}
            onChange={(e) => this.props.handleChangeInput(e)}
            fullWidth
            multiline
            on
          />
          <FormControl
            className={useStyles.formControl}
            style={{ width: "100%" }}
          >
            <InputLabel id="demo-simple-select-label">Exam</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select "
              fullWidth
              name="idExam"
              value={this.props.data.idExam}
              onChange={(e) => this.props.handleChangeInput(e)}
            >
              {viewExam}
            </Select>
          </FormControl>
          <form className={useStyles1.container} noValidate>
            <TextField
              id="datetime-local"
              label="Start time"
              type="datetime-local"
              name="timeStart"
              value={this.props.data.timeStart}
              className={useStyles1.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => this.props.handleChangeInput(e)}
            />
          </form>
          <form className={useStyles1.container} noValidate>
            <TextField
              id="datetime-local"
              label="Start end"
              type="datetime-local"
              name="timeEnd"
              value={this.props.data.timeEnd}
              className={useStyles1.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => this.props.handleChangeInput(e)}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          {this.props.addModalTypeLesson ? (
            <Button
              style={{ marginLeft: "26%" }}
              onClick={() => this.props.createContest()}
            >
              Create
            </Button>
          ) : (
            <Button
              style={{ marginLeft: "26%" }}
              onClick={() => this.props.updateContest()}
            >
              Submit
            </Button>
          )}

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
export default ModalContest;
