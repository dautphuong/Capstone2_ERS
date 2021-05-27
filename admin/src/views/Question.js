
import React from "react";
import { DataGrid } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';
import API from '../api';
import ModalQuestion from './Question/ModalQuestion';

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
import Pagination from "@material-ui/lab/Pagination";
import Button from '@material-ui/core/Button';
// react-bootstrap components

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataQuestion: [],
      addModalShow:false,
    }

  }
  // create : 
  componentDidMount() {
    API.get(`question/findAll`)
      .then(res => {
        const dataQuestion = res.data;
        this.setState({ dataQuestion });
        console.log(this.state.dataQuestion)
      })
  }
  render() {
    let addModalClose = () => this.setState({ addModalShow: false })
    let ViewDataTable = this.state.dataQuestion.map((data, i) => {
      let ViewAnswerChooses = data.answerChooses.map((answer) => {
        return (<li style={{ "list-style-type": "none" }}>{answer}</li>)
      })
      return (
        <tr>
          <td style={{ "width": "35%" }}>{data.title}</td>
          <td style={{ "width": "20%" }}>{ViewAnswerChooses}</td>
          <td style={{ "width": "10%" }}>{data.answerRight}</td>
          <td style={{ "width": "35%" }}>{data.note} </td>
        </tr>
      )
    })
    return (
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">List of question</Card.Title>
                <Button variant="contained"
                  color="primary"
                  disableElevation style={{ float: 'right', height: '57px', marginRight: '110px' }}
                  onClick={() => this.setState({ addModalShow: true })}
                  >
                  Create question
                </Button>
                < ModalQuestion
                show={this.state.addModalShow}
                onHide={addModalClose}
               />
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                {/* <Grid>
                    <div style={{ height: 400, width: '100%' }}>
                      <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection style={{ height: "300px" }} />
                    </div>
                  </Grid> */}
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0" style={{ "width": "35%" }}>Question</th>
                      <th className="border-0" style={{ "width": "20%" }}>Answer</th>
                      <th className="border-0" style={{ "width": "10%" }}>Answer Right </th>
                      <th className="border-0" style={{ "width": "35%" }}>Explain</th>
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
        <Pagination defaultPage={1} count={3} style={{ padding: "10px 0" }} />
      </Container>
    )
  }
}

export default Question;
