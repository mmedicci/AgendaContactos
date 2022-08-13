import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import './App.css';

function App() {

  // definição de variáveis 

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [listContacts, setListContacts] =
    useState ([
      {"name":'',
        "phone":'',
        "email":'',    
      }
    ]);
    const [isEditar, setIsEditar] = useState();
    const [search, setSearch] = useState('');

    // Mostrar contatos

  function verContacts() {
    fetch('http://localhost:4000/contacts')
      .then((response) => response.json())
      .then(data => setListContacts(data))
  }

  useEffect(() => {
    verContacts()
  }, [])

  //Adição de contatos

  const handleAddContact = async (e) => {
    e.preventDefault();
    e.target.reset();

    const data = { 
      "name": name,
      "phone": phone, 
      "email": email,
    }
    console.log("data", data);
  
    const response = await fetch('http://localhost:4000/contacts/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    });

    if (response.ok) {
      console.log("Adicionou contato", response.ok);
      verContacts();
    }
      else
      console.log("ERRO", response);
 
  }
  // Editar contato

  const handleEditContact = async (ediContId) => {
    console.log("Editou contato", ediContId)
    await fetch(`http://localhost:4000/contacts/${ediContId}`, {
      method: 'PATCH',
      body: JSON.stringify(name, phone, email),
      headers: {"Acept": "application/jason", "Content-type": "application/json; charset=UTF-8"}
    })
      .then((response) => {
        response.json().then((result) => {
          console.log(result)
          verContacts()
        })
      })
  }

  //Excluir contato

  const handleExcContact = async (excContId) => {
    const response = await fetch(`http://localhost:4000/contacts/${excContId}`, {
      method: 'DELETE'}
    )
      .then(response => {
        response.json().then((result) => {
          console.log(result);
          verContacts();
        })
      })

  };

  return(
    <div className="App">
      <header className="App-header">
        <h1>Agenda de contatos</h1>                
      </header>
    
      <div className="App-body">
        <form onSubmit={handleAddContact} className="form-input" > 
          <div>
            <label>Name </label> <br/>
            <input 
              type="text" 
              value={listContacts.name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome"
            />          
          </div>
          <div>
            <label> Phone </label> <br />
            <input 
              type="text"
              value={listContacts.phone}
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="Telefone"              
            />            
          </div>
          <div>
            <label> E-mail </label> <br />
            <input 
              type="email" 
              value={listContacts.email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e-mail"
            />
          </div>
          <div className="Botão">
            <br />
            <Button type="submit" variant="outline-light">Adicionar</Button> 
          </div>
        </form> 
      </div>
      <Table striped bordered hover variant="dark">            
        <thead className="table-col">
          <tr>
            <th>id</th>
            <th>Nome</th>
            <th>Phone</th>
            <th>E-mail</th>
            <th>Atualizar</th>
            <th>Excluir</th>
          </tr>            
        </thead>           
        <tbody>                
          {listContacts.map(contacts => {
            return (
              <tr key={contacts.id}>
                <td>{contacts.id}</td>
                <td>{contacts.name}</td>
                <td>{contacts.phone}</td>
                <td>{contacts.email}</td>
                <td>
                  <Button onClick={() => handleEditContact(contacts.id)} variant="outline-light">Editar</Button>
                </td>
                <td>               
                  <Button onClick={() => handleExcContact(contacts.id)} variant="outline-danger">Excluir</Button>
                </td>
              </tr>                                   
            )
          })}                  
        </tbody> 
            
      </Table>                     
    </div>     
  )
} 

export default App;
