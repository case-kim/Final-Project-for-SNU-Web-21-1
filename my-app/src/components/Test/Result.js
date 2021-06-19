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
    if (user != null) {
        uid = user.uid
    }

    console.log(uid);

    const myMBTISpace = firebase.database().ref(`accounts/${uid}`).child('mbti')

    myMBTISpace.on('value',function (snapshot){
        myMBTI = JSON.stringify(snapshot)
        console.log(myMBTI)
        firebase.storage().ref().child(`imageOfMBTI/${myMBTI}`).getDownloadURL().then(function(url){
            var img = document.getElementById('myImage');
            img.src = url
        }).catch(function(error) {
            // Handle any errors
        });
    })

    // console.log(myMBTI);




    return(
        <div className="test-result">
            <h2>심리테스트 결과</h2>
            <img id='myImage'/>
        </div>
    )
}

class Result extends Component {

    render() {

        console.log(this.props.location)
        return <div className="test-result">
            <h2>심리테스트 결과</h2>
            <img src='imageLink'/>
        </div>
    }
}

export default ShowResult;
