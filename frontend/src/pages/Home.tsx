import Button from '@mui/material/Button';

export default function Home() {

    return (
        <div>
            <h1>Home</h1>
            <Button variant="contained" href="http://localhost:3030/user/auth/steam">Auth with steam</Button>
        </div>
    )
}