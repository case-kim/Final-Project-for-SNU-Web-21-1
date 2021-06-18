import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core';


class Result extends Component {

    render() {
        console.log(this.props.location)
        return <div className="test-result">
            <h2>심리테스트 결과</h2>
        </div>
    }
}

export default Result;