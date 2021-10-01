import React, {Component} from 'react';
import axios from 'axios';
import './Mathtest.css';

// const axios = require('axios').default;
const url = 'http://api.mathjs.org/v4/' ;
var answer = document.getElementById('answer');
var prob = "2 + 5 = ?"; 

class Mathtest extends Component{
    constructor(props){
        super(props)

        this.state={
            Mathtest:''
        }
    }

    render() {
        return(
            <React.Fragment>
                <h1>Test Question</h1>
                <div id="random">{prob}</div>

                <table>
                    <thead>
                        <tr>
                            <th>Expression</th>
                            <td><form id="form1"><input type="number" id="answer" value="Submit" /></form></td>
                        </tr>
                    </thead>
                </table>
                <button id="postButton">Evaluate</button>
            </React.Fragment>
        
        )

    }

    componentDidMount(){
        let post = document.getElementById('postButton');
        // let a = [student];
        // answer.oninput = function() {
        //     // var studentAnswer = answer.value;
        // }
        // answer.oninput();

        // var expr2 = {
        //     "expr": [            
        //         prob
        //     ]
        // };
        console.log(answer);
        post.onclick = function(){
            // let expr = expr2;
            axios({
                method: 'post',
                url: url,
                // data: expr
            })
                .then(res => {
                    //handle success
                    console.log(res);
                })
                .catch(error => {
                    //handle error
                    console.log(error);
                })
                .then(function () {
                    //always executed
                });
        }
    }
    
}

export default Mathtest