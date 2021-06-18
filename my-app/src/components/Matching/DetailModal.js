import { Button } from "@material-ui/core";
import { useState } from "react";
import Chat from "../Chat/Chat";
import Loader from "../Loader";

const DetailModal = ({open}) => {
    const [isLoading, setLoadingState] = useState(true);
    const [userData, setUserData] = useState(null);
    const [isChatting, setIsChatting] = useState(false);

    if (open && !userData) {
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

    if (!open) setIsChatting(false);

    if (isLoading) return <Loader message="사용자 정보를 로드하는 중입니다.." />
    else if (isChatting) return <Chat />
    else {
        return <div id="card-modal">
        기본 데이터 + {userData.detail}
        <Button onClick={() => setIsChatting(true)}>Start Chat</Button>
        </div>
    }
}

export default DetailModal;