import React from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import styles from './layout.module.scss'
import Leaderboardtable from '../components/Leaderboardtable';
import { User } from '@src/@types/user';
import API from '../api';


type LeaderboardUser = { 
    steamId: string,
    avatar: string,
    username: string,
    credits: number,
    rank: number,
}[]

export default function Leaderboard() {

    const [users, setUsers] = React.useState<LeaderboardUser | undefined>(undefined);

    const getUsers = async () => {
        try {
            const response = await API.get('/leaderboard');

            const data = response.data;
            if (response.status === 200) {
                setUsers(data.users);
            }
        } catch (error) {
        }

    }

    React.useEffect(() => {
        getUsers();
    }, [])

    return (
        <Container maxWidth="md" >
            <Box className={styles.boxcontainer}>
                <Leaderboardtable users={users} />
            </Box>
        </Container>
    )

}
