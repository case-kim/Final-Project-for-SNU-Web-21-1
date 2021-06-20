import { Button, LinearProgress } from "@material-ui/core";
import { useState } from "react";
import Chat from "../Chat/Chat";
import Loader from "../Loader";

const DetailModal = ({open}) => {
    const [isLoading, setLoadingState] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isChatting, setIsChatting] = useState(false);

    if (!isLoading && open && !userData) {
        setLoadingState(true);
        //API로 추가적 정보 로드
        setTimeout(() => {
            setUserData({
                username: '***',
                type: 'A',
                detail: '추가적으로 끌어올 데이터'
            })
            setLoadingState(false);
        }, 3000);
    }

    if (!open && isChatting) setIsChatting(false);

    return <div className="card-modal">
        {isLoading && <div>사용자 데이터를 불러오는 중입니다 .. <LinearProgress /></div>}
        
        {isChatting && <Chat />}

        {!isLoading && !isChatting && <div>
                기본 데이터 + {userData?.detail}
                <Button onClick={() => setIsChatting(true)}>Start Chat</Button>
            </div>}

    </div>
}

export default DetailModal;