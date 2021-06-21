import { Grid } from "@material-ui/core";
import { Button, LinearProgress } from "@material-ui/core";
import { useState } from "react";
import Chat from "../Chat/Chat";
import Loader from "../Loader";
// import firebase, { analytics, auth, firestore, storage } from ".../firebase";

const DetailModal = ({open, isChattingDefault, setParentIsChatting}) => {
    const [isLoading, setLoadingState] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isChatting, setIsChatting] = useState(isChattingDefault);

    if (!isLoading && open && !userData && !isChatting) {
        setLoadingState(true);
        //API로 추가적 정보 로드
        setTimeout(() => {
            setUserData({
                username: '***',
                type: 'A',
                detail: '추가적으로 끌어올 데이터',
                photo: 'https://mblogthumb-phinf.pstatic.net/20161004_87/by267_1475545735829x3bvR_JPEG/%BC%AD%BF%EF%B4%EB%C7%D0%B1%B3%B7%CE%B0%ED-06.jpg?type=w800'
            })
            setLoadingState(false);
        }, 3000);
    }

    if (!open && isChatting) {
        setIsChatting(false);
        setParentIsChatting(false);
    }

    return <div className="card-modal center">
        {isLoading && <div>사용자 데이터를 불러오는 중입니다 .. <LinearProgress /></div>}
        
        {isChatting && <Chat />}

        {!isLoading && !isChatting && 
            <Grid container>

                <Grid item xs={6} className="center">
                    <img className="modal-img" src={userData?.photo} />
                    <h2>{userData?.username}</h2>
                    <h2>{userData?.type}</h2>
                </Grid>

                <Grid item xs={6} className="center">
                    <h1>"한마디"</h1>
                    <ul>
                        {[1,2,3,4].map(num => <li>설명{num}입니다. 설명{num} 블라블라</li>)}
                    </ul>
                    <Button onClick={() => setIsChatting(true)} variant="outlined" color="primary">Start Chat</Button>
                </Grid>
            </Grid>}

    </div>
}

export default DetailModal;