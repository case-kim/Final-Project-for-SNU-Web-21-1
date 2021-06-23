import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import React from 'react';
import moment from 'moment';
import 'moment/locale/ko'

const Dialog = ({chatLog, counterId, counterName}) => {

    const dialogContainer = React.createRef();

    const scrollToRef = () => {
        const scroll =
          dialogContainer.current.scrollHeight -
          dialogContainer.current.clientHeight;
        dialogContainer.current.scrollTo(0, scroll);
    };

    useEffect(() => {
        scrollToRef();
    }, [chatLog])


    return <div className="dialog" ref={dialogContainer}>
        {chatLog.map((chat,index) => {
            const sentByCounter = chat.from === counterId;

            let hideTime;
            const laterOne = chatLog[index+1];
            if (laterOne) {
                hideTime = (laterOne.from === chat.from) && (new Date(laterOne.createdAt).getMinutes() === new Date(chat.createdAt).getMinutes());
            }

            let hideDate;
            let hideName;

            const formerOne = chatLog[index-1];
            if (formerOne) {
                hideDate = (new Date(chat.createdAt).getDate() - new Date(formerOne.createdAt).getDate() === 0);
                hideName = (formerOne.from === chat.from) && sentByCounter;
            }

            return <div key={index}>
                {!hideDate && <div className="date"><h3>-{moment(new Date(chat.createdAt)).format('MMM Do')}-</h3></div>}

                <div className={`message ${sentByCounter ? '' : 'counter'}`}>
                    <div style={{textAlign: sentByCounter ? 'left' : 'right'}}>
                        {!hideName && sentByCounter && <div>{counterName}:</div>}
                        {chat.message}
                        {!hideTime && <div>{moment(new Date(chat.createdAt)).format('HH:mm')}</div>}
                    </div>
                </div>
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