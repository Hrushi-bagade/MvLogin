import React from "react";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import AddUser from "./AddUser";
import { Table } from "react-bootstrap";
const UserListing = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add User
      </Button>
      <Table responsive hover className="mb-0">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Job Title</th>
            <th scope="col">Degree</th>
            <th scope="col">Salary</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Adrian Monino</td>
            <td>Front-End Engineer</td>
            <td>Computer Science</td>
            <td>$120,000</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Socrates Itumay</td>
            <td>Software Engineer</td>
            <td>Computer Engineering</td>
            <td>$150,000</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Reynante Labares</td>
            <td>Product Manager</td>
            <td>Business Management</td>
            <td>$250,000</td>
          </tr>
        </tbody>
      </Table>

      <AddUser show={show} setShow={setShow} />
    </>
  );
};

export default UserListing;
