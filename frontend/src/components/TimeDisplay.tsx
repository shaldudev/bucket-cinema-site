import CurrencyFrancIcon from '@mui/icons-material/CurrencyFranc';
import { Typography } from '@mui/material';
import { relative } from 'path';

enum TimeEnum {
    SECONDS = "SECONDS",
    MINUTES = "MINUTES",
    HOURS = "HOURS",
    DAYS = "DAYS",
}

type Props = {
    seconds: number;
    timeEnum?: TimeEnum | string;
    countDownStyle?: boolean;
}

export default function TimeDisplay({ seconds, timeEnum, countDownStyle }: Props) {

    let formatedTime = "";
    if (countDownStyle) {

        if (timeEnum === TimeEnum.MINUTES) {
            const minutes = Math.floor(seconds / 60);
            const secondsLeft = Math.floor(seconds % 60);
            formatedTime = `${minutes < 10 ? "0" + minutes : minutes}:${secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}`;
        }
        else if (timeEnum === TimeEnum.HOURS) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secondsLeft = Math.floor(seconds % 60);
            formatedTime = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}`;
        }
        else if (timeEnum === TimeEnum.DAYS) {
            const days = Math.floor(seconds / 86400);
            const hours = Math.floor((seconds % 86400) / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secondsLeft = Math.floor(seconds % 60);
            formatedTime = `${days < 10 ? "0" + days : days}:${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}`;
        }
        else {
            formatedTime = Math.floor(seconds).toString();
            //leading number
            if (seconds < 10) {
                formatedTime = "0" + formatedTime;
            }
        }
    } else {
        //convert seconds to minutes etc.
        
        if (timeEnum === TimeEnum.MINUTES) {
            const minutes = Math.floor(seconds / 60);
            
            formatedTime = minutes.toString();
        } else if (timeEnum === TimeEnum.HOURS) {
            const hours = Math.floor(seconds / 3600);
            formatedTime = hours.toString();
        }
        else if (timeEnum === TimeEnum.DAYS) {
            const days = Math.floor(seconds / 86400);
            formatedTime = days.toString();
        }
        else {
            formatedTime = seconds.toString();
        }
    }
    return (
        <>
            {formatedTime}
        </>
    )
}