import React, {Component} from 'react';
import axios from 'axios';
import './Mathtest.css';

// const axios = require('axios').default;
const url = 'http://api.mathjs.org/v4/' ;
var answer = document.getElementById('answer');
var prob = "2 + 5 = ?"; 

class Mathtest extends Component{
    constructor(props){
        super(props);

        this.state = {
            Mathtest:'', 
            value:''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Answer was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                <h1>Test Question</h1>
                <div id="random">{prob}</div>

                                <form onSubmit={this.handleSubmit} id="form1">
                                <label>
                                Expression
                                    <input type="text" value={this.state.value} onChange={this.handleChange} id="answer" />
                                </label>
                                </form>
                <button id="postButton">Evaluate</button>
            </React.Fragment>
        
        )

    }

    componentDidMount(){
        let post = document.getElementById('postButton');

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