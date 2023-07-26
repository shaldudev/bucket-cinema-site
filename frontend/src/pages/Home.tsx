import Button from '@mui/material/Button';
import UserContext from '../userContext';
import React, { useEffect } from 'react';
import Game from './Game';
import { Container } from '@mui/material';



export default function Home() {
    const { user } = React.useContext(UserContext);
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {


    }, [user]);

    return (
        <Container>
            <h1>Home</h1>

            {user &&
                <>
                    <h2>Welcome {user.username}</h2>
                    <Game />
                </>
            }
            {!user && <Button variant="contained" href={API_URL + "/user/auth/steam/"}>Auth with steam</Button>}

        </Container>
    )
}