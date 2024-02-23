import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import AddUser from "./AddUser";
import { Table } from "react-bootstrap";
import { Grid } from "gridjs-react";
const UserListing = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [tableData, setTableData] = useState([{
    FullName:"",
    Department:"",
    Designation: "",
    MobileNumber:"",
    EmailId:""
  }]);
  useEffect(() => {
    async function fetchTableData() {
      try {
        const response = await fetch(
          "http://192.168.1.62/MARKAS_WEBAPICORE/api/UserDetail"
        );

        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the JSON data from the response
        const data = await response.json();

        console.log("Table Data ", data[0]);
        setTableData(data);
      } catch (error) {
        console.error("Error fetching Table data ", error.message);
      }
    }
    fetchTableData();
    //  console.log("Table Data ", tableData);
  }, []);

  return (
    <>
      <div>
        <div className="mt-5 ml-5 mr-5">
          <Button variant="primary" className=" mt-10" onClick={handleShow}>
            Add User
          </Button>
          <Grid
            data={tableData}
            columns={["ID", "Name", "Job Title", "Degree", "Salary"]}
            search={true}
            // pagination={true}
            sort={true}
            resizable={true}
            className={{
              table: "table table-responsive",
            }}
          />
        </div>
        <AddUser show={show} setShow={setShow} />
      </div>
    </>
  );
};

export default UserListing;
