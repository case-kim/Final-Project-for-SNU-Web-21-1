import React, {Component, useEffect} from "react";
import {Box, Button, ButtonGroup} from '@material-ui/core'

import PropTypes from "prop-types";

import {withRouter} from "react-router-dom";

import {auth} from "../../firebase";

import authentication from "../../services/authentication";

import EmptyState from "../EmptyState";

import {ReactComponent as CabinIllustration} from "../../illustrations/cabin.svg";
import {ReactComponent as InsertBlockIllustration} from "../../illustrations/insert-block.svg";
import {withStyles} from "@material-ui/core/styles";

import SettingsDialog from '../SettingsDialog'

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/functions';
import './style-hompage.css';


class HomePage extends Component {

    signInWithEmailLink = () => {
        const {user} = this.props;


        if (user) {
            return;
        }

        const emailLink = window.location.href;

        if (!emailLink) {
            return;
        }

        if (auth.isSignInWithEmailLink(emailLink)) {
            let emailAddress = localStorage.getItem("emailAddress");

            if (!emailAddress) {
                this.props.history.push("/");

                return;
            }

            authentication
                .signInWithEmailLink(emailAddress, emailLink)
                .then((value) => {
                    const user = value.user;
                    const displayName = user.displayName;
                    const emailAddress = user.email;

                    this.props.openSnackbar(
                        `Signed in as ${displayName || emailAddress}`
                    );
                })
                .catch((reason) => {
                    const code = reason.code;
                    const message = reason.message;

                    switch (code) {
                        case "auth/expired-action-code":
                        case "auth/invalid-email":
                        case "auth/user-disabled":
                            this.props.openSnackbar(message);
                            break;

                        default:
                            this.props.openSnackbar(message);
                            return;
                    }
                })
                .finally(() => {
                    this.props.history.push("/");
                });
        }
    };

    render() {
        const {user} = this.props;
        const currentUser = firebase.auth().currentUser;
        var uid;
        if (user != null) {
            uid = currentUser.uid
        }
        const myDB = firebase.database().ref(`accounts/${uid}`)
        myDB.once('value')
            .then(function(snapshot){
                if(document.getElementById('buttonGroup') && !document.getElementById('testButton') && user
                    && authentication.getProfileCompletion({...user}) >= 80&&!snapshot.hasChildren()) {
                    const testButton = document.createElement('button')
                    const test = document.createElement('a')
                    testButton.appendChild(test);
                    testButton.id = 'testButton'
                    test.href = './test'
                    test.innerHTML = 'TEST START'
                    document.getElementById('buttonGroup').appendChild(testButton)
                }
                if (document.getElementById('buttonGroup') && !document.getElementById('resultButton') && user
                    && authentication.getProfileCompletion({...user}) >= 80&&snapshot.hasChildren()){
                    const resultButton = document.createElement('button')
                    const matchButton = document.createElement('button')
                    const chatButton = document.createElement('button')
                    const result = document.createElement('a')
                    const match = document.createElement('a')
                    const chat = document.createElement('a')
                    resultButton.id = 'resultButton'
                    matchButton.id = 'resultButton'
                    chatButton.id = 'resultButton'
                    resultButton.appendChild(result);
                    matchButton.appendChild(match);
                    chatButton.appendChild(chat);
                    result.href = './result'
                    match.href = './matching'
                    chat.href = './chatting'
                    result.innerHTML = 'MY RESULT'
                    match.innerHTML = 'MATCHING'
                    chat.innerHTML = 'CHATTING'
                    document.getElementById('buttonGroup').appendChild(resultButton)
                    document.getElementById('buttonGroup').appendChild(matchButton)
                    document.getElementById('buttonGroup').appendChild(chatButton)
                }
            })

        if (user && authentication.getProfileCompletion({...user}) >= 80) {
            return (
                <Box
                    style={{transform: "translate(-50%, -50%)"}}
                    position="absolute"
                    top="50%"
                    left="50%"
                    textAlign="center">
                    <div className="homepage-subtitle">당신과 맞는 사람을 찾아보세요.</div>
                    <div className="homepage-title">SNU Flower Matching</div>
                    <ButtonGroup id = 'buttonGroup' color = 'primary' variant='contained' display='flex' flex-direction='column'>
                    </ButtonGroup>
                </Box>
            )
        }
        if (user && authentication.getProfileCompletion({...user}) < 80) {
            return (
                <Box
                    style={{transform: "translate(-50%, -50%)"}}
                    position="absolute"
                    top="50%"
                    left="50%"
                    textAlign="center">
                    <div className="homepage-subtitle">당신의 정보를 Setting에서 설정해주세요.<br/>메일을 제외하고 사진과 모든 정보를 채워야 테스트가 가능합니다.</div>
                    <Button onClick={() => SettingsDialog}> Setup </Button>

                </Box>
            )
        }

        return (
            <Box
                style={{transform: "translate(-50%, -50%)"}}
                position="absolute"
                top="50%"
                left="50%"
                textAlign="center">
                <div>꽃으로 알아보는 운명적인 만남</div>
                <div className="homepage-title">SNU Flower Matching</div>
                <div> 회원가입 및 로그인 후에 사용해주세요</div>
            </Box>
        );
    }

    componentDidMount() {
        this.signInWithEmailLink();
    }
}

HomePage.propTypes = {
    user: PropTypes.object,
};

export default withRouter(HomePage);
