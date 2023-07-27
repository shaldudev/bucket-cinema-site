import Button from '@mui/material/Button';
import UserContext from '../userContext';
import React, { useEffect } from 'react';
import Game from './Game';
import { Box, Container, Paper, Typography } from '@mui/material';
import styles from './layout.module.scss';


export default function Home() {
    const { user } = React.useContext(UserContext);
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {


    }, [user]);

    return (
        <Container maxWidth="lg" >
            <Box className={styles.boxcontainer}>
                {user &&
                    <>

                        <Game />
                    </>
                }
                {!user &&

                    <Box component={Paper} padding={2}>
                        <Typography variant="h3">Welcome</Typography>
                        <br />
                        <Typography variant="body1">Please authenticated with Steam to play</Typography>
                        <Button sx={{marginTop: 1}} variant="contained" href={API_URL + "/user/auth/steam/"}>Auth with steam</Button>
                    </Box>
                }
            </Box>
        </Container>
    )
}