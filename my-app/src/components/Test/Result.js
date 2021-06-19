import {Link} from 'react-router-dom';
import React, { Component, useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
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
    useEffect(() => {
        const storageRef = firebase.storage().ref();
        storageRef.child(`N9cBnYJl2XQxRLOdlmCMpnzW2Xu1.jpg`).getDownloadURL().then(function(url) {
            const imageLink = url;
            document.querySelector('img').src = imageLink;
        }).catch(function(error) {

        });

    }, []);

    return(
        <div className="test-result">
            <h2>심리테스트 결과</h2>
            <img src='imageLink'
                 height="450px" width="800px" align="center"
                 style={{display:"block", margin: "0 auto"}}/>
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
