import React, {Component, useEffect} from "react";
import {Box, Button, ButtonGroup} from '@material-ui/core'

import PropTypes from "prop-types";

import {withRouter, Link } from "react-router-dom";

import {auth} from "../../firebase";

import authentication from "../../services/authentication";

import SettingsDialog from '../SettingsDialog'

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/functions';
import './style-hompage.css';


class HomePage extends Component {

    state = {
        user: this.props.user,
        tabs: [],
        profileCompleted: authentication.getProfileCompletion({...this.props.user}) >= 80
    }

    componentDidMount() {
        this.signInWithEmailLink();
        this.getTabs();
    }

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

    getTabs = () => {
        const {user, profileCompleted} = this.state;

        if (!user || !profileCompleted) return;

        const uid = user.uid;
        const myDB = firebase.database().ref(`accounts/${uid}`);

        myDB.once('value')
            .then((snapshot) => {
                let newTabs;

                if(!snapshot.hasChildren()) {
                    newTabs = [{to: '/test', name: 'TEST START'}]
                } else {
                    newTabs = [{to: '/result', name: 'MY RESULT'}, {to: '/matching', name: 'MATCHING'}, {to: '/chatting', name: 'CHATTING'}]
                }

                this.setState({
                    tabs: newTabs
                });
            }).catch(e => {
                alert('오류가 발생했습니다. 다시 시도해 주세요.');
            });
    }

    componentDidUpdate(prevProps) {
        if(this.props.user !== prevProps.user){
            this.setState({
                user: this.props.user,
                profileCompleted: authentication.getProfileCompletion({...this.props.user}) >= 80
            }, this.getTabs());
        }
    } 

    render() {
        const {tabs, user, profileCompleted} = this.state;

        if (!user) {
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
        } else if (!profileCompleted) {
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
        } else {
            return <Box style={{transform: "translate(-50%, -50%)"}} position="absolute" top="50%" left="50%" textAlign="center">
                        <div className="homepage-subtitle">당신과 맞는 사람을 찾아보세요.</div>
                        <div className="homepage-title">SNU Flower Matching</div>
                        <ButtonGroup id='buttonGroup' color='primary' aria-label='large outlined primary button group'>
                            {tabs.map(tab => {
                                return <Button><Link to={tab.to}>{tab.name}</Link></Button>
                            })}
                        </ButtonGroup>
                    </Box>
        }

    }

}

HomePage.propTypes = {
    user: PropTypes.object,
};

export default withRouter(HomePage);
