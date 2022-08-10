/*const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [listContacts, setListContacts] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const data = { 
      "name": name,
      "phone": phone, 
      "email": email,
    }
    console.log("data", data);

    const response = await fetch('http://localhost:4000/contacts/', {
      method: 'POST', 
      body: JSON.stringify(data),
      headers: {"Content-type": "application/json; charset-UTF-8"}
    });

    if (response.ok) {
      console.log("OKS", response.ok);
      fetchAll();
    }
    else
    console.log("ERRO");
  }

  function fetchAll() {
    fetch('http://localhost:4000/contacts')
      .then((response) => response.json())
      .then(data => setListContacts(data))
  };

  useEffect(() => {
    fetchAll()
  }, []);

  console.log("LISTA DE CONTATOS", listContacts);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Agenda de contatos</h1>                
      </header>

      <div className="App-body">
        <form onSubmit={handleSubmit} className="form-input" >
          <div>
            <label>Name: </label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />          
          </div>
          <br/>

          <div>
            <label> Phone: </label>
            <input 
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}               
            />            
          </div>
          <br/>

          <div>
            <label> E-mail: </label>
            <input 
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br/> 

          <button type="submit">Adicionar contato</button>
        </form>
      </div>

      <div> 
        {listContacts.map((contacts) => {
          return (
            <li key={contacts.id}>
              {contacts.name}
            </li>            
          )
        })}
      </div>
    </div>        
  );
}*/