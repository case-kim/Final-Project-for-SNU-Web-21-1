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
    var myMBTI;
    var myTitle;
    var mySubtitle;
    var myContext;
    if (user != null) {
        uid = user.uid
    }

    const myMBTISpace = firebase.database().ref(`accounts/${uid}/mbti`);

    console.log(myMBTI);
    useEffect(()=> {
        myMBTISpace.on('value', function(snapshot) {
            myMBTI = snapshot.val()
            const myMBTIResult = firebase.database().ref(`testResult/${myMBTI}`)
            const myMBTIStorage = firebase.storage().ref(`imageOfFlowers/${myMBTI}.png`);
            myMBTIResult.child('title').on('value',function(context){
                myTitle = context.val()
                document.getElementById('myTitle').innerText = myTitle;
            })
            myMBTIResult.child('subtitle').on('value',function(context){
                mySubtitle = context.val()
                document.getElementById('mySubtitle').innerText = mySubtitle;
            })
            myMBTIResult.child('context').on('value',function(context){
                myContext = context.val()
                document.getElementById('myContext').innerText = myContext;
            })

            myMBTIStorage.getDownloadURL().then(function(url){
                console.log(url)
                const imageLink = url;
                document.getElementById('myImage').src = imageLink;
            }).catch(function(error) {
                // Handle any errors
            })
        })
    },[])
    console.log(myTitle);
    return(
        <div className="test-result">
            <h2>심리테스트 결과</h2>
            <div id = 'result'>
                <img src = 'imageLink' id="myImage" height="450px" width="800px" align="center" style={{display:"block", margin: "0 auto"}}/>
                <div id = 'myTestResult'>
                    <h4 id = 'mySubtitle'/>
                    <h3 id='myTitle'/>
                    <div id = 'myContext'/>
                </div>
            </div>

            <Button href='../matching' align='center' varaint = 'contained'>만나러 가기</Button>
        </div>
    )
}

export default ShowResult;
