import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";

const Dialog = ({chatLog, counterId, counterName}) => {
    return <div>
        {chatLog.map(chat => {
            const sentByCounter = chat.from === counterId;

            return <div className={sentByCounter ? '' : 'right'}>
                {sentByCounter ? counterName : '나'}: {chat.message}
            </div>
        })}
    </div>
}

const MessageInput = ({sendChat, isSending}) => {

    const [message, setMessage] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
        if (message) {
            sendChat(message);
            setMessage('');
        } else {
            alert('메시지를 입력해주세요!')
        }
    }

    return <form onSubmit={onSubmit}>
        <input type="text" placeholder="메시지를 입력하세요" value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button type="submit" disabled={isSending} variant="contained" color="primary">전송</Button>
    </form>
}

export {Dialog, MessageInput};