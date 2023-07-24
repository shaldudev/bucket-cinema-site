import { User } from "@src/@types/user"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Typography } from "@mui/material";
import CreditDisplay from "./Creditdisplay";
import RankIcon from "./Rankicon";
import styles from "./leaderboardtable.module.scss"
import Loading from "./Loading";

type Props = {
    users: {
        steamId: string,
        avatar: string,
        username: string,
        credits: number,
        rank: number,
    }[] | undefined;
}

export default function Leaderboardtable({ users }: Props) {
    //if user is not yet set add random entries
    let loading = false;
    if (!users) {
        loading = true;
        users = [];
        for (let i = 0; i < 10; i++) {
            users.push({
                steamId: "",
                avatar: "",
                username: "Loading...",
                credits: 0,
                rank: i + 1,
            })
        }
    }

    const content = (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Player</TableCell>
                        <TableCell></TableCell>
                        <TableCell align="right">Credits</TableCell>
                        <TableCell align="right">Rank</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users?.map((user) => (
                        <TableRow
                            key={user.rank}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell width={100} component="th" scope="row">
                                <a href={`/u/${user.steamId}`} className={styles.link}>
                                    <Avatar alt={user.username} src={user.avatar} variant="rounded" sx={{ width: 75, height: 75 }} />
                                </a>
                            </TableCell>
                            <TableCell align="left" component="th" scope="row">
                                <a href={`/u/${user.steamId}`} className={styles.link}>
                                    <Typography component="div">
                                        {user.username}
                                    </Typography>
                                </a>
                            </TableCell>
                            <TableCell align="right"><CreditDisplay credits={user.credits} /></TableCell>
                            <TableCell align="right"><RankIcon rank={user.rank} className={styles.iconpos} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <>
            {!loading ? content : <Loading box={true}>{content}</Loading>}
        </>
    )

}
