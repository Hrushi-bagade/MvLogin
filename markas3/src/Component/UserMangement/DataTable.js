import React, { useEffect, useState } from "react";
import DataTable, { SortOrder } from "react-data-table-component";
import ToggleSwitch from "../../smallComponents/toggleSwitch";
import SwitchToggle from "../../smallComponents/toggleSwitch";
const ReactDataTable = () => {
  const data = [
    {
      FullName: "John Doe",
      Designation: "Manager",
      Department: "Human Resources",
      DOB: "01/01/1990",
      ReapDeEmailID: "john.doe@example.com",
      usrActive: "Y",
      Mobile1: "9876543210",
      ProfileImagePath: "/images/john_doe.jpg",
    },
    {
      FullName: "Jane Smith",
      Designation: "Engineer",
      Department: "Research and Development",
      DOB: "15/05/1985",
      ReapDeEmailID: "jane.smith@example.com",
      usrActive: "Y",
      Mobile1: "1234567890",
      ProfileImagePath: "/images/jane_smith.jpg",
    },
    {
      FullName: "Alex Johnson",
      Designation: "Analyst",
      Department: "Finance",
      DOB: "08/12/1982",
      ReapDeEmailID: "alex.johnson@example.com",
      usrActive: "N",
      Mobile1: "5556667777",
      ProfileImagePath: "/images/alex_johnson.jpg",
    },
    {
      FullName: "Emily Williams",
      Designation: "Marketing Coordinator",
      Department: "Marketing",
      DOB: "20/03/1995",
      ReapDeEmailID: "emily.williams@example.com",
      usrActive: "Y",
      Mobile1: "7890123456",
      ProfileImagePath: "/images/emily_williams.jpg",
    },
    {
      FullName: "Daniel Brown",
      Designation: "IT Specialist",
      Department: "Information Technology",
      DOB: "12/09/1988",
      ReapDeEmailID: "daniel.brown@example.com",
      usrActive: "Y",
      Mobile1: "5678901234",
      ProfileImagePath: "/images/daniel_brown.jpg",
    },
    // ... 15 more objects with similar structure
    {
      FullName: "Sara Johnson",
      Designation: "Accountant",
      Department: "Finance",
      DOB: "25/06/1992",
      ReapDeEmailID: "sara.johnson@example.com",
      usrActive: "Y",
      Mobile1: "3210987654",
      ProfileImagePath: "/images/sara_johnson.jpg",
    },
    {
      FullName: "Michael White",
      Designation: "Software Developer",
      Department: "Information Technology",
      DOB: "18/11/1987",
      ReapDeEmailID: "michael.white@example.com",
      usrActive: "Y",
      Mobile1: "9998887777",
      ProfileImagePath: "/images/michael_white.jpg",
    },
    {
      FullName: "John Doe",
      Designation: "Manager",
      Department: "Human Resources",
      DOB: "01/01/1990",
      ReapDeEmailID: "john.doe@example.com",
      usrActive: "Y",
      Mobile1: "9876543210",
      ProfileImagePath: "/images/john_doe.jpg",
    },
    {
      FullName: "Jane Smith",
      Designation: "Engineer",
      Department: "Research and Development",
      DOB: "15/05/1985",
      ReapDeEmailID: "jane.smith@example.com",
      usrActive: "Y",
      Mobile1: "1234567890",
      ProfileImagePath: "/images/jane_smith.jpg",
    },
    {
      FullName: "Alex Johnson",
      Designation: "Analyst",
      Department: "Finance",
      DOB: "08/12/1982",
      ReapDeEmailID: "alex.johnson@example.com",
      usrActive: "N",
      Mobile1: "5556667777",
      ProfileImagePath: "/images/alex_johnson.jpg",
    },
    {
      FullName: "Emily Williams",
      Designation: "Marketing Coordinator",
      Department: "Marketing",
      DOB: "20/03/1995",
      ReapDeEmailID: "emily.williams@example.com",
      usrActive: "Y",
      Mobile1: "7890123456",
      ProfileImagePath: "/images/emily_williams.jpg",
    },
    {
      FullName: "Daniel Brown",
      Designation: "IT Specialist",
      Department: "Information Technology",
      DOB: "12/09/1988",
      ReapDeEmailID: "daniel.brown@example.com",
      usrActive: "Y",
      Mobile1: "5678901234",
      ProfileImagePath: "/images/daniel_brown.jpg",
    },
    // ... 15 more objects with similar structure
    {
      FullName: "Sara Johnson",
      Designation: "Accountant",
      Department: "Finance",
      DOB: "25/06/1992",
      ReapDeEmailID: "sara.johnson@example.com",
      usrActive: "Y",
      Mobile1: "3210987654",
      ProfileImagePath: "/images/sara_johnson.jpg",
    },
    {
      FullName: "Michael White",
      Designation: "Software Developer",
      Department: "Information Technology",
      DOB: "18/11/1987",
      ReapDeEmailID: "michael.white@example.com",
      usrActive: "Y",
      Mobile1: "9998887777",
      ProfileImagePath: "/images/michael_white.jpg",
    },
  ];
  const [search, setSearch] = useState("");
  const [filterapiData, setFilterApiData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  
  const handleToggleChange = (row, checked) => {
    const updatedData = filterapiData.map((data) =>
      data === row ? { ...data, usrActive: checked ? 'Y' : 'N' } : data
    );
    setFilterApiData(updatedData);
  };
  useEffect(() => {
    setFilterApiData(data);
  }, []);
  


  useEffect(() => {
    const result = data.filter((data) => {
      return data.FullName.toLowerCase().match(search.toLowerCase());
    });
    setFilterApiData(result);
  }, [search]);

  const columns = [
    {
      name: "Full Name",
      selector: (row) => row.FullName,
      SortOrder: true,
      sortable: true,
      width: '150px', // Adjust the width of the fixed column
      fixed: 'left'
    },
    {
      name: "Designation",
      selector: (row) => row.Designation,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => row.Department,
      sortable: true,
    },
    {
      name: "DOB",
      selector: (row) => row.DOB,
      sortable: true,
    },
    {
      name: "Mobile1",
      selector: (row) => row.Mobile1,
      sortable: true,
    },
    {
      name: "ReapDeEmailID",
      selector: (row) => row.ReapDeEmailID,
      sortable: true,
    },
    {
      name: "usrActive",
      width: '100px',
      cell: (row) => (
        <ToggleSwitch checked={row.usrActive === 'Y'} onToggleChange={(checked) => handleToggleChange(row, checked)} />
      )
    },
    {
      name: "Action",
      width: '100px',
      cell: (row) => (
        <button
          className="btn btn-outline-primary "
          onClick={() => {
            alert(row.FullName);
          }}
        >
          {" "}
          Edit
        </button>
      ),
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
      <DataTable
        title="User Mangement"
        columns={columns}
        data={filterapiData}
        fixedHeader
        // pagination
        fixed Columns
        fixedHeaderScrollHeight="550px"
        action={
          <button btn btn-info>
            Export
          </button>
        }
        subHeader
        subHeaderComponent={
          <div className="d-flex justify-content-between">
            <div className="mb-4 mt-0">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control"
                placeholder="Search User"
                style={{ marginLeft: '0px' }}
              />
            </div>
            <div>
              <button style={{ marginLeft: '28px' }} className="btn btn-warning">Add User</button>
            </div>
          </div>
        }
        subHeaderAlign="left"
        scrollX
        scrollY
        customStyles={customStyles}
        responsive // Enable responsiveness for smaller screens
        striped // Add Bootstrap striped class for alternating row colors
        highlightOnHover // Add Bootstrap hover effect
      />
    </div>
  );
};

export default ReactDataTable;
