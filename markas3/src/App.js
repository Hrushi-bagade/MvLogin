import './App.scss';
import UserListing from './Component/UserMangement/UserListing';
import { Route, Routes } from "react-router-dom";
import React from 'react';
import ReactDataTable from './Component/UserMangement/DataTable';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<UserListing />} />
        <Route path="/UserData" element={<ReactDataTable />} />
      </Routes>
    </React.Fragment>

  );
}

export default App;
