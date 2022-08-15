import React, { useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import './FormContacts.css';

const FormContacts = ({ onSubmit, button, editar }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [listContacts, setListContacts] = useState ();
    
    useEffect(() => {
        fetch('http://localhost:4000/contacts')
        .then((response) => response.json())
        .then(data => setListContacts(data))
    }, []);

    useEffect(() => {
        setName(editar?.name);
        setPhone(editar?.phone);
        setEmail(editar?.email);  
    }, [editar]);

    const handleAddContact = async (e) => {
        e.preventDefault();
                
        const data = { 
            "name": name,
            "phone": phone, 
            "email": email,
        }

        if (editar) {
            data.id = editar.id;
        }

        onSubmit(data);
    }         
        
    return (
        <form onSubmit={handleAddContact} className="form-input" > 
          <div>
            <label>Name </label> <br/>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome"
            />          
          </div>
          <div>
            <label> Phone </label> <br />
            <input 
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="Telefone"              
            />            
          </div>
          <div>
            <label> E-mail </label> <br />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e-mail"
            />
          </div>
          <div className="Botão">
            <br />
            <Button type="submit" variant="outline-light">{button}</Button> 
          </div>
        </form> 
    )
}

export { FormContacts }