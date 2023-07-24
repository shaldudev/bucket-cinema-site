import { Avatar, Box, Typography, Card, Paper } from "@mui/material";
import Loading from "../components/Loading";
import styles from './profileheader.module.scss';
import RankIcon from "./Rankicon";
import CreditDisplay from "./Creditdisplay";

type Props = {
    username: string | undefined;
    rank: number | undefined;
    credits: number | undefined;
    avatarUrl: string | undefined;
    
}

export default function Profileheader({ username, avatarUrl, rank, credits }: Props) {

    const content = (
        <Box display={"flex"} component={Paper} padding={2}>
            <Avatar alt={username} src={avatarUrl} sx={{ width: 100, height: 100 }} variant="rounded" />
            <Box ml={4} width={"100%"}>
                <Typography variant="h5" component="div">
                    {username ? username : 'Unknown'}
                </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"end"} width={"100%"}>
                <Box width={"200px"} position={"relative"} className="load-hidden">
                    
                        <Box display={"flex"} marginTop={1} height={"75%"} justifyContent={"space-between"}>
                            <div>Rank:</div>
                            <div><RankIcon rank={rank ?? -1} /></div>
                        </Box>
               
                        <Box  display={"flex"} alignItems={"end"}  justifyContent={"space-between"}>
                            <div>Credits: </div>
                            <div> <CreditDisplay credits={credits ?? 0} /></div>
                        </Box>
                  
                </Box>
                
            </Box>
        </Box>
    )

    return (

        <>
            {username ? content : <Loading box={true}>{content}</Loading>}
        </>

    )
}