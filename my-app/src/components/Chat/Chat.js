import { useEffect, useState } from 'react';
import Loader from '../Loader';
import './style.css';
import { Dialog, MessageInput } from './components';
import { auth, firestore } from '../../firebase';

const Chat = ({counterId}) => {

    const currentUser = auth.currentUser;

    const [isLoading, setLoadingState] = useState(true);
    const [chatLog, setChatLog] = useState([]);

    const [chatRoomId, setChatRoomId] = useState(null);


    const figureChatRoom = async () => {
        const chatRooms = await firestore.collection("chatRooms").get();
        chatRooms.forEach(chatRoom => {
            const { participants, messages } = chatRoom.data();

            //이 참여자들이 이미 채팅을 했을 경우
            if (participants.includes(counterId) && participants.includes(currentUser.uid)) {
                setChatRoomId(chatRoom.id);
                setChatLog([...messages]);
            }

            //아니면 chatRoom은 null
        });
    }

    const loadChat = () => {

    }
    
    const firstChat = () => {
        //첫 챗에 채팅방 만들기. 그럼 chatRoom도 업데이트. 챗룸에 리스너 걸기.
    }

    const addChat = () => {
        //update 형식
    }

    useEffect(() => {
        figureChatRoom();
    }, []);

    useEffect(() => {
        if (chatRoomId) {
            firestore.collection("chatRooms").doc(chatRoomId).onSnapshot(snapshot => {
                
            });

        }
    }, [chatRoomId]);

    return <div id="chat-container">
        {isLoading ? <Loader message="메시지를 불러오는 중입니다.." /> : <Dialog chatLog={chatLog} counterId={counterId} />}
        {!isLoading && <MessageInput />}
    </div>
}

export default Chat;