import styles from './rankicon.module.scss'

type Props = {
    rank: number;
    className?: string;
}

export default function RankIcon({ rank, className }: Props) {

    const overHundert = rank >= 100;
    const end = rank >= 999

    return (
        <div className={`${styles.rank} ${styles[`r${rank}`]} ${overHundert ? styles.small : ''} ${end ? styles.end : ''} ${className}`}>
            {end ? '999+' : rank}
        </div>
    )
}