import { Button, Container, Grid} from "semantic-ui-react";
import { Table} from 'semantic-ui-react'
import { useRouter } from "next/router";


export default function AmountPage({amounts, error}) {
  
  const {query, push} = useRouter();
/*
  if(amounts.length === 0) return(
    <Grid centered verticalAlign="middle" columns={1} style={{height: "80vh"}}>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>The are no amount yet</h1>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
  */
  //Render a list of amounts
  return (
    <Container>
    <br></br>
    <div style={{height: "7vh" }}>
    <h1 >Registro de Deudas</h1>
    <Button color="green" onClick={() => {push('/amount/new')}}>Añadir Nueva Deuda</Button>
    </div>
    <br></br>

    <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>N° Documento</Table.HeaderCell>
        <Table.HeaderCell>Nombre</Table.HeaderCell>
        <Table.HeaderCell>Apellidos</Table.HeaderCell>
        <Table.HeaderCell>Razón Social</Table.HeaderCell>
        <Table.HeaderCell>Monto</Table.HeaderCell>
        <Table.HeaderCell>Opción</Table.HeaderCell>
     
      </Table.Row>
    </Table.Header>
    <Table.Body>
        {amounts.map( (amount) => (
            <Table.Row key={amount._id}>
                <Table.Cell>{amount.client.document}</Table.Cell>
                <Table.Cell>{amount.client.name}</Table.Cell>
                <Table.Cell>{amount.client.lastname}</Table.Cell>
                <Table.Cell>{amount.client.business_name}</Table.Cell>
                <Table.Cell>{amount.monto}</Table.Cell>
                <Table.Cell>
                    <div>
                    <Button size='mini' color="yellow" icon="edit" onClick={() => push(`/amount/${amount._id}/edit`)}></Button>
                    <Button size='mini' color="red" icon="delete" onClick={() => push(`/amount/${amount._id}`)}></Button>
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
  const res = await fetch("http://localhost:3000/api/amounts");
  

    const amounts = await res.json();
    return{
      props: {
        amounts,
      }
    }
  

}