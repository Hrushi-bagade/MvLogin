import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import defaultImage from "./HPz3fFn.png";
import toast from 'toastr';
const AddUser = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  const [image, setImage] = useState({
    placeholderUrl: defaultImage,
    imageData: null,
  });
  const handleUpload = (e) => {
    const localFile = e.target.files[0];
    console.log(localFile);
    if (
      localFile.type === "image/jpeg" ||
      localFile.type === "image/png" ||
      localFile.type === "image/jpg" ||
      localFile.type === "image/svg"
    ) {
        const reader =new FileReader()
        reader.onload=(r)=>{
          setImage({
            placeholderUrl:r.target.result,
            imageData:e.target.files[0]
          })
        }
        reader.readAsDataURL(localFile)
    }
    else{
      toast.error("Invalid File !")
      image.imageData=null
    }
  };
  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Scrollbar style={{ width: 250, height: 250 }}>      */}
          <Form>
            <Container className="d-flex justify-content-center">
              <Row>
                <Col xs={12} md={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Upload Profile Pic</Form.Label>
                    <Form.Control
                      type="file"
                      size="sm"
                      onChange={handleUpload}
                    />
                    <img
                      src={image.placeholderUrl}
                      alt=""
                      id="profilePicPreview"
                      width={200}
                      height={200}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group
                    className="mb-1"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      autoFocus
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Container>
            <Container>
              <Row>
                <Col xs={12} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      autoFocus
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Container>
          </Form>
          {/* </Scrollbar> */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddUser;
