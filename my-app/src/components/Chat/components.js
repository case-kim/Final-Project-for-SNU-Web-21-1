import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";

const Dialog = ({chatLog, counterId}) => {
    return <div>
        {chatLog.map(chat => {
            const sentByCounter = chat.sender === (counterId || 'B'); //임시로 상대 B로 둠(서버 연결 이후 || 이하 삭제)

            return <div className={sentByCounter ? '' : 'right'}>
                {sentByCounter ? '상대' : '나'}: {chat.message}
            </div>
        })}
    </div>
}

const MessageInput = () => {

    const [message, setMessage] = useState('');
    const sendMsg = () => {
        //API call
        setMessage('');
    }

    return <div>
        <input type="text" placeholder="메시지를 입력하세요" value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button onClick={sendMsg}>전송</Button>
    </div>
}

export {Dialog, MessageInput};