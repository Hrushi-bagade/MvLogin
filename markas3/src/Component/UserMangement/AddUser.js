import React, { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import defaultImage from "./HPz3fFn.png";
import Select from "react-select";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { ToastContainer, toast } from "react-toastify";

const AddUser = ({ show, setShow }) => {
  const handleClose = () => {
    const initialFormData = {
      imageFormData: "",
      firstname: "",
      lastName: "",
      phoneNumber1: NaN,
      phoneNumber2: NaN,
      teloff: "",
      telres: "",
      fax: "",
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
      businessZipCode: null,
      businessCountry: "",
      homeCity: "",
      homeState: "",
      homeZipCode: null,
      homeCountry: "",
      linkdinUrl: "",
      facebookUrl: "",
      twitterUrl: "",
      teams: "",
    };
    setFormData(initialFormData);
    removeImage();
    setErrors({
      imageFormData: "",
      firstname: "",
      lastName: "",
      phoneNumber1: "",
      phoneNumber2: "",
      teloff: "",
      telres: "",
      fax: "",
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
      businessZipCode: "",
      businessCountry: "",
      homeCity: "",
      homeState: "",
      homeZipCode: "",
      homeCountry: "",
      linkdinUrl: "",
      facebookUrl: "",
      twitterUrl: "",
      teams: "",
    });
    setShow(false);
  };

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

  const [errors, setErrors] = useState({
    imageFormData: "",
    firstname: "",
    lastName: "",
    phoneNumber1: null,
    phoneNumber2: null,
    teloff: "",
    telres: "",
    fax: "",
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
    businessZipCode: null,
    businessCountry: "",
    homeCity: "",
    homeState: "",
    homeZipCode: null,
    homeCountry: "",
    linkdinUrl: "",
    facebookUrl: "",
    twitterUrl: "",
    teams: "",
  });

  const [formData, setFormData] = useState({
    //Formdata object
    imageFormData: "",
    firstname: "",
    lastName: "",
    phoneNumber1: NaN,
    phoneNumber2: NaN,
    teloff: "",
    telres: "",
    fax: "",
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
    businessZipCode: null,
    businessCountry: "",
    homeCity: "",
    homeState: "",
    homeZipCode: null,
    homeCountry: "",
    linkdinUrl: "",
    facebookUrl: "",
    twitterUrl: "",
    teams: "",
  });
  const [apiDepartmentData, setApiDepartmentData] = useState([]);   //state for  api data of Department
  const [apiDesignation, setApiDesignationData] =useState([])  //state  for holding the Designation Data from API.
  const [apiCountry,setApiCountryData]=useState([])  //state for   holding the country list from API
  //department fetch Data

  useEffect(() => {
      //department fetch Data
    async function fetchDepartment() {
      try {
        const response = await fetch("http://192.168.1.62/MARKASV3/api/UserMaster/Departments");
  
        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the JSON data from the response
        const data = await response.json();
        
        console.log("Department Data", data.value);
        setApiDepartmentData(data.value);
      } catch (error) {
        console.error("Error fetching Department data ", error.message);
      }
    }
    async function fetchDesignation() {
      try {
        const response = await fetch("http://192.168.1.62/MARKASV3/api/UserMaster/Designations");
  
        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the JSON data from the response
        const data = await response.json();
        
        console.log("Designation Data ", data.value);
        setApiDesignationData(data.value);
      } catch (error) {
        console.error("Error fetching Designation data ", error.message);
      }
    }
    async function fetchCountry() {
      try {
        const response = await fetch("http://192.168.1.62/MARKASV3/api/UserMaster/Geography");
  
        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the JSON data from the response
        const data = await response.json();
        
        console.log("Country Data ", data.value);
        setApiCountryData(data.value);
      } catch (error) {
        console.error("Error fetching Country data ", error.message);
      }
    }
    fetchCountry();
    fetchDepartment();
    fetchDesignation();
    console.log("Api Country Data ",...apiCountry)
  }, []);

  const fileInputRef = useRef(null);

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
    let isValid = true;
    const newErrors = {
      imageFormData: "",
      firstname: "",
      lastName: "",
      phoneNumber1: "",
      phoneNumber2: "",
      teloff: "",
      telres: "",
      fax: "",
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
      businessZipCode: "",
      businessCountry: "",
      homeCity: "",
      homeState: "",
      homeZipCode: "",
      homeCountry: "",
      linkdinUrl: "",
      facebookUrl: "",
      twitterUrl: "",
      teams: "",
    };
    if (!formData.imageFormData) {
      newErrors.imageFormData = "Profile image is required";
      isValid = false;
    }
    if (!formData.firstname) {
      newErrors.firstname = "First name is required";
      isValid = false;
      // console.log("First Name validity ", isValid);
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
      isValid = false;
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
      isValid = false;
    }
    if (!formData.department) {
      newErrors.department = "Department is required";
      isValid = false;
    }
    if (!formData.designation) {
      newErrors.designation = "Designation is required";
      isValid = false;
    }
    if (!formData.userName) {
      newErrors.userName = "Username is required";
      isValid = false;
    }
    if (!formData.isActive) {
      newErrors.isActive = "Is Active check is required";
      isValid = false;
    }
    if (!formData.phoneNumber1) {
      newErrors.phoneNumber1 = "Contact number is required";
      isValid = false;
    } else if (formData.phoneNumber1.toString().length !== 10) {
      console.log("phone1 lenght ", formData.phoneNumber1.toString().length);
      newErrors.phoneNumber1 = "Contact number must be 10 digits";
      isValid = false;
    }
    if (formData.phoneNumber2) {
      if (formData.phoneNumber2.toString().length !== 10) {
        console.log("phone2 lenght ", formData.phoneNumber2.toString().length);
        newErrors.phoneNumber2 = "Contact number must be 10 digits";
        isValid = false;
      }
    }
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.emailId1) {
      if (!emailFormat.test(formData.emailId1)) {
        newErrors.emailId1 = "Invalid Email Format";
        isValid = false;
      }
    }
    if (!formData.emailId2?.trim()) {
      newErrors.emailId2 = "Personal Email is Required";
      isValid = false;
    } else if (!emailFormat.test(formData.emailId2)) {
      newErrors.emailId2 = "Invalid Email Format";
      isValid = false;
    }

    setErrors(newErrors);
    console.log("Error ", errors);
    console.log("Result ", isValid);
    return isValid;
  };

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

  const CategoryOptions = [
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

  //Image Upload Validation
  const handleUpload = (e) => {
    const localFile = e.target.files[0];
    console.log("Local File ", localFile);
    if (
      (localFile.type === "image/jpeg" ||
        localFile.type === "image/png" ||
        localFile.type === "image/jpg" ||
        localFile.type === "image/svg") &&
      localFile.size <= 200 * 1024 // Size limit: 200 KB
    ) {
      const reader = new FileReader();
      reader.onload = (r) => {
        setImage({
          placeholderUrl: r.target.result,
          imageData: e.target.files[0],
        });
        setFormData({
          ...formData,
          imageFormData: e.target.files[0],
        });
      };
      reader.readAsDataURL(localFile);
      setErrors({
        ...errors,
        imageFormData: "",
      });
    } else {
      setImage({
        placeholderUrl: defaultImage,
        imageData: null,
      });
      setFormData({
        ...formData,
        imageFormData: null,
      });
      setErrors({
        ...errors,
        imageFormData:
          (localFile.type === "image/jpeg" ||
            localFile.type === "image/png" ||
            localFile.type === "image/jpg" ||
            localFile.type === "image/svg") &&
          localFile.size <= 100 * 1024
            ? "Image size exceeds 200 KB limit."
            : "Please upload a valid Image file.",
      });
      image.imageData = null;
      resetFileInput();
    }
  };

  const resetFileInput = () => {
    // Reset the value of the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Add leading zero if needed
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const removeImage = () => {
    setImage((prevState) => ({
      ...prevState,
      placeholderUrl: defaultImage,
      imageData: null,
    }));
    setFormData({
      ...formData,
      imageFormData: null,
    });
    resetFileInput();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      // handleSaveChanges(e);
      console.log("Form Submitted", formData);
      toast.success("Form submitted");
    } else {
      console.log("Form Validation Failed",formData);
      toast.error("Form contains validation errors");
    }
  };
  const handleBusinessCountryChange = (selectedOption) => {
    // Update the formData state with the selected country value
    setFormData({
      ...formData,
      businessCountry: selectedOption.gesgeographY_NAME,
    });
  };

  const handleHomeCountryChange = (selectedOption) => {
    // Update the formData state with the selected country value
    setFormData({
      ...formData,
      homeCountry: selectedOption.gesgeographY_NAME,
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
      department: selectedOption.dpsdepartmentname,
    });
  };
  const handleDesignationtChange = (selectedOption) => {
    // Update the formData state with the selected country value
    setFormData({
      ...formData,
      designation: selectedOption.dssdesignationname,
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
        <Form>
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
                      className={`col-3 px-2 py-1 border rounded ${
                        errors.imageFormData ? "border-danger" : ""
                      }`}
                      ref={fileInputRef}
                    />
                    <img
                      src={image.placeholderUrl}
                      alt=""
                      id="profilePicPreview"
                      width={150}
                      height={180}
                      className="mt-3 ml-10 mb-3"
                    />
                    {errors.imageFormData && (
                      <p className=" ml-4 text-danger small mt-1">
                        {errors.imageFormData}
                      </p>
                    )}
                    <span>
                      {" "}
                      <Button
                        size="sm"
                        variant="danger"
                        className=" ml-14"
                        onClick={removeImage}
                      >
                        Remove Image
                      </Button>
                    </span>
                  </Form.Group>
                </Col>
              </Row>
            </Container>

            <Container>
              <Tabs
                defaultActiveKey="Basic Info"
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
                          className={`col-3 px-2 py-1 border rounded ${
                            errors.emailId1 ? "border-danger" : ""
                          }`}
                          placeholder="name@example.com"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              emailId1: e.target.value,
                            })
                          }
                          autoFocus
                        />
                        {errors.emailId1 && (
                          <p className="text-danger small mt-1">
                            {errors.emailId1}
                          </p>
                        )}
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
                          className={`col-3 px-2 py-1 border rounded ${
                            errors.emailId2 ? "border-danger" : ""
                          }`}
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
                        {errors.emailId2 && (
                          <p className="text-danger small mt-1">
                            {errors.emailId2}
                          </p>
                        )}
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
                          className={`col-3 px-2 py-1 border rounded ${
                            errors.userName ? "border-danger" : ""
                          }`}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              userName: e.target.value,
                            })
                          }
                          autoFocus
                        />
                        {errors.userName && (
                          <p className="text-danger small mt-1">
                            {errors.userName}
                          </p>
                        )}
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
                          placeholder="FirstName"
                          className={`col-3 px-2 py-1 border rounded ${
                            errors.firstname ? "border-danger" : ""
                          }`}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstname: e.target.value,
                            })
                          }
                          autoFocus
                        />
                        {errors.firstname && (
                          <p className="text-danger small mt-1">
                            {errors.firstname}
                          </p>
                        )}
                        {/* <Form.Control.Feedback type="invalid">
                          {errors.firstName}
                        </Form.Control.Feedback>*/}
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
                          className={`col-3 px-2 py-1 border rounded ${
                            errors.lastName ? "border-danger" : ""
                          }`}
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
                        {errors.lastName && (
                          <p className="text-danger small mt-1">
                            {errors.lastName}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group
                        className="mb-1"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>
                          Date of Birth <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Control
                          type="date"
                          className={`col-3 px-2 py-1 border rounded ${
                            errors.dob ? "border-danger" : ""
                          }`}
                          // value={formData.dob}
                          max={getCurrentDate()}
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
                        {errors.dob && (
                          <p className="text-danger small mt-1">{errors.dob}</p>
                        )}
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
                          Category <span className="text-danger">*</span>
                        </Form.Label>
                        <Select
                          onChange={handleCategoryChange}
                          className={`border rounded ${
                            errors.category ? "border-danger" : ""
                          }`}
                          options={CategoryOptions}
                          isSearchable={true}
                          required
                          autoFocus
                        />
                        {errors.category && (
                          <p className="text-danger small mt-1">
                            {errors.category}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>
                          Deparment <span className="text-danger">*</span>
                        </Form.Label>
                        <Select
                          onChange={handleDepartmentChange}
                          className={`border rounded ${
                            errors.department ? "border-danger" : ""
                          }`}
                          options={apiDepartmentData}
                          isSearchable={true}
                          required
                          autoFocus
                        />
                        {errors.department && (
                          <p className="text-danger small mt-1">
                            {errors.department}
                          </p>
                        )}
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
                          className={`border rounded ${
                            errors.designation ? "border-danger" : ""
                          }`}
                          options={apiDesignation}
                          isSearchable={true}
                          required
                          autoFocus
                        />
                        {errors.designation && (
                          <p className="text-danger small mt-1">
                            {errors.designation}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>
                          Is Active <span className="text-danger">*</span>
                        </Form.Label>
                        <div className="mb-3">
                          <Form.Check
                            type="checkbox"
                            id="isActiveCheckbox"
                            checked={formData.isActive}
                            required
                            className={`${
                              errors.isActive ? "border-danger" : ""
                            }`}
                            onChange={handleCheckboxChange}
                          />
                        </div>
                        {errors.isActive && (
                          <p className="text-danger small mt-1">
                            {errors.isActive}
                          </p>
                        )}
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
                        <Form.Label>Contact Number <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="number"
                          required
                          className={`col-3 px-2 py-1 border rounded ${
                            errors.phoneNumber1 ? "border-danger" : ""
                          }`}
                          onChange={(e) => {
                            const phoneNumber = parseInt(e.target.value);
                            setFormData({
                              ...formData,
                              phoneNumber1: phoneNumber,
                            });

                            // Custom validation for phone number length
                            // if (e.target.validity.patternMismatch) {
                            //   e.target.setCustomValidity(
                            //     "Phone number must be 10 digits"
                            //   );
                            // } else {
                            //   e.target.setCustomValidity("");
                            // }
                          }}
                        />
                        {errors.phoneNumber1 && (
                          <p className="text-danger small mt-1">
                            {errors.phoneNumber1}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Alt. Contact Number</Form.Label>
                        <Form.Control
                          type="number"
                          className={`col-3 px-2 py-1 border rounded ${
                            errors.phoneNumber2 ? "border-danger" : ""
                          }`}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phoneNumber2: parseInt(e.target.value),
                            })
                          }
                        />
                        {errors.phoneNumber2 && (
                          <p className="text-danger small mt-1">
                            {errors.phoneNumber2}
                          </p>
                        )}
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
                              fax: e.target.value,
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
                        options={apiCountry}
                        isSearchable={true}
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <Select
                        onChange={handleHomeCountryChange}
                        required
                        options={apiCountry}
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
            <Button onClick={handleSubmit}>Save Changes</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddUser;
