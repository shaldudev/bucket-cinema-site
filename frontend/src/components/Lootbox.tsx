import { Button, Card, Paper } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import styles from './lootbox.module.scss'
import UserContext from '../userContext';
type emojiList =
    {
        id: number,
        emoji: string,
        value: number,
        chance: number,
    }


const emojisTable: emojiList[] = [
    {
        id: 0,
        emoji: "🍌",
        value: 1,
        chance: 10,
    },
    {
        id: 1,
        emoji: "🍍",
        value: 2,
        chance: 8,
    },
    {
        id: 2,
        emoji: "🍏",
        value: 2,
        chance: 4,
    },
    {
        id: 3,
        emoji: "🍇",
        value: 3,
        chance: 3,
    },
    {
        id: 4,
        emoji: "🍉",
        value: 4,
        chance: 2,
    },
    {
        id: 5,
        emoji: "🍒",
        value: 5,
        chance: 1,
    },
]

type Result = {
    id: number,
    payout: number,
}

export default function Lootbox() {
    //get this from the backend
    const winner: emojiList = emojisTable[5];

    const [canOpen, setCanOpen] = useState(false);
    const refElm = useRef<HTMLDivElement>(null);
    const [actualEmojiTable, setActualEmojiTable] = useState<emojiList[]>([]);

    const { setCredits, user } = React.useContext(UserContext);

    function loadContent() {
        emojisTable.forEach((emoji) => {
            for (let i = 0; i < emoji.chance; i++) {
                actualEmojiTable.push(emoji);
            }
        });
        // Shuffle array
        actualEmojiTable.sort(() => Math.random() - 0.5);
        //get the 4th last element of the array and replace it with the winner
        actualEmojiTable[actualEmojiTable.length - 4] = winner;

        setActualEmojiTable([...actualEmojiTable]);
    }

    function startLootbox() {
        if (canOpen) {
            refElm.current?.classList.remove(styles['active']);
            setTimeout(() => {
                refElm.current?.classList.add(styles['active']);
                setCanOpen(false);
                loadContent();
                setTimeout(() => {
                    receivePayout();
                    resetLootbox();
                }, 10000);
            }, 50);
        }
    }

    function resetLootbox() {
        setCanOpen(true);
    }

    function receivePayout() {
        setCredits((user?.credits ?? 0) + 200);
    }

    useEffect(() => {
        setCanOpen(true);
    }, []);



    return (
        <div className="lootbox">

            <div>

                <div className={`${styles['card-wrapper-wrapper']}`}>
                    <div ref={refElm} className={`${styles['card-wrapper']} card-container d-flex`}>
                        {actualEmojiTable.map((emoji, key) => (
                            <Paper className={`${styles['card']}`} elevation={6} key={key}>
                                {emoji.emoji}
                            </Paper>
                        ))}
                    </div>

                </div>
                <div className={`${styles['stopper']}`}>


                </div>

                <Button variant="contained" onClick={() => startLootbox()}>Open Lootbox</Button>
            </div>


        </div>
    );
};
