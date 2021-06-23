import { Button, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import Chat from "./Chat";
import ChatList from "./ChatList";
import { firestore } from '../../firebase';
import Loader from "../Loader";
import firebase from 'firebase/app';
import './style.css';

const ChatBoard = () => {

    const user = auth.currentUser;

    const [isLoading, setLoadingState] = useState(true);

    const [currentCounterId, setCurrentCounterId] = useState(null);

    const [chatList, setChatList] = useState([]);

    const loadList = () => {
        //그냥 채팅 전체를 추적하고 있어야 새 챗도 볼 수 있음
        firestore.collection("chatRooms").onSnapshot(async(snapshot) => {
            let userRooms = [];
            snapshot.docs.forEach(room => {
                if (room.data().participants.includes(user.uid)) userRooms.push(room.data());
            });

            userRooms = userRooms.sort((a,b) => b.lastMessage.createdAt - a.lastMessage.createdAt).map(async(room) => {
                const counterId = room.participants.find(p => p !== user.uid);
                const counterName = await getCounterName(counterId);
                let counterPic;

                try {
                    counterPic = await firebase.storage().ref(`images/avatars/${counterId}`).getDownloadURL();
                } catch {
                    counterPic = 'https://i.stack.imgur.com/34AD2.jpg';
                }

                return {...room, counterName, counterPic, counterId}
            });

            const userRoomsWithCounterData = await Promise.all(userRooms);

            setChatList([...userRoomsWithCounterData]);
            setLoadingState(false);
        });
    }

    const getCounterName = async (counterId) => {
        const counterDoc = firestore.collection("users").doc(counterId);
        let counterName;
        try {
            counterName = await counterDoc.get();
            counterName = counterName.data().username;
        } catch(e) {
            counterName = '상대';
        }
        return counterName;
    }

    useEffect(() => {
        loadList();
    }, []);


    if (isLoading) return <Loader message="채팅 목록을 로드하는 중입니다.."/>
    return <div id="container">
        <ChatList userId={user.uid} setCurrentCounterId={setCurrentCounterId} chatList={chatList} />
        <Chat counterId={currentCounterId} />
</div>
}

export default ChatBoard;