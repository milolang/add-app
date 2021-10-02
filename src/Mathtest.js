import React, { Component } from "react";
import axios from "axios";
import "./Mathtest.css";

// const axios = require('axios').default;
const url = "http://api.mathjs.org/v4/";
// var answer = document.getElementById("answer");

let equation = {
  "expr": [
        "a = 2 + 5",
        "a = 3 + 3",
        "a = 1 + 2"
        ]
};

// let string = JSON.stringify(equation);

function pickRandomProperty(obj) {
  var prop, len = 0, equation, pos = 0;
  for (prop in obj) {
      if (obj.hasOwnProperty(prop)) {
          len += 1;
      }
  }
  equation = Math.floor(Math.random() * len);
  for (prop in obj) {
      if (obj.hasOwnProperty(prop)) {
          if (pos === equation) {
              return prop;
          }
          pos += 1;
      }
  }
}

class Mathtest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mathtest: "",
      value: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("Answer was submitted: " + this.state.value);

    var newEq = pickRandomProperty(equation.expr);
    var randEq = equation.expr[newEq];
    this.setState((state) => {
      state.mathtest = randEq;
      return {count: state.mathtest};
    });

    event.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <h1>Please answer the following equation</h1>
        <div id="random">{this.state.mathtest}</div>

        <form onSubmit={this.handleSubmit} id="form1">
          <label>
            
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              id="answer"
            />
          </label>
          <button type="submit" id="postButton" value="Submit">Evaluate</button>
        </form>
      </React.Fragment>
    );
  }

  componentDidMount() {

    axios({
      method: "post",
      url: url,
      data: {
          // prob
      },
      contentType: 'application/json'
    })
      .then((res) => {
        //handle success
        // console.log(res);
      })
      .catch((error) => {
        //handle error
        // console.log(error);
      })
    //   .then(function () {
    //     //always executed
    //   });
  }

  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):

    //prevState shows previous state, what the student entered before
    // console.log(prevState);

    if (this.state.value !== prevProps.value) {
      let answer = this.state.value;
      let post = document.getElementById("postButton");

      post.onclick = function () {
      console.log("Did Update Comp " + answer);
      // console.log(this.state.mathtest);

      };

    }
  }
}

export default Mathtest;
