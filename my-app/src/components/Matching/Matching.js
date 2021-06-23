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
    }
    const myDB = firebase.database().ref(`accounts/${uid}/`)


    const [isLoading, setLoadingState] = useState(true);
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        // 타입 맞는 상대 불러오기: API. type 프로퍼티 활용
        myDB.child('type').on('value', function(snapshot){
            myType = snapshot.val();
            const myPartnerList = firebase.database().ref(`partnerList/${myType}/`)
            myPartnerList.on('value', function(partner){
                const uidOfPartner = Object.keys(partner.val());
                console.log(uidOfPartner);
                const res = [];
                uidOfPartner.map((oneUid) => {
                    if (oneUid !== user.uid){
                        const oneDB = firebase.database().ref(`accounts/${oneUid}`)
                        oneDB.child('mbti').on('value', function(mbti) {
                            const mbtiOfPartner = mbti.val();
                            firebase.database().ref(`testResult/${mbtiOfPartner}/title`).on('value', function(title){
                                const titleOfMbti = title.val();
                                oneDB.child('userName').on('value', function(name){
                                    myName = name.val()
                                    oneDB.child('userAge').on('value', function(age){
                                        const myAge = age.val()
                                        oneDB.child('userLocation').on('value', function(location){
                                            const myLocation = location.val()
                                            const userRes = {'user': user, 'uid': oneUid, 'username': name.val(), 'type':myType,
                                                'age':myAge, 'location':myLocation, 'title': titleOfMbti}
                                            res.push(userRes);
                                            if(res.length === uidOfPartner.length-1) {
                                                setPartners([...res]);
                                                setLoadingState(false);
                                            }
                                        })
                                    })

                                });

                            })
                        })
                    }
                })
            })
        })
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