import { Avatar, Box, Typography, Card } from "@mui/material";
import Loading from "../components/Loading";
import styles from './profileheader.module.scss';
import RankIcon from "./Rankicon";
import CreditDisplay from "./Creditdisplay";

type Props = {
    username: string | undefined;
    avatarUrl: string | undefined;
}

export default function Profileheader({ username, avatarUrl }: Props) {

    const rank = 1;
    const credit = 2000000000;

    const content = (
        <Box display={"flex"} >
            <Avatar alt={username} src={avatarUrl} sx={{ width: 100, height: 100 }} variant="rounded" />
            <Box ml={4}>
                <Typography variant="h5" component="div">
                    {username ? username : 'Unknown'}
                </Typography>
            </Box>
            <Box display={"flex"}justifyContent={"end"} width={"100%"}>
                <Box width={"200px"} position={"relative"} className="load-hidden">
                    <Typography variant="h5" display={"flex"}>
                        Rank: <RankIcon rank={1} />
                    </Typography>
                    <Typography display={"flex"} position={"absolute"} bottom={"0px"}>
                        Points: <CreditDisplay credits={credit} />
                    </Typography>
                </Box>
                
            </Box>
        </Box>
    )

    return (

        <>
            {username && avatarUrl ? content : <Loading box={true}>{content}</Loading>}
        </>

    )
}