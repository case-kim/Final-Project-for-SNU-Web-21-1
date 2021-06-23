import { Dialog, Modal } from '@material-ui/core';
import { Grid, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React, { useState, useEffect } from 'react';
import './style.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

import Chat from '../Chat/Chat';

const PartnerCard = ({uid, username, type, age, location, title}) => {


    const [imgSrc, setImgSrc] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(()=>{
        const avatarImage = firebase.storage().ref(`images/avatars/${uid}`);
        avatarImage.getDownloadURL()
        .then(res => {
            setImgSrc(res);
        }).catch(e => {
            setImgSrc('https://i.stack.imgur.com/34AD2.jpg');
        });
    },[])
    
    return <div className="card-container">
        <Card className="card" variant="outlined" onClick={() => setModalOpen(true)}>
            <CardContent>
                <Grid container className="card-body" spacing={3}>
                    <Grid item xs={12} className="card-header">
                        <b>{title}</b>
                        <b>타입: {type}</b>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={imgSrc} style={{width: '200px', height: '200px'}} />
                    </Grid>
                    <Grid item xs={6}>
                        <h2>{username}</h2>
                        <ul>
                            <li>나이: {age}</li>
                            <li>사는 곳: {location}</li>
                        </ul>
                        <Button onClick={() => setModalOpen(true)} variant="outlined" color="primary">Start Chat</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>

        <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
            <div className="card-modal center">        
                {modalOpen && <Chat counterId={uid} counterName={username} />}
            </div>
        </Dialog>
    </div>
}



export default PartnerCard;