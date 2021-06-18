import { useEffect, useState } from 'react';
import Loader from '../Loader';
import './style.css';

const Matching = ({type}) => {

    const [isLoading, setLoadingState] = useState(true);
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        // 타입 맞는 상대 불러오기: API
        const res = [
            {'username': '상대1', 'type': 'A'},
            {'username': '상대2', 'type': 'B'},
            {'username': '상대3', 'type': 'A'},
        ]
        setTimeout(() => {
            setPartners([...res]);
            setLoadingState(false);
        }, 3000);
    }, []);

    if (isLoading) return <div>
            <Loader message="운명의 상대를 찾는 중.." />
        </div>

    if (!partners.length) {
        return <h1>맞는 상대가 없습니다.</h1>
    } 

    return <div id="matching">
        <h1>매치 상대들을 보여줍니다.</h1>
    </div>
}

export default Matching;