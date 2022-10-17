import {Menu, Container, Button } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";

export const Navbar = () => {

    const router = useRouter()

    return(
        <Menu attached inverted>
            <Container>
                <Menu.Item>
                    <Link href={"/"}>
                    <img src="/favicon.ico" alt=""/>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                <h5>Estudio Farfán</h5>
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item >
                        <Button primary size="mini" onClick={() => router.push('/client')}>
                            Clientes
                        </Button>
                    </Menu.Item>
                    <Menu.Item >
                        <Button  primary size="mini" onClick={() => router.push('/amount')}>
                            Pagos
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>
    )
}