import {Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography} from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import './style.css';


const ChatList = ({userId, setCurrentCounterId, chatList}) => {

    const onRoomClick = (e) => {
        setCurrentCounterId(e.target.closest('li').getAttribute('uid'));
    };

    return <aside>
            <ul>
                {chatList.map(room => {

                    const {counterPic, counterName, counterId, lastMessage: {message, from, createdAt}} = room;

                    return <li alignItems="flex-start" onClick={(e) => onRoomClick(e)} style={{cursor: 'pointer'}}
                                     uid={counterId}>
                        <img width="55px" height="55px" src={counterPic}>
                        </img>
                        <div>
                            <h2>
                                {counterName}
                            </h2>
                            <h3>
                                <span>
                                    {moment(new Date(createdAt)).fromNow()}
                                </span>
                            </h3>
                        </div>

                    </li>
                })}
            </ul>
        </aside>
}

export default ChatList;