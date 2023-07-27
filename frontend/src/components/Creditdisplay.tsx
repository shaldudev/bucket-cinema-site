import CurrencyFrancIcon from '@mui/icons-material/CurrencyFranc';
import { Typography } from '@mui/material';
import { relative } from 'path';

type Props = {
    credits: number | string;
    size?: number;
}

export default function CreditDisplay({ credits, size }: Props) {

    //format the credits to a string with a ' every 3 digits
    const creditsFormated = credits.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");

    return (
        <>
            
                {creditsFormated}
                <CurrencyFrancIcon sx={{ fontSize: size ?? 15, position: "relative", top: -1, left: 2 }} />
  
            
        </>
    )
}