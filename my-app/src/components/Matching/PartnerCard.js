import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const PartnerCard = ({username, type}) => {
    return <div>
        <Card variant="outlined">
            <CardContent>
                <h1>
                    이름: {username}
                </h1>

                <h1>
                    타입: {type}
                </h1>
            </CardContent>
        </Card>
    </div>
}

export default PartnerCard;