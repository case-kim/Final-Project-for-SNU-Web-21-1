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

import { theme } from './constants';


class HomePage extends Component {

    state = {
        user: this.props.user,
        tabs: [],
        profileCompleted: authentication.getProfileCompletion({...this.props.user}) >= 80,
        settingsOpen: false
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
                alert('????????? ??????????????????. ?????? ????????? ?????????.');
            });
    }

    componentDidUpdate(prevProps) {
        if(this.props.userData !== prevProps.userData){
            this.setState({
                user: this.props.user,
                profileCompleted: authentication.getProfileCompletion({...this.props.user}) >= 80
            }, () => {
                this.getTabs();
            });
        }
    } 

    render() {
        const {tabs, user, profileCompleted, settingsOpen} = this.state;

        if (!user) {
            return (
                <Box
                    style={{transform: "translate(-50%, -50%)"}}
                    position="absolute"
                    top="50%"
                    left="50%"
                    textAlign="center">
                    <div>????????? ???????????? ???????????? ??????</div>
                    <div className="homepage-title">SNU Flower Matching</div>
                    <div> ???????????? ??? ????????? ?????? ??????????????????</div>
                </Box>
            );
        } else {

            return <>
                {!profileCompleted ? 
                    <Box
                        style={{transform: "translate(-50%, -50%)"}}
                        position="absolute"
                        top="50%"
                        left="50%"
                        textAlign="center">
                        <div className="homepage-subtitle">????????? ????????? Setting?????? ??????????????????.<br/>????????? ???????????? ????????? ?????? ????????? ????????? ???????????? ???????????????.</div>
                        <Button onClick={() => this.setState({settingsOpen: true})}> Setup </Button>
                    </Box> :

                    <Box style={{transform: "translate(-50%, -50%)"}} position="absolute" top="50%" left="50%" textAlign="center">
                        <div className="homepage-subtitle">????????? ?????? ????????? ???????????????.</div>
                        <div className="homepage-title">SNU Flower Matching</div>
                        <ButtonGroup id='buttonGroup' color='primary' aria-label='large outlined primary button group'>
                            {tabs.map((tab,index) => {
                                return <Button key={index}><Link to={tab.to}>{tab.name}</Link></Button>
                            })}
                        </ButtonGroup>
                    </Box>
                    }

                    <SettingsDialog dialogProps={{open: settingsOpen, onClose: () => this.setState({settingsOpen: false})}} user={user} userData={this.props.userData} theme={theme} />
                </>
        }
    }

}

HomePage.propTypes = {
    user: PropTypes.object,
};

export default withRouter(HomePage);
