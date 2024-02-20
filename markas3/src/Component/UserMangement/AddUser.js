import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import defaultImage from "./HPz3fFn.png";
import DatePicker from "react-datepicker";
import Select from "react-select";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
// import * as Yup from "yup";
// import { ToastContainer, toast } from "react-toastify";
// import * as formik from "formik";

const AddUser = ({ show, setShow }) => {
  const handleClose = () => setShow(false);

  const [image, setImage] = useState({
    // Image State object
    placeholderUrl: defaultImage,
    imageData: null,
  });

  const formatToDDMMYYYY = (dateString) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const year = dateObject.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [errors, setErrors] = useState({});
   
  const [formData, setFormData] = useState({
    //Formdata object
    firstname: "",
    lastName: "",
    phoneNumber1: 0,
    phoneNumber2: 0,
    teloff: "",
    telres: "",
    Fax: "",
    category: "",
    emailId1: "",
    emailId2: "",
    userName: "",
    isActive: false,
    department: "",
    dob: "",
    designation: "",
    businessAddressLine1: "",
    businessAddressLine2: "",
    businessAddressLine3: "",
    homeaddressLine1: "",
    homeaddressLine2: "",
    homeaddressLine3: "",
    businessCity: "",
    businessState: "",
    businessZipCode: 0,
    businessCountry: "",
    homeCity: "",
    homeState: "",
    homeZipCode: 0,
    homeCountry: "",
    linkdinUrl: "",
    facebookUrl: "",
    twitterUrl: "",
    teams: "",
  });

  // const FormValidationSchema = Yup.object({
  //   firstName: Yup.string().required(),
  //   lastName: Yup.string().required(),
  //   emailId1: Yup.string().required().email(),
  //   phoneNumber1: Yup.string()
  //     .matches(/^\d{10}$/)
  //     .required(),
  //   dob: Yup.date().required(),
  // });
  
  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstname) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.emailId1) {
      newErrors.email = "Email is required";
    }
    if (!formData.phoneNumber1) {
      newErrors.phoneNumber = "Phone number is required";
    } 
    // else if (!isValidPhoneNumber(formData.phoneNumber)) {
    //   newErrors.phoneNumber = "Phone number must be 10 digits";
    // }
    // if (!formData.gender) {
    //   newErrors.gender = "Gender is required";
    // }
    // if (formData.interests.length === 0) {
    //   newErrors.interests = "Select at least one interest";
    // }
    if (!formData.birthDate) {
      newErrors.birthDate = "Date of birth is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = () => {
  //   if (formData.firstname) {
  //     console.log();
  //     toast.success("submited succesfully");
  //   } else {
  //     toast.error("please fill required fields");
  //   }
  // };

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

  // const StateOptions = [
  //   { value: "ny", label: "New York" },
  //   { value: "ca", label: "California" },
  //   { value: "tx", label: "Texas" },
  //   { value: "fl", label: "Florida" },
  //   { value: "il", label: "Illinois" },
  //   { value: "dl", label: "Delhi" },
  //   { value: "mh", label: "Maharashtra" },
  //   { value: "tn", label: "Tamil Nadu" },
  //   { value: "up", label: "Uttar Pradesh" },
  //   { value: "wb", label: "West Bengal" },
  // ];
  // const CityOptions = [
  //   { value: "nyc", label: "New York City" },
  //   { value: "alb", label: "Albany" },
  //   { value: "buf", label: "Buffalo" },
  //   { value: "la", label: "Los Angeles" },
  //   { value: "sf", label: "San Francisco" },
  //   { value: "sd", label: "San Diego" },
  //   { value: "dl", label: "Delhi" },
  //   { value: "mh", label: "Maharashtra" },
  //   { value: "tn", label: "Tamil Nadu" },
  //   { value: "up", label: "Uttar Pradesh" },
  //   { value: "wb", label: "West Bengal" },
  // ];

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
      // toast.error("Invalid File !");
      image.imageData = null;
    }
  };

  console.log(errors);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      console.log("Form Submitted", formData);
      // toast.success("Form submitted")
    } else {
      console.log("Form Validation Failed");
      // toast.error("errorr")
    }
  };

  const handleBusinessCountryChange = (selectedOption) => {
    // Update the formData state with the selected country value
    setFormData({
      ...formData,
      businessCountry: selectedOption.value,
    });
  };

  const handleHomeCountryChange = (selectedOption) => {
    // Update the formData state with the selected country value
    setFormData({
      ...formData,
      homeCountry: selectedOption.value,
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
  // const { Formik } = formik;

  return (
    <>
      <Modal
        size="lg"
        show={show}
        dialogClassName="modal-dialogcentered"
        onHide={handleClose}
      >  
      <Form onSubmit={handleSubmit}>
        {/* <Formik
            validationSchema={FormValidationSchema}
            onSubmit={console.log}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}> */}

        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Scrollbar style={{ width: 250, height: 250 }}>      */}
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
                            <Form.Label>Work Email Id</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="name@example.com"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  emailId1: e.target.value,
                                })
                              }
                              autoFocus
                            />
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={4}>
                          <Form.Group
                            className="mb-1"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>
                              Personal Email Id{" "}
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="name@example.com"
                              required
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  emailId2: e.target.value,
                                })
                              }
                              autoFocus
                            />
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={4}>
                          <Form.Group
                            className="mb-1"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>
                              User Name <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="name@example.com"
                              required
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  userName: e.target.value,
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
                            <Form.Label>
                              First Name <span className="text-danger">*</span>
                            </Form.Label>
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
                            {errors.firstName && <div className="error">{errors.firstName}</div>}
                            <Form.Control.Feedback type="invalid">
                              {errors.firstName}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={4}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>
                              Last Name <span className="text-danger">*</span>
                            </Form.Label>
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
                        <Col xs={12} md={4}>
                          <Form.Group
                            className="mb-1"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>
                              Date of Birth{" "}
                              <span className="text-danger">*</span>
                            </Form.Label>

                            <Form.Control
                              type="date"
                              // value={formData.dob}
                              required
                              onChange={(e) => {
                                const formattedDate = formatToDDMMYYYY(
                                  e.target.value
                                );
                                setFormData({
                                  ...formData,
                                  dob: formattedDate,
                                });
                              }}
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
                            <Form.Label>Category</Form.Label>
                            <Select
                              onChange={handleCategoryChange}
                              options={CategoryOptions}
                              isSearchable={true}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={4}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Deparment </Form.Label>
                            <Select
                              onChange={handleDepartmentChange}
                              options={DeparmentOptions}
                              isSearchable={true}
                              required
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
                            <Form.Label>
                              Designation<span className="text-danger">*</span>
                            </Form.Label>
                            <Select
                              onChange={handleDesignationtChange}
                              options={DesignationOptions}
                              isSearchable={true}
                              required
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
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                              type="text"
                              required
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  phoneNumber1: parseInt(e.target.value),
                                })
                              }
                              
                            />
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={4}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Alt. Contact Number</Form.Label>
                            <Form.Control
                              type="text"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  phoneNumber2: parseInt(e.target.value),
                                })
                              }
                              
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
                      <Row>
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
                      </Row>
                    </Tab>

                    {/* Address Info Tab */}
                    <Tab eventKey="AddressInfo" title="Address Info">
                      <Row>
                        <Col xs={12} md={6}>
                          <Form.Label className=" mb-2">
                            Business Address
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Line 1"
                            className=" mb-2"
                            required
                            value={formData.businessAddressLine1}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                businessAddressLine1: e.target.value,
                              })
                            }
                            autoFocus
                            {...(errors.firstName && (
                              <div className="error">{errors.firstName}</div>
                            ))}
                          />
                        </Col>
                        <Col xs={12} md={6}>
                          <Form.Label>Home Address</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Line 1"
                            className=" mb-2"
                            required
                            value={formData.HomeaddressLine1}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                homeaddressLine1omeaddressLine1: e.target.value,
                              })
                            }
                            autoFocus
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          <Form.Control
                            type="text"
                            placeholder="Line 2"
                            className=" mb-2"
                            required
                            value={formData.businessAddressLine2}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                businessAddressLine2: e.target.value,
                              })
                            }
                            autoFocus
                          />
                        </Col>
                        <Col xs={12} md={6}>
                          <Form.Control
                            type="text"
                            placeholder="Line 2"
                            className=" mb-2"
                            required
                            value={formData.homeaddressLine2}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                homeaddressLine2: e.target.value,
                              })
                            }
                            autoFocus
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          <Form.Control
                            type="text"
                            placeholder="Line 3"
                            className=" mb-2"
                            required
                            value={formData.businessAddressLine3}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                businessAddressLine3: e.target.value,
                              })
                            }
                            autoFocus
                          />
                        </Col>
                        <Col xs={12} md={6}>
                          <Form.Control
                            type="text"
                            placeholder="Line 3"
                            className=" mb-2"
                            required
                            value={formData.homeaddressLine3}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                homeaddressLine3: e.target.value,
                              })
                            }
                            autoFocus
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          <Form.Control
                            type="text"
                            placeholder="City"
                            required
                            value={formData.businessCity}
                            className=" mb-2"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                businessCity: e.target.value,
                              })
                            }
                            autoFocus
                          />
                        </Col>
                        <Col xs={12} md={6}>
                          <Form.Control
                            type="text"
                            placeholder="City"
                            required
                            value={formData.homeCity}
                            className=" mb-2"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                homeCity: e.target.value,
                              })
                            }
                            autoFocus
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          <Form.Control
                            type="text"
                            placeholder="State"
                            required
                            value={formData.businessState}
                            className=" mb-2"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                businessState: e.target.value,
                              })
                            }
                            autoFocus
                          />
                        </Col>
                        <Col xs={12} md={6}>
                          <Form.Control
                            type="text"
                            placeholder="State"
                            required
                            value={formData.homeState}
                            className=" mb-2"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                homeState: e.target.value,
                              })
                            }
                            autoFocus
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          <Form.Control
                            type="number"
                            placeholder="Zip Code"
                            required
                            className=" mb-2"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                businessZipCode: e.target.value,
                              })
                            }
                            autoFocus
                          />
                        </Col>
                        <Col xs={12} md={6}>
                          <Form.Control
                            type="number"
                            placeholder="Zip Code"
                            required
                            className=" mb-2"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                homeZipCode: e.target.value,
                              })
                            }
                            autoFocus
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          <Select
                            onChange={handleBusinessCountryChange}
                            placeholder="Country"
                            options={countryOptions}
                            isSearchable={true}
                          />
                        </Col>
                        <Col xs={12} md={6}>
                          <Select
                            onChange={handleHomeCountryChange}
                            options={countryOptions}
                            placeholder="Country"
                            isSearchable={true}
                          />
                        </Col>
                      </Row>
                    </Tab>

                    {/* Social Info Tab */}
                    <Tab eventKey="Social" title="Social">
                      <Row>
                        <Col xs={12} md={6}>
                          <Form.Group
                            className="mb-1"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Facebook Url</Form.Label>
                            <Form.Control
                              type="text"
                              className=" mb-2"
                              placeholder="Facebook Url"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  facebookUrl: e.target.value,
                                })
                              }
                              autoFocus
                            />
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>LinkedIn Url</Form.Label>
                            <Form.Control
                              type="text"
                              className=" mb-2"
                              placeholder="LinkedIn Url"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  linkdinUrl: e.target.value,
                                })
                              }
                              autoFocus
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Twitter</Form.Label>
                            <Form.Control
                              type="text"
                              className=" mb-2"
                              placeholder="twitter"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  twitterUrl: e.target.value,
                                })
                              }
                              autoFocus
                            />
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Teams</Form.Label>
                            <Form.Control
                              type="text"
                              className=" mb-2"
                              placeholder="Teams"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  teams: e.target.value,
                                })
                              }
                              autoFocus
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Tab>
                  </Tabs>
                </Container>
          
          {/* </Scrollbar> */}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button  type="submit">Save Changes</Button>
        </Modal.Footer>
         </Form>
      </Modal>
    </>
  );
};

export default AddUser;
