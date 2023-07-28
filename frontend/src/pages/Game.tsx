import { styled } from '@mui/material/styles';
import API from '../api';
import React from 'react';
import PassiveIncomeProgressbar from '../components/PassiveIncomeProgressbar';
import { Box, Paper, Typography } from '@mui/material';
import CreditDisplay from '../components/Creditdisplay';
import UserContext from '../userContext';
import Lootbox from '../components/Lootbox';


export default function Game() {
    const { user } = React.useContext(UserContext);


    return (
        <>
            <Box component={Paper} padding={2}>
                <Typography variant="h4">Passive Income</Typography>
                <br />
                <PassiveIncomeProgressbar income={user?.income ?? 0} />
            </Box>
            
            <Box component={Paper} padding={2}>
                <Typography variant="h4">Lootbox</Typography>
                <br />
                <Lootbox/>
            </Box>
            
        </>
    )

}