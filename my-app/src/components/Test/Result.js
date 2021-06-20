import {Link} from 'react-router-dom';
import React, { Component, useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import
    SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { Button, ButtonGroup } from '@material-ui/core';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';



// const Result = (user) => {
//     const queryURL = `users_mbti/${user}/type`
//     const query = firebase.database().ref(queryURL);
// }


const ShowResult = () => {
    const user = firebase.auth().currentUser;
    var uid;
    var myMBTI
    if (user != null) {
        uid = user.uid
    }
    var img = document.getElementById('myImage');

    console.log(uid);

    const myMBTISpace = firebase.database().ref(`accounts/${uid}`).child('mbti')

    useEffect(()=> {
        const myMBTIStorage = firebase.storage().ref('imageOfMBTI/ISFP.jpg')
        myMBTIStorage.getDownloadURL().then(function(url){
            console.log(url)
            const imageLink = url;
            document.getElementById('myImage').src = imageLink;
        }).catch(function(error) {
            // Handle any errors
        });
    },[])
    return(
        <div className="test-result">
            <h2>심리테스트 결과</h2>
            <img src = 'imageLink' id="myImage" height="450px" width="800px" align="center" style={{display:"block", margin: "0 auto"}}/>
            <div>{myMBTISpace}</div>
            <Button href='../matching' align='center' varaint = 'contained'>만나러 가기</Button>
        </div>
    )
}

class Result extends Component {

    render() {


        console.log(this.props.location)
        return (<div className="test-result">
            <h2>심리테스트 결과</h2>
            <img src="imageLink" height="450px" width="800px" align="center" style={{display:"block", margin: "0 auto"}}/>
        </div>)
    }
}

export default ShowResult;
