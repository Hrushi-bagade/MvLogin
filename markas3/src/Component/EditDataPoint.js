import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Table } from "react-bootstrap";

const EditDatapoints = ({ ShowEditDatapoints, setShowEditDatapoints ,onEditDatapointsData,editDatapointsData}) => {
  const [inputValue, setInputValue] = useState("");
  const [tracklist, setTracklist] = useState([
    { securityName: "HDFC", action: "Delete" },
  ]);
  
  const sendDataToParent = () => {
    debugger
    console.log("DataPoints ",tracklist);
    console.log("onEditDatapointsData:", onEditDatapointsData);
    console.log("onEditDatapointsData type:", typeof onEditDatapointsData);
    onEditDatapointsData(tracklist);
    setShowEditDatapoints(false);

    // ... (your existing code)
  };
  const handleClose = () => {
    setShowEditDatapoints(false);
  };

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      setTracklist([...tracklist, { securityName: inputValue, isChecked: false }]);
      setInputValue("");
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedTracklist = [...tracklist];
    updatedTracklist[index].isChecked = !updatedTracklist[index].isChecked;
    setTracklist(updatedTracklist);
  };

  // const handleDelete = (index) => {
  //   const updatedTracklist = [...tracklist];
  //   updatedTracklist.splice(index, 1);
  //   setTracklist(updatedTracklist);
  // };

  return (
    <div>
      <Modal centered dialogClassName="modal-dialogcentered" size="lg" show={ShowEditDatapoints} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Datapoints</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="mb-2">
              <Col xs={12} md={9}>
                <Form.Control type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className={"px-2 py-1 border rounded"} autoFocus />
              </Col>
              <Col xs={12} md={1}>
                <Button variant="primary" onClick={handleAdd}>
                  Add
                </Button>
              </Col>
              <Col xs={12} md={2}>
                <Button variant="success">Process</Button>
              </Col>
            </Row>

            <Row>
              <Table striped hover size="sm" className="table-custom-header">
                <thead>
                  <tr>
                    <th className="col-9">Security Name</th>
                    <th className="col-1">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {tracklist.map((item, index) => (
                    <tr key={index}>
                      <td>{item.securityName}</td>
                      <td>
                      <Form.Check
                          type="checkbox"
                          checked={item.isChecked || false}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={sendDataToParent}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditDatapoints;
