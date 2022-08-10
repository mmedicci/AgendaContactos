import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

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

  const handleAddContact = (event) => {
    event.preventDefault();

    const data = { 
      "name": name,
      "phone": phone, 
      "email": email,
    }
    console.log("data", data);
  
    const response = fetch('http://localhost:4000/contacts/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {"Content-type": "application/json; charset-UTF-8"}
    });

    if (response.ok) {
      console.log("OKS", response.ok);
      fetchAll();
    }
      else
      console.log("ERRO", response);
  }

  function fetchAll() {
    fetch('http://localhost:4000/contacts')
      .then((response) => response.json())
      .then(data => setListContacts(data))
  };

  useEffect(() => {
    fetchAll()
  }, [])

  /*useEffect(() => {
    fetch('http://localhost:4000/contacts')
      .then((response) => response.json())
      .then(data => setListContacts(data))
 
    if (response.ok) {
      console.log("OKS", response.ok);
    }
  });*/
  

  

  return(
    <div className="App">
      <header className="App-header">
        <h1>Agenda de contatos</h1>                
      </header>
    
      <div className="App-body">
        <form onSubmit={handleAddContact} className="form-input" > 
          <div>
            <label>Name: </label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />          
          </div>
          <div>
            <label> Phone: </label>
            <input 
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}               
            />            
          </div>
          <div>
            <label> E-mail: </label>
            <input 
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div> 
          <div className="Botão">
            <button type="submit">Adicionar contato</button> 
          </div>
        </form> 
      </div>
      <table>            
        <thead className="table-col">
          <tr>
            <th>id</th>
            <th>Nome</th>
            <th>Phone</th>
            <th>E-mail</th>
            <th>Opções</th>
          </tr>            
        </thead>           
        <tbody>                
          {listContacts.map((contacts) => {
            return (
              <tr>
                <td>{contacts.id}</td>
                <td>{contacts.name}</td>
                <td>{contacts.phone}</td>
                <td>{contacts.email}</td>
                <td>
                  <button>Atualizar</button>               
                  <button>Excluir</button>
                </td>
              </tr>                                   
            )
          })};                  
        </tbody> 
            
      </table>                     
    </div>
     
  )

}

  

export default App;
