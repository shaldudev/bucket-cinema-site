import { Card, Paper } from '@mui/material';
import React, { useState } from 'react';
import styles from './lootbox.module.scss'
type emojiList =
    {
        emoji: string,
        value: number,
        chance: number,
    }


const emojisTable: emojiList[] = [
    {
        emoji: "🍌",
        value: 1,
        chance: 10,
    },
    {
        emoji: "🍎",
        value: 2,
        chance: 2,
    },
    {
        emoji: "🍇",
        value: 3,
        chance: 1,
    },
    {
        emoji: "🍉",
        value: 4,
        chance: 1,
    },
    {
        emoji: "🍓",
        value: 5,
        chance: 1,
    },
]

export default function Lootbox() {
    const [isOpen, setIsOpen] = useState(false);

    let actualEmojiTable: emojiList[] = [];

    for (let i = 0; i < 100; i++) {
        const randomEmoji = emojisTable[Math.floor(Math.random() * emojisTable.length)];
        actualEmojiTable.push(randomEmoji);
    }

    const resetLootbox = () => {
        // Reset the lootbox state to closed.
        setIsOpen(false);
    };

    return (
        <div className="lootbox">
            <div className={`${styles['card-wrapper-wrapper']}`}>
                <div className={`${styles['card-wrapper']} card-container d-flex`}>
                    {actualEmojiTable.map((emoji, key) => (
                        <Paper className={`${styles['card']}`} elevation={12} key={key}>
                            {emoji.emoji}
                        </Paper>
                    ))}
                </div>

            </div>

            <div className={`${styles['stopper']}`}>


            </div>
        </div>
    );
};
