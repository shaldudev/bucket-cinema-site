
type Props = {
    credits: number | string;
}

export default function CreditDisplay({ credits }: Props) {

    //format the credits to a string with a ' every 3 digits
    const creditsFormated = credits.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");

    return (
        <>{creditsFormated}</>
    )
}