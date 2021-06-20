import { useEffect, useState } from 'react';
import Loader from '../Loader';
import './style.css';
import { Dialog, MessageInput } from './components';

const Chat = ({counterId}) => {

    const [isLoading, setLoadingState] = useState(false);
    const [chatLog, setChatLog] = useState([]);

    useEffect(() => {
        // 내 id, counterId 써서 API call: 대화목록 불러오기
        setLoadingState(true);
        setTimeout(() => {
            //시간 오름차순 정렬 메소드 걸기(안 되어 있으면)
            const fakeLog = [
                {'sender': 'A', 'receiver': 'B', 'message': '안녕하세요', 'time': '오후 3:25'},
                {'sender': 'B', 'receiver': 'A', 'message': '누구세요', 'time': '오후 3:27'},
                {'sender': 'A', 'receiver': 'B', 'message': '뚱인데요', 'time': '오후 3:40'},
            ];
            setChatLog([...fakeLog]);
            setLoadingState(false);
        }, 1000);
    }, []);

    return <div id="chat-container">
        {isLoading ? <Loader message="메시지를 불러오는 중입니다.." /> : <Dialog chatLog={chatLog} counterId={counterId} />}
        {!isLoading && <MessageInput />}
    </div>
}

export default Chat;