import { Avatar, Box, Typography, Card, Paper, Button } from "@mui/material";
import Loading from "../components/Loading";
import styles from './profileheader.module.scss';
import RankIcon from "./Rankicon";
import CreditDisplay from "./Creditdisplay";

type Props = {
    username: string | undefined;
    rank: number | undefined;
    credits: number | undefined;
    avatarUrl: string | undefined;
    steamId: string | undefined;
}

export default function Profileheader({ username, avatarUrl, rank, credits, steamId }: Props) {

    const content = (
        <>
            <Box display={"flex"} height={"75px"} marginBottom={"-10px"} padding={2} paddingTop={"25px"} component={Paper}>
                <div className="row no-gutters w100 justify-content-between">
                    <div className="col-auto">
                        <Typography>Credits: <CreditDisplay credits={credits ?? 0} /></Typography>
                    </div>
                    <div className="col-auto">
                        <RankIcon className={`${styles.rankicon}`} rank={rank ?? 0} />
                    </div>
                </div>
            </Box>


            <Box display={"flex"} component={Paper} padding={2}>
                <div>
                    <Avatar alt={username} src={avatarUrl} sx={{ width: 125, height: 125 }} variant="rounded" />
                    <Button href={`https://steamcommunity.com/profiles/${steamId}`} className={`${styles['steam-profil-button']} no-anim`} variant="contained">Steam Profil</Button>
                </div>
                <div className="row no-gutters w100 justify-content-between pl-4">
                    <div className="col-12 col-sm-auto">
                        <Typography variant="h5">{username}</Typography>
                    </div>

                </div>
            </Box>
        </>
    )

    return (

        <>
            {username ? content : <Loading box={true}>{content}</Loading>}
        </>

    )
}