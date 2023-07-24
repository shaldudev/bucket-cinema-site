import { useParams } from 'react-router-dom';
import React from 'react';
import { User } from '@src/@types/user';
import API from '../api';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import styles from './layout.module.scss'
import Profileheader from '../components/Profilheader';

export default function Profile() {
    const [userProfile, setUserProfile] = React.useState<null | User>(null);
    const { id } = useParams();

    React.useEffect(() => {
        async function getUserProfile() {
            try {
                const response = await API.get(`/user/${id}`);
                if (response.status === 200) {
                    setUserProfile(response.data.user);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUserProfile();

    }, []);

    return (
        <Container maxWidth="md" >
            <Box className={styles.boxcontainer}>
                <Profileheader username={userProfile?.username} avatarUrl={userProfile?.avatar} rank={userProfile?.rank} credits={userProfile?.credits}/>
            </Box>
        </Container>
    )
}