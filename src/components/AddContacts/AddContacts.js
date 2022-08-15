import React, { useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { FormContacts } from '../FormContacts/FormContacts'
import './AddContacts.css';
import {useNavigate} from 'react-router-dom';

const AddContacts = () => {

  let navigate = useNavigate();

  const onSubmit = async (contactsData) => {          
    const response = await fetch('http://localhost:4000/contacts/', {
      method: 'POST',
      body: JSON.stringify(contactsData),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    if (response.ok) {
      console.log("adicionou", response.ok)
      navigate('/')
    }           
  }  

  return ( 
    <div className="container-Add"> 
      <h1 className="titulo">ADICIONAR CONTATO</h1>
      <FormContacts 
        onSubmit={(contactsData) => onSubmit(contactsData)}
        button="Adicionar"
      />
    </div>         
  )
}

export { AddContacts }