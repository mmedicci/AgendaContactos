import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import './ListContacts.css';
import { useNavigate } from 'react-router-dom';

const ListContacts = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [listContacts, setListContacts] =
        useState ([
            {
                "name":'',
                "phone":'',
                "email":'',
            }
        ]);
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [excluirContact, setExcluirContact] = useState();


    function verContacts() {
        fetch('http://localhost:4000/contacts')
          .then((response) => response.json())
          .then(data => setListContacts(data))
    }
    
    useEffect(() => {
        verContacts()
    }, [])

    const onExcContact = (excContId) => {
        setExcluirContact(excContId);
        setShowModal(true);
    }
    const handleExcContact = async () => {
        const response = await fetch(`http://localhost:4000/contacts/${excluirContact}`, {
          method: 'DELETE',
        })
        .then(response => {
          response.json().then((result) => {
            console.log(result);
            verContacts();
            setShowModal(false);
          }) 
          console.log("Excluiu");
          
        }) 
      };

    return ( 
        <div> 
            <header className="App-header">
                <h1>AGENDA DE CONTATOS</h1>                
            </header>     

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
                                <td className="contacts">{contacts.id}</td>
                                <td>{contacts.name}</td>
                                <td>{contacts.phone}</td>
                                <td>{contacts.email}</td>
                                <td className="contacts">
                                <Button onClick={() => navigate(`/contact/${contacts.id}`)} variant="outline-light">Editar</Button>
                                </td>
                                <td className="contacts">               
                                <Button onClick={() => onExcContact(contacts.id)} variant="outline-danger">Excluir</Button>
                                </td>
                            </tr>                                   
                        )
                    })}                  
                </tbody>   
            </Table>            
            { 
                showModal &&      
                <div className="modal-background">
                    <div className="texto_modal"> 
                        <h4>Quer excluir o contato? </h4> 
                        <div className="botão_modal">
                            <Button onClick={handleExcContact} variant="outline-success">Aceitar</Button> 
                            <Button onClick={() => setShowModal(false)} variant="outline-dark">Cancelar</Button>
                        </div>
                        </div>
                </div>
            }      
        </div>
    )
}

export { ListContacts  }