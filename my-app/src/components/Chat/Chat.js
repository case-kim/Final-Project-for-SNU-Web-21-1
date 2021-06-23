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

        try {
            const chatRooms = await firestore.collection("chatRooms").get();
            chatRooms.forEach(chatRoom => {
                const { participants } = chatRoom.data();

                //이 참여자들이 이미 채팅을 했을 경우
                if (participants.includes(counterId) && participants.includes(currentUser.uid)) {
                    setChatRoomId(chatRoom.id);
                    return;
                }
            });   
        } catch {
            alert('채팅 기록을 로드하는 데 문제가 발생했습니다. 다시 시도해 주세요.');
        }

        //아니면 chatRoom은 그대로 null
        setLoadingState(false);
    }

    const figureCounterName = async () => {
        if (counterId && !counterName) {
            try {
                const counter = firestore.collection("users").doc(counterId);
                setCounterName((await counter.get()).data().username);
            } catch {
                alert('상대방 닉네임을 불러오는 데 실패했습니다. 상대방 이름이 \'상대\'로 표시됩니다.');
                setCounterName('상대');
            }
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
            try {
                const createdChatRoom = await firestore.collection("chatRooms").add(chatRoomData);
                setChatRoomId(createdChatRoom.id);
            } catch {
                alert('채팅 발송에 실패했습니다. 다시 시도해 주세요!');
            }
        } else {
            try {
                await firestore.collection("chatRooms").doc(chatRoomId).update(chatRoomData);
            } catch(e) {
                alert('채팅 발송에 실패했습니다. 다시 시도해 주세요!');
            }
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