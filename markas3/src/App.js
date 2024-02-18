import './App.scss';
import UserListing from './Component/UserMangement/UserListing';
import { Route, Routes } from "react-router-dom";
import React from 'react';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<UserListing />} />
      </Routes>
    </React.Fragment>

  );
}

export default App;
