import React, {Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import {Button} from '@material-ui/core';

class Questions extends Component {
    constructor(props) {
        super(props);
        this.toggleClass = this.toggleClass.bind(this);
        this.state = {
            active: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        };
    }

    toggleClass(index) {
        let currentState = this.state.active;
        if (this.state.active[index] === true) {
            currentState[index] = false;
        } else {
            currentState[index] = true;
            if (this.state.active[index + 12] === true) {
                this.state.active[index + 12] = false;
            }
        }

        this.setState({active: currentState});
    };

    toggleClass_1(index) {
        let currentState = this.state.active;
        if (this.state.active[index] === true) {
            currentState[index] = false;
        } else {
            currentState[index] = true;
            if (this.state.active[index - 12] === true) {
                this.state.active[index - 12] = false;
            }
        }

        this.setState({active: currentState});
    };

    render() {
        const questions = [{
            question: '비행기 옆자리에 마음에 드는 이상형이 있다. 어쩌다 대화를 시작한 나는',
            answer_1: '풍부한 공감과 리액션을 해준다',
            answer_2: '이것저것 궁금한 것을 질문한다',
            question_type: '0'
        }, {
            question: '갑작스러운 여행으로 혼자 오게 된 낯선 장소, 이런 곳에서 나는',
            answer_1: '혼자 조용히 여행을 즐긴다',
            answer_2: '여행 중 만난 사람들과 쉽게 친해진다',
            question_type: '1'
        }, {
            question: '여행지에서 친구가 평소 필요로 했던 선물이 생각날 때 나는',
            answer_1: '난 역시 섬세한 사람이야',
            answer_2: '나는 역시 기억력이 좋아',
            question_type: '0'
        }, {
            question: '돌아온 숙소, 게스트하우스 사람들과 맥주를 마시러 온 나는',
            answer_1: '묵묵히 사람들의 이야기를 듣는다',
            answer_2: '대화를 주도하며 분위기를 이끈다',
            question_type: '1'
        }, {
            question: '늦은 저녁, 룸메이트가 오늘 크게 넘어졌다고 얘기할 때 나는 ',
            answer_1: '내가 다친 것처럼 공감하며 걱정을 한다',
            answer_2: '왜 다쳤는지 물어보고 근처 약국을 알려준다',
            question_type: '0'
        }, {
            question: '잠들기 전, 가족과 통화에서 나는',
            answer_1: '구체적으로 있었던 일을 얘기한다',
            answer_2: '오늘 느꼈던 큰 감정을 얘기한다',
            question_type: '2'
        }, {
            question: '룸메이트가 어제 다녀왔던 맛집의 위치를 물어본다.',
            answer_1: '숙소에서부터 가는 법을 알려준다',
            answer_2: '식당 옆에 있는 큰 건물을 알려준다',
            question_type: '2'
        }, {
            question: '멍~때리며 버스를 기다리는 중, 나는 어떤 생각을 할까? ',
            answer_1: '"오늘 저녁은…" 남은 일정에 대해 생각한다',
            answer_2: '"내가 여기 산다면…" 의식의 흐름에 따라 상상의 나래를 펼친다',
            question_type: '2'
        }, {
            question: '아직 여행 마지막 날의 일정을 짜지 못한 나는',
            answer_1: '미루다 전날 잠들기 직전에 짠다',
            answer_2: '틈틈히 미리 루트를 구상해둔다',
            question_type: '3'
        }, {
            question: '미리 찾아보았던 식당이 문을 닫았다. 나의 선택은?',
            answer_1: '맛있어 보이는 옆 식당에 들어간다',
            answer_2: '맛집을 다시 검색해서 찾아본다',
            question_type: '3'
        }, {
            question: '여행중, 게스트하우스에서 가볍게 인사만 했던 사람과 우연히 마주친 나는? ',
            answer_1: '간단히 인사만 하고 지나간다',
            answer_2: '반가워하며 가벼운 대화를 이어나간다',
            question_type: '1'
        }, {
            question: '마지막 여행지를 향해 걸어가던 중 새로운 장소를 발견한 나는 ',
            answer_1: '어떤 장소인지 궁금하다. 일단 가서 구경한다',
            answer_2: '우선 남은 일정에 무리가 없는지 고려해본다.',
            question_type: '3'
        },]

        const submit = () => {
            let onclickUp = document.getElementsByClassName("onClick up");
            let onclickDown = document.getElementsByClassName("onClick down");
            let resultScore = [0, 0, 0, 0];
            let resultMBTI;
            // if(onclickUp.length + onclickDown.length != 12) {
            //     alert('모든 질문에 체크해주세요.')
            //     return;
            // }

            for (let i = 0; i < onclickUp.length; i++) {

                const index = onclickUp[i].getAttribute('question-type');
                resultScore[index] += 1;
            }
            for (let j = 0; j < onclickDown.length; j++) {
                const index = onclickDown[j].getAttribute('question-type');
                resultScore[index] -= 1;
            }

            if (resultScore[1] < 0) {
                resultMBTI = 'E'
            } else {
                resultMBTI = 'I'
            }
            if (resultScore[2] < 0) {
                resultMBTI += 'N'
            } else {
                resultMBTI += 'S'
            }
            if (resultScore[0] < 0) {
                resultMBTI += 'T'
            } else {
                resultMBTI += 'F'
            }
            if (resultScore[3] < 0) {
                resultMBTI += 'J'
            } else {
                resultMBTI += 'P'
            }

        }

        return <div className="voyage-test">
            <h2>여행 심리테스트</h2>
            {
                questions.map((question, index) => <div className="qa-container" question-num={index}>
                    <div className="question-container">
                        <div className="question">
                            {question.question}
                        </div>
                    </div>
                    <div className="answer-container">
                        <Button variant="contained" className={this.state.active[index] ? 'onClick up' : 'unClick up'}
                                color={this.state.active[index] ? 'primary' : 'default'}
                                onClick={this.toggleClass.bind(this, index)}
                                question-type={question.question_type}>{question.answer_1}</Button>
                        <Button variant="contained"
                                className={this.state.active[index + 12] ? 'onClick down' : 'unClick down'}
                                color={this.state.active[index + 12] ? 'primary' : 'default'}
                                onClick={this.toggleClass_1.bind(this, index + 12)}
                                question-type={question.question_type}>{question.answer_2}</Button>
                    </div>
                </div>)
            }
            <Button component={Link} to="/result" variant="contained" color="primary" onClick={submit}>
                제출하기
            </Button>
        </div>
    }
}

export default withRouter(Questions);