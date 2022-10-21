import { Error } from "next/error";
import { useRouter } from "next/router";
import { useState } from "react";
import { Grid, Button, Confirm } from "semantic-ui-react";

export default function AmountDetail({amount}) {
  console.log("jijji",amount)
  const {query, push} = useRouter();

  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);
  

  const deleteAmount = async () =>{
    const {id} = query;
    try {
      await fetch(`https://next-contabilidad-wpp.herokuapp.com/api/amounts/${id}`,{
        method: "DELETE",
      })
    } catch (error) {
      console.error(error)
    }

  }


  const handleDelete = () => {
    setIsDeleting(true);
    deleteAmount();
    close();
    push("/amount");
  }



  return (
    <Grid centered verticalAlign="middle" columns="1" style={{height: "80vh"}}>
      <Grid.Row>
        <Grid.Column textAlign="center">

          <p>Nombre: {amount.client.name}</p>
          <p>Apellido: {amount.client.lastname}</p>
          <p>Razón social: {amount.client.business_name}</p>
          <p>Monto: {amount.monto}</p>
          <div>
            <Button color="red" onClick={open} loading={isDeleting}>
              Eliminar
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Confirm open={confirm} onConfirm={handleDelete} onCancel={close} header="Please confirm" content="Estas seguro de eliminar la deuda?"></Confirm>
    </Grid>
  )
}

export async function getServerSideProps({query: {id}}){
  const res = await fetch(`https://next-contabilidad-wpp.herokuapp.com/api/amounts/${id}`)

  if(res.status === 200){
    const amount = await res.json()
    console.log(amount);
    return{
      props:{
        amount
      }
    }
  }


}