import React, {Component, useState, useEffect} from 'react'
import {Button, ButtonGroup, Box} from '@material-ui/core';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';
import './style.css';


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
    useEffect(() => {
        myMBTISpace.on('value', function (snapshot) {
            myMBTI = snapshot.val()
            const myMBTIResult = firebase.database().ref(`testResult/${myMBTI}`)
            const myMBTIStorage = firebase.storage().ref(`imageOfFlowers/${myMBTI}.png`);
            myMBTIResult.child('title').on('value', function (context) {
                myTitle = context.val()
                document.getElementById('myTitle').innerText = myTitle;
            })
            myMBTIResult.child('subtitle').on('value', function (context) {
                mySubtitle = context.val()
                document.getElementById('mySubtitle').innerText = mySubtitle;
            })
            myMBTIResult.child('context').on('value', function (context) {
                myContext = context.val()
                document.getElementById('myContext').innerHTML = myContext;
            })

            myMBTIStorage.getDownloadURL().then(function (url) {
                console.log(url)
                const imageLink = url;
                document.getElementById('myImage').src = imageLink;
            }).catch(function (error) {
                // Handle any errors
            })
        })
    }, [])
    return (
        <div className="test-result">
            <h2 className="title">심리테스트 결과</h2>
            <div id='result'>
                <img src='imageLink' id="myImage" height="auto" width="100%" align="center"/>
                <div id='myTestResult' text-align='center'>
                    <h4 id='mySubtitle'/>
                    <h3 id='myTitle'/>
                    <div id='myContext'/>
                </div>
            </div>
            <Box mt={4}>
                <Button className="submit" href='../matching' align='center' variant="contained" color="secondary">만나러
                    가기</Button>
            </Box>
        </div>
    )
}

export default ShowResult;
