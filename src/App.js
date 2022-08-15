import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './App.css';
import { 
  BrowserRouter as Router,
  Routes, 
  Route,
  Link,
} from 'react-router-dom';
import { ListContacts } from './components/ListContacts/ListContacts';
import { AddContacts } from './components/AddContacts/AddContacts';
import { EditContacts } from './components/EditContacts/EditContacts';

function App() {


  const [listContacts, setListContacts] =
    useState ([
      {"name":'',
        "phone":'',
        "email":'',    
      }
    ]);
 
  function verContacts() {
    fetch('http://localhost:4000/contacts')
      .then((response) => response.json())
      .then(data => setListContacts(data))
  }

  useEffect(() => {
    verContacts()
  }, [])

  return (      
    <Router>
      <nav className='Menu'>
        <ul id="link">
          <li><Link to="/">Agenda</Link></li>
          <li><Link to="/AddContacts">Adicionar Contato</Link></li>
        </ul>
      </nav>      
   
      <Routes>
        <Route path="/" element={<ListContacts />} />
          <Route path="/verContacts" element={<ListContacts />} />
          <Route path="/addContacts" element={<AddContacts />} />
          <Route path="/contact/:contactsId" element={<EditContacts />} />         

      </Routes>
    </Router>
      
   
      
  )
}

export default App;