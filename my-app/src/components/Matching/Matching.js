import { useEffect, useState } from 'react';
import Loader from '../Loader';
import PartnerCard from './PartnerCard';
import './style.css';
import { Grid } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';
import authentication from "../../services/authentication";




const Matching = ({type}) => {
    const user = firebase.auth().currentUser;
    var uid;
    var myType;
    var myName;
    if (user != null) {
        uid = user.uid
        myName = authentication.getFullName({...user})
    }
    console.log(myName);


    const myDB = firebase.database().ref(`accounts/${uid}/`)


    const [isLoading, setLoadingState] = useState(true);
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        // 타입 맞는 상대 불러오기: API. type 프로퍼티 활용
        myDB.child('userName').on('value',function(name){
            myName = name.val()
        })
        myDB.child('type').on('value', function(snapshot){
            myType = snapshot.val();
            const myPartnerList = firebase.database().ref(`partnerList/${myType}/`)
            myPartnerList.on('value', function(partner){
                const uidOfPartner = Object.keys(partner.val());
                console.log(partner.val())
                const res = [];
                uidOfPartner.map(oneUid=> {
                    firebase.database().ref(`accounts/${oneUid}/userName`).on('value', function(name){
                        const userRes = {'username': name.val(), 'type':myType}
                        res.push(userRes)
                    })
                })
                console.log(res);
                setTimeout(() => {
                    setPartners([...res]);
                    setLoadingState(false);
                }, 3000);
            })
        })
        // console.log(myType);
        //
        // const res = [
        //     {'username': '상대1', 'type': 'A'},
        //     {'username': '상대2', 'type': 'B'},
        //     {'username': '상대3', 'type': 'A'},
        // ]
        // setTimeout(() => {
        //     setPartners([...res]);
        //     setLoadingState(false);
        // }, 3000);
    }, []);

    if (isLoading) return <div>
            <Loader message="운명의 상대를 찾는 중.." />
        </div>

    if (!partners.length) {
        return <h1>맞는 상대가 없습니다.</h1>
    } 

    return <Grid container direction="column" justify="center" alignItems="center" id="matching">
        {partners.map(partner => <PartnerCard {...partner} />)}
    </Grid>
}

export default Matching;