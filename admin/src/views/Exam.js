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
import API from "../api";
import Button from "@material-ui/core/Button";
import { Route } from "react-router";
import CreateExam from "./Exam/CreateExam";
import ListExam from "./Exam/ListExam";
function Exam() {
  const [dataExam, setDataExam] = useState([]);
  const getAllApi = () => {
    API.get(`exam/findAll`).then((res) => {
      const dataExam = res.data;
      setDataExam(dataExam);
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
  // let { path, url } = useRouteMatch();
  const ViewDataTable = dataExam.map((data, i) => {
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
  return (
    // <>
    //   <Container fluid>
    //     <Row>
    //       <Col md="12">
    //         <Card id="selectedColumn" className="strpied-tabled-with-hover">
    //           <Card.Header>
    //             <Card.Title as="h4">List of exam questions</Card.Title>
    //             <Link to={`${url}/createExam`}>
    //               <Button
    //                 variant="contained"
    //                 color="primary"
    //                 disableElevation
    //                 style={{
    //                   float: "right",
    //                   height: "57px",
    //                   marginRight: "110px",
    //                 }}
    //                 to={`${url}/createExam`}
    //               >
    //                 Create Exam
    //               </Button>
    //             </Link>
    //           </Card.Header>
    //           <Card.Body className="table-full-width table-responsive px-0">
    //             <Table className="table-hover table-striped">
    //               <thead>
    //                 <tr>
    //                   <th className="border-0">Name</th>
    //                   <th className="border-0">Type</th>
    //                   <th className="border-0">Time</th>
    //                   <th className="border-0">Create On UTC</th>
    //                   <th className="border-0"></th>
    //                 </tr>
    //               </thead>
    //               <tbody>{ViewDataTable}</tbody>
    //             </Table>
    //           </Card.Body>
    //         </Card>
    //       </Col>
    //     </Row>
    //   </Container>
      <Switch>
        <Route
          path={`${path}/createExam`}
          render={(props) => <CreateExam {...props} />}
        />
        <Route
        exact
          path={`${path}/`}
          render={(props) => <ListExam {...props} />}
        />
      </Switch> 
    //</>
  );
}

export default Exam;
