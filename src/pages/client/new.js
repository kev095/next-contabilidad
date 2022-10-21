import {Form, Grid, Button} from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ClientFormPage() {

  const [client, setClient] = useState({
    document:"",
    name:"",
    lastname:"",
    phone:"",
    email:"",
    businnes_name:""
  })

  const [errors, setErrors] = useState({
    title:"",
    description:""
  });

  const router = useRouter();

  const validate = () => {
    const errors = {}

    if(!client.document)
    {
      errors.document = "document is required.";
    }
    if(!client.name)
    {
      errors.name = "Name is required.";
    }
    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let errors = validate();
    if(Object.keys(errors).length) return setErrors(errors);

    if(router.query.id){
      await updateClient();
      await router.push('/client');
    }else{
      await createClient();
      await router.push('/client');
    }

  }

  const createClient = async() => {
    try {
      await fetch('https://next-contabilidad-wpp.herokuapp.com/api/clients', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(client)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const updateClient = async () => {
    try {
      await fetch('https://next-contabilidad-wpp.herokuapp.com/api/clients/'+router.query.id,{
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(client)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange= (e) => {
    setClient({...client,[e.target.name]: e.target.value}); 
  }

  const getClientId = async () => {
    const res = await fetch('https://next-contabilidad-wpp.herokuapp.com/api/clients/'+router.query.id);
    const data = await res.json();
    setClient({
      document: data.document,
      name: data.name,
      lastname: data.lastname,
      phone: data.phone,
      email: data.email,
      business_name: data.business_name
    })
  }

  useEffect(() =>{
    if(router.query.id){
      getClientId()
    }
  },[])

  return (
    <Grid
    centered
    verticalAlign="middle"
    columns="3"
    style={{height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{router.query.id ? 'Update Client' : 'Create Client'}</h1>
          <Form  onSubmit={handleSubmit}>
            <Form.Input label="N° Documento" placeholder="10771671255" name="document" onChange={handleChange}  error={ errors.document ? { content: "Please enter a document", pointing: "below" } : null} value={client.document}  />
            <Form.Input label="Nombre" placeholder="Kevin" name="name" onChange={handleChange}  error={ errors.name ? { content: "Please enter a name", pointing: "below" } : null} value={client.name}  />
            <Form.Input label="Apellidos" placeholder="Ramos" name="lastname" onChange={handleChange} value={client.lastname}/>
            <Form.Input label="Telefono" placeholder="929091384" name="phone" onChange={handleChange} value={client.phone}/>
            <Form.Input label="Email" placeholder="kevramos95@icloud.com" name="email" onChange={handleChange} value={client.email}/>
            <Form.Input label="Razón Social" placeholder="1Bconnect" name="business_name" onChange={handleChange} value={client.business_name}/>
            <Button primary>
              {router.query.id ? 'Update' : 'Save'}
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}