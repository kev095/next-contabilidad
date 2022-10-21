import { Button, Container, Grid} from "semantic-ui-react";
import { Table} from 'semantic-ui-react'
import { useRouter } from "next/router";


export default function ClientPage({clients, error}) {
  
  const {query, push} = useRouter();

  if(clients.length === 0) return(
    <Grid centered verticalAlign="middle" columns={1} style={{height: "80vh"}}>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>The are no clients yet</h1>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )

  //Render a list of clients
  return (
    <Container>
    <br></br>
    <div style={{height: "7vh" }}>
    <h1 >Registro de Clientes</h1>
    <Button color="green" onClick={() => {push('/client/new')}}>Añadir Nuevo cliente</Button>
    </div>
    <br></br>

    <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>N° Documento</Table.HeaderCell>
        <Table.HeaderCell>Nombre</Table.HeaderCell>
        <Table.HeaderCell>Apellidos</Table.HeaderCell>
        <Table.HeaderCell>Telefono</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Razón Social</Table.HeaderCell>
        <Table.HeaderCell>Opción</Table.HeaderCell>
     
      </Table.Row>
    </Table.Header>

    <Table.Body>
        {clients.map( (client) => (
            <Table.Row key={client._id}>
                <Table.Cell>{client.document}</Table.Cell>
                <Table.Cell>{client.name}</Table.Cell>
                <Table.Cell>{client.lastname}</Table.Cell>
                <Table.Cell>{client.phone}</Table.Cell>
                <Table.Cell>{client.email}</Table.Cell>
                <Table.Cell>{client.business_name}</Table.Cell>
                <Table.Cell>
                    <div>
                    <Button size='mini' color="yellow" icon="edit" onClick={() => push(`/client/${client._id}/edit`)}></Button>
                    <Button size='mini' color="red" icon="delete" onClick={() => push(`/client/${client._id}`)}></Button>
                    </div>
                </Table.Cell>
            </Table.Row>
        ))
        }

    </Table.Body>
  </Table>
    </Container>
  )
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch("https://next-contabilidad-wpp.herokuapp.com/api/clients");
  if(res.status === 200){
    const clients = await res.json();
    return{
      props: {
        clients,
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