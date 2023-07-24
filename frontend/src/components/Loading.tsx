import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styles from './loading.module.scss';

type Props = {
    box?: boolean;
    children?: React.ReactNode;
}

export default function Loading({ box, children }: Props) {
    return (
        <div className={box ? `${styles.boxed}` : ''}>
            <Box sx={{ display: 'flex' }}>
                <div className="children-loader" >
                    {children}
                </div>
                <CircularProgress className={styles['circle']} sx={{
                    'circle': {
                        color: '#fff'
                    }
                }} />
            </Box>
        </div>
    )
}