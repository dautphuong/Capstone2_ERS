import React from "react";
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
class CreateExam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Table className="table-hover table-striped">
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
            </tbody>
          </Table>
        )
    }
}

export default CreateExam;