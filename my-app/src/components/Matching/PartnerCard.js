import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './style.css';

const PartnerCard = ({username, type}) => {
    return <div className="card-container">
        <Card className="card" variant="outlined">
            <CardContent>
                <Grid container className="card-body" spacing={3}>
                    <Grid item xs={12} className="card-header">
                        <b>이름: {username}</b>
                        <b>타입: {type}</b>
                    </Grid>
                    <Grid item xs={5}>
                        <img src="https://mblogthumb-phinf.pstatic.net/20161004_87/by267_1475545735829x3bvR_JPEG/%BC%AD%BF%EF%B4%EB%C7%D0%B1%B3%B7%CE%B0%ED-06.jpg?type=w800" />
                    </Grid>

                    <Grid item xs={7}>
                        <h2>혼자서도 매력적인,<br/>뭐시기뭐시기 입니다!</h2>
                        <ul>
                            <li>어쩌구</li>
                            <li>어쩌구</li>
                            <li>어쩌구</li>
                        </ul>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </div>
}

export default PartnerCard;