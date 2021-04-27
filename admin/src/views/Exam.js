import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

class Exam extends React.Component {
  render() {
    const data = [
      {
        Name: "Cuộc thi năm 2021",
        Topic: "Danh Từ",
        NumberOfQuestion: 60,
        Time: 45
      },
      {
        Name: "Cuộc thi năm 2022",
        Topic: "Tính Từ",
        NumberOfQuestion: 60,
        Time: 45
      },
      {
        Name: "Cuộc thi năm 2023",
        Topic: "Động Từ",
        NumberOfQuestion: 60,
        Time: 45
      },
    ]
    const ViewDataTable = data.map((data, i) => {
      return (
        <tr>
          <td>{data.Name}</td>
          <td>{data.Topic}</td>
          <td>{data.NumberOfQuestion}</td>
          <td>{data.Time}</td>
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
                  <p className="card-category">
                    Here is a subtitle for this table
                </p>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table  className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0">Name</th>
                        <th className="border-0">Topic</th>
                        <th className="border-0">Number of question</th>
                        <th className="border-0">Time</th>
                        <th className="border-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {ViewDataTable}
                      {/* <tr>
                        <td></td>
                        <td>Dakota Rice</td>
                        <td>$36,738</td>
                        <td>Niger</td>
                        <td>Oud-Turnhout</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Minerva Hooper</td>
                        <td>$23,789</td>
                        <td>Curaçao</td>
                        <td>Sinaai-Waas</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Sage Rodriguez</td>
                        <td>$56,142</td>
                        <td>Netherlands</td>
                        <td>Baileux</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>Philip Chaney</td>
                        <td>$38,735</td>
                        <td>Korea, South</td>
                        <td>Overland Park</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>Doris Greene</td>
                        <td>$63,542</td>
                        <td>Malawi</td>
                        <td>Feldkirchen in Kärnten</td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>Mason Porter</td>
                        <td>$78,615</td>
                        <td>Chile</td>
                        <td>Gloucester</td>
                      </tr> */}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Exam;
