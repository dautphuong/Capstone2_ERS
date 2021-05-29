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
import API from "../../api";
class ModalQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTopic: [],
    };
  }
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
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Question
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
              value={this.props.data.idTopic}
              onChange={(e) => this.props.handleChangeInput(e)}
            >
              {viewTopic}
            </Select>
          </FormControl>
          <TextField
            id="standard-password-input"
            label="Title"
            name="title"
            value={this.props.data.title}
            onChange={(e) => this.props.handleChangeInput(e)}
          />
          <br/>
          <TextField
            id="standard-password-input"
            label="A."
            value={this.props.answerA}
            onChange={(e) => this.props.setStateAnswerA(e)}
          />
          <TextField
            id="standard-password-input"
            label="B."
            style={{    marginLeft: '80px'}}
            value={this.props.answerB}
            onChange={(e) => this.props.setStateAnswerB(e)}
          />
          <br/>
          <TextField
            id="standard-password-input"
            label="C."
            value={this.props.answerC}
            onChange={(e) => this.props.setStateAnswerC(e)}
          />
  
          <TextField
            id="standard-password-input"
            label="D."
            style={{    marginLeft: '80px'}}
            value={this.props.answerD}
            onChange={(e) => this.props.setStateAnswerD(e)}
          />
          <br />
          <TextField
            id="standard-password-input"
            label="Answer Right"
            name="answerRight"
            value={this.props.data.answerRight}
            onChange={(e) => this.props.handleChangeInput(e)}
          />
          <TextField
            id="standard-password-input"
            label="Note"
            name="note"
            style={{    marginLeft: '80px'}}
            value={this.props.data.note}
            onChange={(e) => this.props.handleChangeInput(e)}
          />
          <br />
          <input type="file" name="file" onChange={(e) => this.props.changeHandleFile(e)} />
        </Modal.Body>
        <Modal.Footer>
          {this.props.addModalTypeQuestion ? (
            <Button
              style={{ marginLeft: "26%" }}
              onClick={this.props.createQuestion}
            >
              Create
            </Button>
          ) : (
            <Button
              style={{ marginLeft: "26%" }}
              onClick={this.props.updateQuestion}
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
export default ModalQuestion;
