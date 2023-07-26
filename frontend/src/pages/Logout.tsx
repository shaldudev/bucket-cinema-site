import { useEffect } from "react"
import Cookies from 'js-cookie';

export default function Logout(){


    useEffect(() => {
        //clear cookie userId and sessionId
        Cookies.remove('sessionid');
        Cookies.remove('userid');
        window.location.href = '/';
        

    }, [])

    return (
        <>
        </>
    )
}