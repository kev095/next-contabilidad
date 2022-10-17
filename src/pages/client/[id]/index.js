import { Error } from "next/error";
import { useRouter } from "next/router";
import { useState } from "react";
import { Grid, Button, Confirm } from "semantic-ui-react";

export default function ClientDetail({client, error}) {
  const {query, push} = useRouter();

  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);
  

  const deleteClient = async () =>{
    const {id} = query;
    try {
      await fetch(`http://localhost:3000/api/clients/${id}`,{
        method: "DELETE",
      })
    } catch (error) {
      console.error(error)
    }

  }


  const handleDelete = () => {
    setIsDeleting(true);
    deleteClient();
    close();
    push("/client");
  }


  if(error && error.statusCode) return <Error statusCode={error.statusCode} title={error.statusText}/>

  return (
    <Grid centered verticalAlign="middle" columns="1" style={{height: "80vh"}}>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{client.name}</h1>
          <p>{client.lastname}</p>
          <p>{client.phone}</p>
          <p>{client.email}</p>
          <p>{client.business_name}</p>
          <div>
            <Button color="red" onClick={open} loading={isDeleting}>
              Eliminar
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Confirm open={confirm} onConfirm={handleDelete} onCancel={close} header="Please confirm" content="Estas seguro de eliminar la tarea?"></Confirm>
    </Grid>
  )
}

export async function getServerSideProps({query: {id}}){
  const res = await fetch(`http://localhost:3000/api/clients/${id}`)

  if(res.status === 200){
    const client = await res.json()
    return{
      props:{
        client
      }
    }
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid id"
      }
    }
  }
}