import moment from 'moment';

const ChatList = ({userId, setCurrentCounterId, chatList}) => {

    const onRoomClick = (e) => {
        setCurrentCounterId(e.target.name);
    };

    return <ul>  
        {chatList.map(room => {

            const { counterName, participants, lastMessage: {message, from, createdAt} } = room;

            return <button onClick={onRoomClick} name={participants.find(id => id !== userId)}>
                <h3>{counterName}</h3>
                <p>
                    {from === userId ? '나' : counterName}: {message}<br/>
                    {moment(new Date(createdAt)).fromNow()}
                </p>
            </button>
        })}
    </ul>
}

export default ChatList;