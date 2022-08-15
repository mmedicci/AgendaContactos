import React, { useState, useEffect} from 'react';
import './EditContacts.css';
import { FormContacts } from '../FormContacts/FormContacts'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditContacts = () => {
    
    const [editar, setEditar] = useState();
    const {contactsId} = useParams(); 
    let navigate = useNavigate() ;

    useEffect(() => {     
        fetch(`http://localhost:4000/contacts/${contactsId}`)
          .then((response) => response.json())
          .then((data) => { 
                console.log("atualizando", data);
                setEditar(data)                
            });
    }, [contactsId]);     
    
    const handleEditContact = async (contactsData) => {
        const response = await fetch(`http://localhost:4000/contacts/${contactsData.id}`, {
          method: 'PATCH',
          body: JSON.stringify(contactsData),
          headers: {"Content-type": "application/json; charset=UTF-8"}
        });

        if (response.ok) {
          console.log("Atualizando", response.ok);
          navigate('/');
        }
    }

    return (
        <div className="container-Add"> 
            <h1 className="titulo">EDITAR CONTATO</h1>
            <FormContacts 
                onSubmit={(contactsData) => handleEditContact(contactsData)}
                editar={editar}
                button="Editar"
            />
        </div>       
    )
}

export { EditContacts }