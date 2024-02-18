import React from 'react'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import AddUser from './AddUser';
const UserListing = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
  
    return (
   <>
    <Button variant="primary" onClick={handleShow}>
      Add User
    </Button>

   <AddUser show={show} setShow={setShow}/>
   </>
    );
}

export default UserListing