import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import defaultImage from "./HPz3fFn.png";
import toast from "toastr";
import DatePicker from "react-datepicker";
import Select from "react-select";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const AddUser = ({ show, setShow }) => {
  const handleClose = () => setShow(false);

  const [image, setImage] = useState({
    // Image State object
    placeholderUrl: defaultImage,
    imageData: null,
  });

  const selectCountry = [
    {
      country: "India",
      states: [
        {
          state: "Andhra Pradesh",
          cities: [
            { value: "Vijayawada", label: "Vijayawada" },
            { value: "Visakhapatnam", label: "Visakhapatnam" },
            { value: "Guntur", label: "Guntur" },
            { value: "Nellore", label: "Nellore" },
            { value: "Kakinada", label: "Kakinada" },
            { value: "Rajahmundry", label: "Rajahmundry" },
            { value: "Tirupati", label: "Tirupati" },
            { value: "Kurnool", label: "Kurnool" },
            { value: "Anantapur", label: "Anantapur" },
            { value: "Ongole", label: "Ongole" },
          ],
        },
        {
          state: "Bihar",
          cities: [
            { value: "Patna", label: "Patna" },
            { value: "Gaya", label: "Gaya" },
            { value: "Muzaffarpur", label: "Muzaffarpur" },
            { value: "Darbhanga", label: "Darbhanga" },
            { value: "Bhagalpur", label: "Bhagalpur" },
            { value: "Purnia", label: "Purnia" },
            { value: "Begusarai", label: "Begusarai" },
            { value: "Biharsharif", label: "Biharsharif" },
            { value: "Chapra", label: "Chapra" },
            { value: "Sitamarhi", label: "Sitamarhi" },
          ],
        },
        {
          state: "Gujarat",
          cities: [
            { value: "Ahmedabad", label: "Ahmedabad" },
            { value: "Surat", label: "Surat" },
            { value: "Vadodara", label: "Vadodara" },
            { value: "Rajkot", label: "Rajkot" },
            { value: "Jamnagar", label: "Jamnagar" },
            { value: "Bhavnagar", label: "Bhavnagar" },
            { value: "Junagadh", label: "Junagadh" },
            { value: "Nadiad", label: "Nadiad" },
            { value: "Anand", label: "Anand" },
            { value: "Godhra", label: "Godhra" },
          ],
        },
        {
          state: "Karnataka",
          cities: [
            { value: "Bangalore", label: "Bangalore" },
            { value: "Mysore", label: "Mysore" },
            { value: "Mangalore", label: "Mangalore" },
            { value: "Hubli-Dharwad", label: "Hubli-Dharwad" },
            { value: "Gulbarga", label: "Gulbarga" },
            { value: "Belgaum", label: "Belgaum" },
            { value: "Bijapur", label: "Bijapur" },
            { value: "Davanagere", label: "Davanagere" },
            { value: "Bellary", label: "Bellary" },
            { value: "Raichur", label: "Raichur" },
          ],
        },
      ],
    },
    {
      country: "USA",
      states: [
        {
          state: "California",
          cities: [
            { value: "Los Angeles", label: "Los Angeles" },
            { value: "San Diego", label: "San Diego" },
            { value: "San Jose", label: "San Jose" },
            { value: "San Francisco", label: "San Francisco" },
            { value: "Fresno", label: "Fresno" },
            { value: "Sacramento", label: "Sacramento" },
            { value: "Long Beach", label: "Long Beach" },
            { value: "Oakland", label: "Oakland" },
            { value: "Santa Ana", label: "Santa Ana" },
            { value: "Anaheim", label: "Anaheim" },
          ],
        },
        {
          state: "Texas",
          cities: [
            { value: "Houston", label: "Houston" },
            { value: "San Antonio", label: "San Antonio" },
            { value: "Dallas", label: "Dallas" },
            { value: "Austin", label: "Austin" },
            { value: "Fort Worth", label: "Fort Worth" },
            { value: "El Paso", label: "El Paso" },
            { value: "Arlington", label: "Arlington" },
            { value: "Corpus Christi", label: "Corpus Christi" },
            { value: "Plano", label: "Plano" },
            { value: "Lubbock", label: "Lubbock" },
          ],
        },
        {
          state: "New York",
          cities: [
            { value: "New York", label: "New York" },
            { value: "Buffalo", label: "Buffalo" },
            { value: "Rochester", label: "Rochester" },
            { value: "Yonkers", label: "Yonkers" },
            { value: "Syracuse", label: "Syracuse" },
            { value: "Albany", label: "Albany" },
            { value: "New Rochelle", label: "New Rochelle" },
            { value: "Schenectady", label: "Schenectady" },
            { value: "Utica", label: "Utica" },
            { value: "White Plains", label: "White Plains" },
          ],
        },
        {
          state: "Florida",
          cities: [
            { value: "Jacksonville", label: "Jacksonville" },
            { value: "Miami", label: "Miami" },
            { value: "Tampa", label: "Tampa" },
            { value: "St. Petersburg", label: "St. Petersburg" },
            { value: "Orlando", label: "Orlando" },
            { value: "Hialeah", label: "Hialeah" },
            { value: "Tallahassee", label: "Tallahassee" },
            { value: "Fort Lauderdale", label: "Fort Lauderdale" },
            { value: "Pembroke Pines", label: "Pembroke Pines" },
            { value: "Hollywood", label: "Hollywood" },
          ],
        },
      ],
    },
    // More countries and their states and cities follow in the same format
  ];

  const countryOptions = [
    { value: "usa", label: "United States" },
    { value: "canada", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "india", label: "India" },
    { value: "australia", label: "Australia" },
    { value: "germany", label: "Germany" },
    { value: "france", label: "France" },
    { value: "japan", label: "Japan" },
    { value: "brazil", label: "Brazil" },
  ];

  const StateOptions = [
    { value: "ny", label: "New York" },
    { value: "ca", label: "California" },
    { value: "tx", label: "Texas" },
    { value: "fl", label: "Florida" },
    { value: "il", label: "Illinois" },
    { value: "dl", label: "Delhi" },
    { value: "mh", label: "Maharashtra" },
    { value: "tn", label: "Tamil Nadu" },
    { value: "up", label: "Uttar Pradesh" },
    { value: "wb", label: "West Bengal" },
  ];
  const CityOptions = [
    { value: "nyc", label: "New York City" },
    { value: "alb", label: "Albany" },
    { value: "buf", label: "Buffalo" },
    { value: "la", label: "Los Angeles" },
    { value: "sf", label: "San Francisco" },
    { value: "sd", label: "San Diego" },
    { value: "dl", label: "Delhi" },
    { value: "mh", label: "Maharashtra" },
    { value: "tn", label: "Tamil Nadu" },
    { value: "up", label: "Uttar Pradesh" },
    { value: "wb", label: "West Bengal" },
  ];

  const CategoryOptions = [
    { value: "X", label: "x" },
    { value: "V", label: "v" },
    { value: "B", label: "b" },
    { value: "N", label: "n" },
    { value: "M", label: "m" },
  ];

  const DeparmentOptions = [
    { value: "X", label: "x" },
    { value: "V", label: "v" },
    { value: "B", label: "b" },
    { value: "N", label: "n" },
    { value: "M", label: "m" },
  ];

  const DesignationOptions = [
    { value: "X", label: "x" },
    { value: "V", label: "v" },
    { value: "B", label: "b" },
    { value: "N", label: "n" },
    { value: "M", label: "m" },
  ];
  const [formData, setFormData] = useState({
    //Formdata object
    firstname: "",
    lastName: "",
    phoneNumber1: "",
    phoneNumber2: "",
    teloff:"",
    telres:"",
    Fax:"",
    password: "",
    comfirmpassword: "",
    category: "",
    emailId: "",
    isActive: false,
    department: "",
    dob: "",
    designation: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    linkdinUrl: "",
    facebookUrl: "",
  });

  console.log(formData);
  //Image Upload Validation
  const handleUpload = (e) => {
    const localFile = e.target.files[0];
    console.log(localFile);
    if (
      localFile.type === "image/jpeg" ||
      localFile.type === "image/png" ||
      localFile.type === "image/jpg" ||
      localFile.type === "image/svg"
    ) {
      const reader = new FileReader();
      reader.onload = (r) => {
        setImage({
          placeholderUrl: r.target.result,
          imageData: e.target.files[0],
        });
      };
      reader.readAsDataURL(localFile);
    } else {
      toast.error("Invalid File !");
      image.imageData = null;
    }
  };
  const ValidForm = () => {};
  //Form Submit Function
  const [validated, setValidated] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = ValidForm();
    if (!isValid) {
      console.log("Form Submitted", formData);
    }
  };

  const handleCountryChange = (selectedOption) => {
    // Update the formData state with the selected country value
    setFormData({
      ...formData,
      country: selectedOption.value,
    });
  };

  const handleStateChange = (selectedOption) => {
    // Update the formData state with the selected country value
    setFormData({
      ...formData,
      state: selectedOption.value,
    });
  };

  const handleCityChange = (selectedOption) => {
    // Update the formData state with the selected country value
    setFormData({
      ...formData,
      city: selectedOption.value,
    });
  };

  const handleCategoryChange = (selectedOption) => {
    // Update the formData state with the selected country value
    setFormData({
      ...formData,
      category: selectedOption.value,
    });
  };
  const handleDepartmentChange = (selectedOption) => {
    // Update the formData state with the selected country value
    setFormData({
      ...formData,
      department: selectedOption.value,
    });
  };
  const handleDesignationtChange = (selectedOption) => {
    // Update the formData state with the selected country value
    setFormData({
      ...formData,
      designation: selectedOption.value,
    });
  };

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;

    // Update the formData state with the checkbox value
    setFormData({
      ...formData,
      isActive: checked,
    });
  };

  return (
    <>
      <Modal
        size="lg"
        show={show}
        dialogClassName="modal-dialogcentered"
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Scrollbar style={{ width: 250, height: 250 }}>      */}
          <Form onSubmit={handleSubmit}>
            {/* Image upload Container */}
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
                      className="mt-2 mb-2"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Container>

            <Container>
              <Tabs
                defaultActiveKey="profile"
                id="justify-tab-example"
                className="mb-3"
                justify
              >
                {/* Basic Info Tab */}
                <Tab eventKey="Basic Info" title="Basic Info">
                  <Row>
                    <Col xs={12} md={4}>
                      <Form.Group
                        className="mb-1"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="name@example.com"
                          required
                          value={formData.emailId}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              emailId: e.target.value,
                            })
                          }
                          autoFocus
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          placeholder="FirstName"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstname: e.target.value,
                            })
                          }
                          autoFocus
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="last name"
                          required
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                          autoFocus
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={4}>
                      <Form.Group
                        className="mb-1"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                          type="date"
                          value={formData.dob}
                          onChange={(e) =>
                            setFormData({ ...formData, dob: e.target.value })
                          }
                          autoFocus
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Category</Form.Label>
                        <Select
                          onChange={handleCategoryChange}
                          options={CategoryOptions}
                          isSearchable={true}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Deparment</Form.Label>
                        <Select
                          onChange={handleDepartmentChange}
                          options={DeparmentOptions}
                          isSearchable={true}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={4}>
                      <Form.Group
                        className="mb-1"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Designation</Form.Label>
                        <Select
                          onChange={handleDesignationtChange}
                          options={DesignationOptions}
                          isSearchable={true}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Is Active</Form.Label>
                        <div className="mb-3">
                          <Form.Check
                            type="checkbox"
                            id="isActiveCheckbox"
                            checked={formData.isActive}
                            onChange={handleCheckboxChange}
                          />
                        </div>
                      </Form.Group>
                    </Col>
                    {/* <Col xs={12} md={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Landline</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="222222222"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              landline: e.target.value,
                            })
                          }
                          autoFocus
                        />
                      </Form.Group>
                    </Col> */}
                  </Row>
                </Tab>
                
                <Tab eventKey="ContactInfo" title="Contact Info">
                  <Row>
                  <Col xs={12} md={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Phone Number 1</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="222222222"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phoneNumber1: e.target.value,
                            })
                          }
                          autoFocus
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Phone Number 2</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="222222222"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phoneNumber2: e.target.value,
                            })
                          }
                          autoFocus
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Tel office</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="222222222"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              teloff: e.target.value,
                            })
                          }
                          autoFocus
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                  <Col xs={12} md={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Tel Residence</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="222222222"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              telres: e.target.value,
                            })
                          }
                          autoFocus
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Fax</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="222222222"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              Fax: e.target.value,
                            })
                          }
                          autoFocus
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Tab>

                {/* Address Info Tab */}
                <Tab eventKey="AddressInfo" title="Address Info">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      className=" mb-2"
                      placeholder="Address line 1"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          addressLine1: e.target.value,
                        })
                      }
                      autoFocus
                    />
                    <Form.Control
                      type="text"
                      placeholder="Address line 2"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          addressLine2: e.target.value,
                        })
                      }
                      autoFocus
                    />
                  </Form.Group>

                  <Row>
                    <Col xs={12} md={4}>
                      <Form.Group
                        className="mb-1"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Country</Form.Label>
                        <Select
                          onChange={handleCountryChange}
                          options={countryOptions}
                          isSearchable={true}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>State</Form.Label>
                        <Select
                          onChange={handleStateChange}
                          options={StateOptions}
                          isSearchable={true}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>City</Form.Label>
                        <Select
                          onChange={handleCityChange}
                          options={CityOptions}
                          isSearchable={true}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Tab>

                {/* Social Info Tab */}
                <Tab eventKey="Social" title="Social">
                  Tab content for Social URL
                </Tab>
              </Tabs>
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
