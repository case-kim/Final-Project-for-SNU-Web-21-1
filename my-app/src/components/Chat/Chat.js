import { useEffect, useState } from 'react';
import Loader from '../Loader';
import './style.css';
import { Dialog, MessageInput } from './components';
import { auth, firestore } from '../../firebase';

const Chat = ({counterId, counterName}) => {

    const currentUser = auth.currentUser;

    const [isLoading, setLoadingState] = useState(true);
    const [isSending, setSendingState] = useState(false);
    const [chatLog, setChatLog] = useState([]);

    const [chatRoomId, setChatRoomId] = useState(null);
    const [loadedCounterName, setCounterName] = useState(counterName);

    const [listener, setListener] = useState(null);

    const figureChatRoom = async () => {
        const chatRooms = await firestore.collection("chatRooms").get();
        chatRooms.forEach(chatRoom => {
            const { participants } = chatRoom.data();

            //이 참여자들이 이미 채팅을 했을 경우
            if (participants.includes(counterId) && participants.includes(currentUser.uid)) {
                setChatRoomId(chatRoom.id);
                return;
            }
        });

        //아니면 chatRoom은 그대로 null
        setLoadingState(false);
    }

    const figureCounterName = async () => {
        if (counterId && !counterName) {
            const counter = firestore.collection("users").doc(counterId);
            setCounterName((await counter.get()).data().username);
        }
    }

    const sendChat = async (message) => {
        //첫 챗이면 채팅방 만들기(add) 그럼 chatRoomId도 업데이트. 챗룸에 리스너 걸기.
        setSendingState(true);

        const messageInstance = {
            createdAt: Date.now(),
            message,
            from: currentUser.uid,
            isRead: false
        }

        const chatRoomData = {
            participants: [counterId, currentUser.uid],
            messages: [...chatLog, messageInstance],
            lastMessage: messageInstance
        }

        if (!chatRoomId) {
            const createdChatRoom = await firestore.collection("chatRooms").add(chatRoomData);
            setChatRoomId(createdChatRoom.id);
        } else {
            //update 형식
            await firestore.collection("chatRooms").doc(chatRoomId).update(chatRoomData);
        }

        setSendingState(false);
    }

    useEffect(() => {
        figureChatRoom();
        figureCounterName();
    }, [counterId]);

    useEffect(() => {
        if (chatRoomId) {
            
            if (listener) {
                listener();
            }
            let newListener = firestore.collection("chatRooms").doc(chatRoomId).onSnapshot(snapshot => {
                    setChatLog([...snapshot.data().messages]);
                    setLoadingState(false);
            });

            setListener(() => () => {
                newListener();
            });
        }
    }, [chatRoomId]);

    if (!counterId) return <h1>채팅 상대를 선택하세요.</h1>

    return <main>
        {!isLoading && <header><h2>{loadedCounterName}님과의 채팅</h2></header>}
        {isLoading ? <Loader message="메시지를 불러오는 중입니다.." /> : <Dialog chatLog={chatLog} counterId={counterId} counterName={loadedCounterName} />}
        {!isLoading && <MessageInput userId={currentUser.uid} sendChat={sendChat} isSending={isSending} />}
    </main>
}

export default Chat;