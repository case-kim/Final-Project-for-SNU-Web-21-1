import { Button, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import Chat from "./Chat";
import ChatList from "./ChatList";
import { firestore } from '../../firebase';
import Loader from "../Loader";
import firebase from 'firebase/app';

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
                const counterPic = await firebase.storage().ref(`images/avatars/${counterId}`).getDownloadURL();
                return {...room, counterName, counterPic, counterId}
            });

            const userRoomsWithCounterData = await Promise.all(userRooms);

            setChatList([...userRoomsWithCounterData]);
            setLoadingState(false);
        });
    }

    const getCounterName = async (counterId) => {
        const counterDoc = firestore.collection("users").doc(counterId);
        const counter = await counterDoc.get();
        return counter.data().username;
    }

    useEffect(() => {
        loadList();
    }, []);


    if (isLoading) return <Loader message="채팅 목록을 로드하는 중입니다.."/>
    return <Grid container>

    <Grid item xs={4} className="center">
        <ChatList userId={user.uid} setCurrentCounterId={setCurrentCounterId} chatList={chatList} />
    </Grid>

    <Grid item xs={8} className="center">
        <Chat counterId={currentCounterId} />
    </Grid>
</Grid>
}

export default ChatBoard;