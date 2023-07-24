import Button from '@mui/material/Button';

export default function Home() {
    const API_URL = process.env.REACT_APP_API_URL;

    return (
        <div>
            <h1>Home</h1>
            <Button variant="contained" href={API_URL + "/user/auth/steam/"}>Auth with steam</Button>
        </div>
    )
}