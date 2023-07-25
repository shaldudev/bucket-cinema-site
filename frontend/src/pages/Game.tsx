import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import API from '../api';
import React from 'react';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 3,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

type Progress = {
    currValue: number
    minValue: number
    maxValue: number
    speed: number
    increment: number
}

export default function Game() {

    const [progress, setProgress] = React.useState<Progress | null>(null);
    const [interval, setInt] = React.useState<NodeJS.Timer | null>(null);

    const getProgress = async () => {
        try {
            const response = await API.get(`/game/progress`);
            if (response.status === 200) {
                setProgress(response.data.progress);
            }
        } catch (error) {

        }
    }

    React.useEffect(() => {

        if (!progress || interval !== null) {
            if (!progress) {
                getProgress();
            }
            return;
        };

        setInt(setInterval(() => {

            //add increment to currValue every tick of the interval once the value is max value set it to min value and continue
            setProgress((prev) => {
                if (prev) {
                    if ((prev?.currValue) >= prev?.maxValue) {
                        return {
                            ...prev,
                            currValue: prev?.minValue ?? 0
                        }
                    }
                    return {
                        ...prev,
                        currValue: (prev?.currValue ?? 0) + ((prev?.increment ?? 0) / 10)
                    }
                } else {
                    return prev;
                }
            });

        }, progress.speed * 100));

    }, [progress, interval]);


    const normalise = (value: number) => ((value - (progress?.minValue ?? 0)) * 100) / (progress?.maxValue ?? 100 - (progress?.minValue ?? 0));

    return (
        <>
            <BorderLinearProgress variant="determinate" value={normalise(progress?.currValue ?? 0)} />
        </>
    )

}