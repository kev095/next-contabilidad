import {Form, Grid, Button, Select, Dropdown} from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AmountPage from ".";

export default function AmountFormPage() {

  const [amount, setAmount] = useState({
    document:"",
    name:"",
    lastname:"",
    businnes_name:"",
    client:"",
    monto:""
  })

  const [errors, setErrors] = useState({
    title:"",
    description:""
  });

  const [array, setArray] = useState([])

  const router = useRouter();

  const lessonGroup = [
    { key: 'r', value: 'regular', text: 'Regular lesson' },
    { key: 'wp', value: 'wp', text: 'Weak Point lesson' },
    { key: 'wt', value: 'wt', text: 'World Tour lesson' },
  ]
  
  /*  
  const options = clients.map(client => {
      return {
        key: client._id,
        text: client.name,
        value: client.i_id,
      }
  })
*/
  const validate = () => {
    const errors = {}

    if(!amount.document)
    {
      errors.document = "document is required.";
    }
    if(!amount.name)
    {
      errors.name = "Name is required.";
    }
    return errors;
  }

  const handleSubmit = async (e) => {
    console.log("execuse")
    e.preventDefault();

    if(router.query.id){
      await updateAmount();
      await router.push('/amount');
    }else{
      await createAmount();
      await router.push('/amount');
    }
  }

  const createAmount = async() => {
    console.log(amount);
    try {
      await fetch('http://localhost:3000/api/amounts', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(amount)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const updateAmount = async () => {
    try {
      await fetch('http://localhost:3000/api/amounts/'+router.query.id,{
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(amount)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange= (e) => {
    setAmount({...amount,[e.target.name]: e.target.value}); 
  }

  const getAmountId = async () => {
    const res = await fetch('http://localhost:3000/api/amounts/'+router.query.id);
    const data = await res.json();
    setAmount({
      client: data.client._id,
      name: data.client.name,
      monto: data.monto
    })
   
  }

  const getAllClient = async () => {
    const res = await fetch("http://localhost:3000/api/clients");
    const data = await res.json();
    const options = data.map(client => {
      return {
        key: client._id,
        text: client.name,
        value: client._id,
      }
  })
  setArray(options)
  }

  useEffect( () =>{
       
    if(router.query.id){
      getAmountId()
    }
    getAllClient()
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
          <h1>{router.query.id ? 'Update Monto' : 'Create Monto'}</h1>
          <Form  onSubmit={handleSubmit}>
            <div>
            
            <Dropdown
        placeholder="Elige el cliente"
        search
        selection
        options={array}
        value={amount.client}
        name="client"
        onChange={handleChange}
      />
            </div>
            <Form.Input label="Client" name="client" onChange={handleChange} value={amount.name}/>
            <Form.Input label="Monto" name="monto" onChange={handleChange} value={amount.monto}/>

  
            <Button primary>
              {router.query.id ? 'Update' : 'Save'}
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )

}
export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/clients");
  

    const clients = await res.json();
    return{
      props: {
        clients,
      }
    }
  

}