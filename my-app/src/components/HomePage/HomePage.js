import React, { Component } from "react";
import {Box, Button, ButtonGroup} from '@material-ui/core'

import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

import { auth } from "../../firebase";

import authentication from "../../services/authentication";

import EmptyState from "../EmptyState";

import { ReactComponent as CabinIllustration } from "../../illustrations/cabin.svg";
import { ReactComponent as InsertBlockIllustration } from "../../illustrations/insert-block.svg";
import { ReactComponent as MBTI } from "../../illustrations/mbti.png";
import {withStyles} from "@material-ui/core/styles";

import SettingsDialog from '../SettingsDialog'

import  firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/functions';

class HomePage extends Component {
  signInWithEmailLink = () => {
    const { user } = this.props;


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
    const { user } = this.props;
    const currentUser = firebase.auth().currentUser;
    var uid;
    if (user != null) {
      uid = currentUser.uid
    }

    if (user && authentication.getProfileCompletion({...user})>=80) {
      return (
          <Box
              style={{ transform: "translate(-50%, -50%)" }}
              position="absolute"
              top="50%"
              left="50%"
              textAlign="center">
            <div>당신과 맞는 성향의 사람을 찾아보세요.</div>
            <ButtonGroup variant = 'contained' display='flex' flex-direction = 'column'>
              <Button href={firebase.database().ref('accounts/'+uid).child('type') ?
              './matching': './test'}> Test Start</Button>
              <Button href='./mathcing'> Matching </Button>
              <Button> Chatting </Button>
            </ButtonGroup>
          </Box>
      );
    }
    if (user && authentication.getProfileCompletion({...user})<80){
      return (
          <Box
              style={{ transform: "translate(-50%, -50%)" }}
              position="absolute"
              top="50%"
              left="50%"
              textAlign="center">
            <div>당신의 정보를 Setting에서 설정해주세요. 메일을 제외하고 사진과 모든 정보를 채워야 테스트가 가능합니다. </div>
            <Button onClick={()=>SettingsDialog}> Setup </Button>

          </Box>
      )
    }

    return (
      <EmptyState
        image={<InsertBlockIllustration />}
        button  ="RMUIF"
        description="Supercharged version of Create React App with all the bells and whistles."
      />
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
