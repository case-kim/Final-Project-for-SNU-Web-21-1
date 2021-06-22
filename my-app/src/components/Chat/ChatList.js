import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import moment from 'moment';
import React from 'react';

const ChatList = ({userId, setCurrentCounterId, chatList}) => {

    const onRoomClick = (e) => {
        setCurrentCounterId(e.target.closest('li').getAttribute('uid'));
    };

    return <List>  
        {chatList.map(room => {

            const { counterPic, counterName, counterId, lastMessage: {message, from, createdAt} } = room;

            return <ListItem alignItems="flex-start" onClick={(e) => onRoomClick(e)} style={{cursor: 'pointer'}} uid={counterId}>
                <ListItemAvatar>
                    <Avatar alt="counterPic" src={counterPic} />
                </ListItemAvatar>
                <ListItemText
                primary={counterName}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                        >
                            {from === userId ? '나' : counterName}: 
                        </Typography>
                        {message} - {moment(new Date(createdAt)).fromNow()}
                    </React.Fragment>
                }
                />
            </ListItem>
        })}
    </List>
}

export default ChatList;