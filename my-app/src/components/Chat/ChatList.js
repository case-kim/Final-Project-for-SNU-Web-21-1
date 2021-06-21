import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { firestore } from '../../firebase';


const ChatList = ({userId, setCurrentCounterId}) => {

    const [chatList, setChatList] = useState([]);

    const loadList = () => {
        //그냥 채팅 전체를 추적하고 있어야 새 챗도 볼 수 있음
        firestore.collection("chatRooms").onSnapshot(snapshot => {
            let userRooms = [];
            snapshot.docs.forEach(room => {
                if (room.data().participants.includes(userId)) userRooms.push(room.data());
            });

            userRooms = userRooms.sort((a,b) => b.lastMessage.createdAt - a.lastMessage.createdAt);
            setChatList([...userRooms]);
        });
    }

    const onRoomClick = (e) => {
        setCurrentCounterId(e.target.name);
    };

    useEffect(() => {
        loadList();
    });

    return <ul>
        
        {chatList.map(room => {
            return <Button onClick={onRoomClick} name={room.participants.find(id => id !== userId)}>
                {room.lastMessage.message}</Button>
        })}
    </ul>
}

export default ChatList;