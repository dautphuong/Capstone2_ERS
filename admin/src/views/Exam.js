import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  useRouteMatch,
  useParams
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
import API from '../api';
import Button from '@material-ui/core/Button';
import { Route } from "react-router";
import CreateExam from './Exam/CreateExam'
class Exam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataExam: []
    }

  }
  componentDidMount() {
    API.get(`exam/findAll`)
      .then(res => {
        const dataExam = res.data;
        this.setState({ dataExam });
        console.log(this.state.dataExam)
      })
  }
  render() {
    const ViewDataTable = this.state.dataExam.map((data, i) => {
      return (
        <tr>
          <td>{data.title}</td>
          <td>{data.type}</td>
          <td>{data.timeSet}</td>
          <td>{data.createOnUTC}</td>
          <td>sdfjkhsjhgkehk ksdjfl</td>
        </tr>
      )
    })
    return (
      <>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card id="selectedColumn" className="strpied-tabled-with-hover">
                <Card.Header>
                  <Card.Title as="h4">List of exam questions</Card.Title>
                  <Link to='/admin/Exam/createExam'>
                    <Button variant="contained"
                      color="primary"
                      disableElevation style={{ float: 'right', height: '57px', marginRight: '110px' }}
                      to='/admin/Exam/createExam'
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
                        <th className="border-0">CreateOnUTC</th>
                        <th className="border-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {ViewDataTable}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Route path='/admin/Exam/createExam'>
          <CreateExam></CreateExam>
        </Route>
      </>
    );
  }
}

export default Exam;
