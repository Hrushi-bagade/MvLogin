import React, { useEffect, useState } from "react";
import EditDatapoints from "./EditDatapoints";
import DataTable, { SortOrder } from "react-data-table-component";

import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import Linkshare from "./Linkshare";
import { Col, Container, Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { data } from "./Data";

const Performancetable = () => {
  const [search, setSearch] = useState("");
  const [editDatapointsData, setEditDatapointsData] = useState(null);
  useEffect(()=>{
    console.log("EDITDAATa" ,editDatapointsData)
  },[])

  const handleEditDatapointsData = (data) => {
    debugger
    setEditDatapointsData(data);
    console.log("Data received from EditDatapoints:", data);
  };
  //   const [apiData,setaApidata]=useState("");
  //   const [filterapiData, setFilterApiData] = useState([]);

  const [ShowEditDatapoints, setShowEditDatapoints] = useState(false);
  const handleShowEditDatapoints = () => setShowEditDatapoints(true);
 
  const [ShowLinkShare, setShowLinkShare] = useState(false);
  const handleShowLinkShare = () => setShowLinkShare(true);

  //   const [isChecked, setIsChecked] = useState(false);

  //   const handleToggleChange = (row, checked) => {
  //     const updatedData = filterapiData.map((data) =>
  //       data === row ? { ...data, usrActive: checked ? "Y" : "N" } : data
  //     );
  //     setFilterApiData(updatedData);
  //   };
  //   useEffect(() => {
  //     setFilterApiData(data);
  //   }, []);
  //   async function fetchTableData() {
  //     try {
  //       const response = await fetch(
  //         "http://192.168.1.62/MARKAS_WEBAPICORE/api/UserDetail"
  //       );

  //       // Check if the response is OK
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       // Parse the JSON data from the response
  //       const data = await response.json();

  //       console.log("Table Data ", data[0]);
  //       setaApidata(data);
  //     } catch (error) {
  //       console.error("Error fetching Table data ", error.message);
  //     }
  //   }
  //   useEffect(() => {
  //     fetchTableData();
  //     //  console.log("Table Data ", tableData);
  //   }, []);

  //   useEffect(() => {
  //     const result = apiData.filter((data) => {
  //       return data.usrFullName.toLowerCase().match(search.toLowerCase());
  //     });
  //     setFilterApiData(result);
  //   }, [search]);

  const columns = [
    {
      name: "Company",
      selector: (row) => row.FullName,
      SortOrder: true,
      sortable: true,
      width: "150px", // Adjust the width of the fixed column
      fixed: "left",
    },
    {
      name: "Designation",
      selector: (row) => row.Department,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => row.Designation,
      sortable: true,
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        background: "#001f3f", // Dark blue background for the header
        color: "#fff", // White text color for the header
      },
    },
  };



  return (
    <div className="  p-5 flex flex-wrap">
      <Container>
        <Tabs
          defaultActiveKey="Generic"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="Generic" title="Generic">
            <DataTable
              title="Performance"
              columns={columns}
              data={data}
              fixedHeader
              // pagination
              fixed
              Columns
              fixedHeaderScrollHeight="550px"
              action={
                <button btn btn-info>
                  Export
                </button>
              }
              subHeader
              subHeaderComponent={
                <div className="d-flex justify-content-between">
                  <Row className="mb-3">
                    <Col xs={12} md={2}>
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="form-control"
                        placeholder="Search Datapoints"
                        style={{ marginLeft: "0px" }}
                      />
                    </Col>
                    <Col xs={12} md={4}>
                      <button
                        onClick={handleShowEditDatapoints}
                        className="btn btn-warning ml-2"
                      >
                        Edit Data Points
                      </button>
                    </Col>
                    <Col xs={12} md={2}>
                      <Select
                        // options={yourOptions1}
                        className="mr-2"
                        // Add more props as needed
                      />
                    </Col>
                    <Col xs={12} md={2}>
                      <Select
                        // options={}
                        className="mr-2"
                        // Add more props as needed
                      />
                    </Col>
                    <Col xs={12} md={2}>
                      <FontAwesomeIcon
                        icon={faShareAlt}
                        onClick={handleShowLinkShare}
                        className="text-primary mr-2"
                        style={{ cursor: "pointer" }}
                      />
                    </Col>
                  </Row>
                </div>
              }
              scrollX
              scrollY
              customStyles={customStyles}
              responsive // Enable responsiveness for smaller screens
              striped // Add Bootstrap striped class for alternating row colors
              highlightOnHover // Add Bootstrap hover effect
            />
            <EditDatapoints
              ShowEditDatapoints={ShowEditDatapoints}
              setShowEditDatapoints={setShowEditDatapoints}
              onEditDatapointsData={handleEditDatapointsData}
              editDatapointsData={editDatapointsData}
            />
            <Linkshare
              ShowLinkShare={ShowLinkShare}
              setShowLinkShare={setShowLinkShare}
            />
          </Tab>
          <Tab eventKey="Momentum" title="Momentum">
            <DataTable
              title="Performance"
              columns={columns}
              data={data}
              fixedHeader
              // pagination
              fixed
              Columns
              fixedHeaderScrollHeight="550px"
              action={
                <button btn btn-info>
                  Export
                </button>
              }
              subHeader
              subHeaderComponent={
                <div className="d-flex justify-content-between">
                  <Row className="mb-3">
                    <Col xs={12} md={2}>
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="form-control"
                        placeholder="Search Datapoints"
                        style={{ marginLeft: "0px" }}
                      />
                    </Col>
                    <Col xs={12} md={4}>
                      <button
                        onClick={handleShowEditDatapoints}
                        className="btn btn-warning ml-2"
                      >
                        Edit Data Points
                      </button>
                    </Col>
                    <Col xs={12} md={2}>
                      <Select
                        // options={yourOptions1}
                        className="mr-2"
                        // Add more props as needed
                      />
                    </Col>
                    <Col xs={12} md={2}>
                      <Select
                        // options={}
                        className="mr-2"
                        // Add more props as needed
                      />
                    </Col>
                    <Col xs={12} md={2}>
                      <FontAwesomeIcon
                        icon={faShareAlt}
                        onClick={handleShowLinkShare}
                        className="text-primary mr-2"
                        style={{ cursor: "pointer" }}
                      />
                    </Col>
                  </Row>
                </div>
              }
              scrollX
              scrollY
              customStyles={customStyles}
              responsive // Enable responsiveness for smaller screens
              striped // Add Bootstrap striped class for alternating row colors
              highlightOnHover // Add Bootstrap hover effect
            />
            <EditDatapoints
              ShowEditDatapoints={ShowEditDatapoints}
              setShowEditDatapoints={setShowEditDatapoints}
            />
            <Linkshare
              ShowLinkShare={ShowLinkShare}
              setShowLinkShare={setShowLinkShare}
            />
          </Tab>
          <Tab eventKey="Quality" title="Quality">
            <DataTable
              title="Performance"
              columns={columns}
              data={data}
              fixedHeader
              // pagination
              fixed
              Columns
              fixedHeaderScrollHeight="550px"
              action={
                <button btn btn-info>
                  Export
                </button>
              }
              subHeader
              subHeaderComponent={
                <div className="d-flex justify-content-between">
                  <Row className="mb-3">
                    <Col xs={12} md={2}>
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="form-control"
                        placeholder="Search Datapoints"
                        style={{ marginLeft: "0px" }}
                      />
                    </Col>
                    <Col xs={12} md={4}>
                      <button
                        onClick={handleShowEditDatapoints}
                        className="btn btn-warning ml-2"
                      >
                        Edit Data Points
                      </button>
                    </Col>
                    <Col xs={12} md={2}>
                      <Select
                        // options={yourOptions1}
                        className="mr-2"
                        // Add more props as needed
                      />
                    </Col>
                    <Col xs={12} md={2}>
                      <Select
                        // options={}
                        className="mr-2"
                        // Add more props as needed
                      />
                    </Col>
                    <Col xs={12} md={2}>
                      <FontAwesomeIcon
                        icon={faShareAlt}
                        onClick={handleShowLinkShare}
                        className="text-primary mr-2"
                        style={{ cursor: "pointer" }}
                      />
                    </Col>
                  </Row>
                </div>
              }
              scrollX
              scrollY
              customStyles={customStyles}
              responsive // Enable responsiveness for smaller screens
              striped // Add Bootstrap striped class for alternating row colors
              highlightOnHover // Add Bootstrap hover effect
            />
            <EditDatapoints
              ShowEditDatapoints={ShowEditDatapoints}
              setShowEditDatapoints={setShowEditDatapoints}
            />
            <Linkshare
              ShowLinkShare={ShowLinkShare}
              setShowLinkShare={setShowLinkShare}
            />
          </Tab>
          <Tab eventKey="Valuation" title="Valuation">
            <DataTable
              title="Performance"
              columns={columns}
              data={data}
              fixedHeader
              // pagination
              fixed
              Columns
              fixedHeaderScrollHeight="550px"
              action={
                <button btn btn-info>
                  Export
                </button>
              }
              subHeader
              subHeaderComponent={
                <div className="d-flex justify-content-between">
                  <Row className="mb-3">
                    <Col xs={12} md={2}>
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="form-control"
                        placeholder="Search Datapoints"
                        style={{ marginLeft: "0px" }}
                      />
                    </Col>
                    <Col xs={12} md={4}>
                      <button
                        onClick={handleShowEditDatapoints}
                        className="btn btn-warning ml-2"
                      >
                        Edit Data Points
                      </button>
                    </Col>
                    <Col xs={12} md={2}>
                      <Select
                        // options={yourOptions1}
                        className="mr-2"
                        // Add more props as needed
                      />
                    </Col>
                    <Col xs={12} md={2}>
                      <Select
                        // options={}
                        className="mr-2"
                        // Add more props as needed
                      />
                    </Col>
                    <Col xs={12} md={2}>
                      <FontAwesomeIcon
                        icon={faShareAlt}
                        onClick={handleShowLinkShare}
                        className="text-primary mr-2"
                        style={{ cursor: "pointer" }}
                      />
                    </Col>
                  </Row>
                </div>
              }
              scrollX
              scrollY
              customStyles={customStyles}
              responsive // Enable responsiveness for smaller screens
              striped // Add Bootstrap striped class for alternating row colors
              highlightOnHover // Add Bootstrap hover effect
            />
            <EditDatapoints
              ShowEditDatapoints={ShowEditDatapoints}
              setShowEditDatapoints={setShowEditDatapoints}
            />
            <Linkshare
              ShowLinkShare={ShowLinkShare}
              setShowLinkShare={setShowLinkShare}
            />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default Performancetable;
