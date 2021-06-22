import { Dialog, Modal } from '@material-ui/core';
import { Grid, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React, { useState, useEffect } from 'react';
import DetailModal from './DetailModal';
import './style.css';
import PropTypes from "prop-types";
import UserAvatar from "../UserAvatar";

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';


const PartnerCard = ({user, uid, username, type, title}) => {

    const avatarImage = firebase.storage().ref(`images/avatars/${uid}`);

    const [modalOpen, setModalOpen] = useState(false);
    const [isChatting, setIsChatting] = useState(false);

    useEffect(()=>{
        avatarImage.getDownloadURL().then(function(url) {
            console.log(url);
            const partnerImage = document.createElement('img')
            partnerImage.src = url;
            partnerImage.width = 200;
            partnerImage.height = 200;
            document.getElementById(uid).appendChild(partnerImage);
        })
    },[])
    
    const onChatClick = () => {
        setIsChatting(true);
        setModalOpen(true);
    }


    return <div className="card-container">
        <Card className="card" variant="outlined" onClick={() => setModalOpen(true)}>
            <CardContent>
                <Grid container className="card-body" spacing={3}>
                    <Grid item xs={12} className="card-header">
                        <b>이름: {username}</b>
                        <b>타입: {type}</b>
                    </Grid>
                    <Grid item xs={6} id={uid} >

                    </Grid>

                    <Grid item xs={6}>
                        <h2>{title}</h2>
                        <ul>
                            <li>어쩌구</li>
                            <li>어쩌구</li>
                            <li>어쩌구</li>
                        </ul>
                        <Button onClick={onChatClick} variant="outlined" color="primary">Start Chat</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>

        <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
            <DetailModal open={modalOpen} counterId={uid} counterName={username} isChattingDefault={isChatting} setParentIsChatting={setIsChatting}/>
        </Dialog>
    </div>
}



export default PartnerCard;