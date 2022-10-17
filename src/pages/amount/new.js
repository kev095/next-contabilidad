import {Form, Grid, Button, Select} from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function AmountFormPage({clients}) {

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

  const router = useRouter();

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
      client: data.client,
      monto: data.monto
    })

  }

  useEffect(() =>{
    if(router.query.id){
      console.log(router.query.id)
      getAmountId()
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
          <h1>{router.query.id ? 'Update Monto' : 'Create Monto'}</h1>
          <Form  onSubmit={handleSubmit}>
            <div>
     
            <Select placeholder='Select your country' />

            </div>
            <Form.Input label="Client" name="client" onChange={handleChange} value={amount.client}/>
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