import React from 'react'
import './App.css';
import CreateBookmark from './components/createBookmark';
import ReadBookmark from './components/readBookmark';
import UpdateBookmark from './components/updateBookmark';
import { Routes, Route } from "react-router-dom";
import ReadMail from './components/readMail';
import CreateMail from './components/createMail';
import UpdateMail from './components/updateMail';

function App() {
  return (
    <div className="App">

      <div className="main">
        <h2 className="main-header">Nezora APP</h2>
        <Routes>
          <Route path='/bookmark/' element={<ReadBookmark />} />
          <Route path='/bookmark/create' element={<CreateBookmark />} />
          <Route path='/bookmark/update' element={<UpdateBookmark />} />
          <Route path='/mails/' element={<ReadMail />} />
          <Route path='/mail/create' element={<CreateMail/>} />
          <Route path='/mail/update' element={<UpdateMail/>} />
        </Routes>
      </div>

    </div>
  );
}

export default App;