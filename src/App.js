import React from 'react'
import './App.css';
import CreateBookmark from './components/createBookmark';
import ReadBookmark from './components/readBookmark';
import UpdateBookmark from './components/updateBookmark';
import ReadDocuments from './components/readDocuments'
import CreateDocuments from './components/createDocument';
import UpdateDocuments from './components/updateDocuments';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">

      <div className="main">
        <h2 className="main-header">Nezora APP</h2>
        <Routes>
          <Route path='/bookmark/' element={<ReadBookmark />} />
          <Route path='/bookmark/create' element={<CreateBookmark />} />
          <Route path='/bookmark/update' element={<UpdateBookmark />} />
          <Route path='/documents/' element={<ReadDocuments />} />
          <Route path='/documents/create' element={<CreateDocuments/>} />
          <Route path='/documents/update' element={<UpdateDocuments/>} />
        </Routes>
      </div>

    </div>
  );
}

export default App;