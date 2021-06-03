import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
// react-bootstrap components
import {
  Badge,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import API from "../../api";
import Button from "@material-ui/core/Button";
import Pagination from "@material-ui/lab/Pagination";
import { Route } from "react-router";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
//import CreateExam from "./Exam/CreateExam";

function ListExam() {
  const [dataExam, setDataExam] = useState([]);
  const [dataViewExam,setDataViewExam]= useState([]);
  const [type,setType] = useState('');
  const getAllApi = () => {
    API.get(`exam/findExamLesson `).then((res) => {
      const dataExam = res.data;
      setDataExam(dataExam);
      setDataViewExam(dataExam);
    });
  };
  let { path, url } = useRouteMatch();
  useEffect(() => {
    getAllApi();
  }, []);
  const DeleteExam = (id) => {
    if (
      window.confirm(
        "Do you want to delete " +
        dataExam.find((x) => x.id === id).title +
        " ?"
      )
    ) {
      API.delete(`exam/delete/${id}`).then((res) => {
        console.log(res.data);
        getAllApi();
      });
    }
  };
  const UpdateExam = (id,type) => {
    sessionStorage.setItem("idExam", id);
    sessionStorage.setItem("type", type);
    window.location = "/admin/exam/updateExam";
  }
  // let { path, url } = useRouteMatch();
  const ViewDataTable = dataViewExam.map((data, i) => {
    return (
      <tr>
        <td>{data.title}</td>
        <td>{data.type}</td>
        <td>{data.timeSet}</td>
        <td>{data.createOnUTC}</td>
        <td>
          <i
            className="zmdi zmdi-edit"
            style={{ width: "10%", marginRight: "10px" }}
            onClick={() => UpdateExam(data.id,data.type)}
          />
          <i
            className="zmdi zmdi-delete"
            style={{ width: "10%", marginRight: "10px" }}
            onClick={() => DeleteExam(data.id)}
          />
        </td>
      </tr>
    );
  });
  const getAllDataExamAndPractice = (type) => {
    API.get(`exam/findByType/${type}`).then((res) => {
      const dataExam = res.data;
     // setDataExam(dataExam);
      setDataViewExam(dataExam);
    });
  };
  
  const  handleChange = (e) => {
    setType(e.target.value);
    let type= e.target.value;  
    let dataE = dataExam;
    console.log({dataExam})
    if(type===''){
      setDataViewExam(dataExam);
      console.log("haha : ", dataViewExam);
    }
    else{
      dataE = dataE.filter(data => data.type === type)
      setDataViewExam(dataE)
      console.log("Exam:",dataViewExam);
    }
  };

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));
  console.log(type)
  console.log(dataExam)
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card id="selectedColumn" className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">List of exam questions</Card.Title>
                <FormControl className={useStyles.margin}>
                  <InputLabel htmlFor="demo-customized-select-native">Type</InputLabel>
                  <NativeSelect
                    id="demo-customized-select-native"
                    value={type}
                    onChange={handleChange}
                    //input={<BootstrapInput />}
                    style={{width:"300px"}}
                  >
                    <option aria-label="None" value="" />
                    <option value="exam">Exam</option>
                    <option value="lesson">Lesson</option>
                    <option value='practice'>Practice</option>
                  </NativeSelect>
                </FormControl>
                <Link to={`${url}/createExam`}>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    style={{
                      float: "right",
                      height: "57px",
                      marginRight: "110px",
                    }}
                    to={`${url}/createExam`}
                  >
                    Create Exam
                  </Button>
                </Link>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Name</th>
                      <th className="border-0">Type</th>
                      <th className="border-0">Time</th>
                      <th className="border-0">Create On UTC</th>
                      <th className="border-0"></th>
                    </tr>
                  </thead>
                  <tbody>{ViewDataTable}</tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ListExam;
