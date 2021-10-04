import React, { Component } from "react";
import axios from "axios";
import "./Mathtest.css";

const url = "http://api.mathjs.org/v4/";

let equation = {
  "expr": [
    "a = 2 + 5",
    "a = 3 + 3",
    "a = 6 + 5",
    "a = 3 + 1",
    "a = 2 + 8",
    "a = 1 + 22"
  ]
};

//Randomizer function for equation
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

    //State saves mathtest which is random eqauation and value is students answer 
    this.state = {
      mathtest: "",
      mathtestorginal: "",
      mathtestnew: "",
      value: ""
    };

    //Randomized equation cleaned up, student sees this
    var newEq = pickRandomProperty(equation.expr);
    var randEq = equation.expr[newEq];
    this.state.mathtestorginal = randEq;
    var randEqVis = randEq.slice(3);
    this.state.mathtest = randEqVis;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    console.log("handle change");
  }

  handleSubmit(event) {
    // alert("Answer was submitted: " + this.state.value);

    var studentAns = this.state.value;
    var mathjsRes = this.state.mathtestnew;
    if (studentAns !== mathjsRes) {
      alert("Wrong Answer Please try again");

    } else if (studentAns === mathjsRes) {
      //After Evaluation Button is hit this fires and picks random equation displays it properly and saves
      var newEq = pickRandomProperty(equation.expr);
      var randEq = equation.expr[newEq];
      var randEqVis = randEq.slice(3);
      this.setState((state) => {
        state.mathtest = randEqVis;
        state.mathtestorginal = randEq;
        state.value = '';

        return { count: state.mathtest };
      });
        //Next eqaution load 
        var origEqstr = randEqVis.replace(/\s+/g, '');

        axios({
          method: "post",
          url: url,
          data: {
            "expr": [origEqstr]
          },
        })
          .then((res) => {
            //handle success
            // console.log("POST Res from axios mathjs answer " + res.data.result);
            console.log(res); 

            this.setState((state) => {
              state.mathtestnew = res.data.result[0];     
              return { count: state.mathtestnew};
            });

          })
          .catch((error) => {
            //handle error
            console.log(error);
          })
          .then(function () {
            //always executed
          });

    }
    
    event.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <h1>Please answer the following equation</h1>

        <form onSubmit={this.handleSubmit} name="form1" id="form1">
          <label id="random">{this.state.mathtest + " = "}</label>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            id="answer"
          />
          <button onClick={this.resetNumber} type="submit" id="postButton" value="Submit">Evaluate</button>
        </form>
      </React.Fragment>
    );
  }

  componentDidMount() {
    console.log("Comp Did Mount");
    let origEqstr = this.state.mathtestorginal;
    origEqstr = origEqstr.replace(/\s+/g, '');

    // console.log("Eq saved DidMount " + origEqstr);

    axios({
      method: "post",
      url: url,
      data: {
        "expr": [origEqstr]
      },
    })
      .then((res) => {
        //handle success
        console.log("Res from axios mathjs answer " + res.data.result);
        // console.log(res);
        this.setState((state) => {
          var mathresult = res.data.result[0];
          state.mathtestnew = mathresult;
          console.log("this state mathtestnew " + state.mathtestnew);

          return { count: state.mathtestnew };
        });


      })
      .catch((error) => {
        //handle error
        console.log(error);
      })
      .then(function () {
        //always executed
      });

  }

  componentDidUpdate(prevProps, prevState) {
    //prevState shows previous state, what the student entered before
    if (this.state.value !== prevProps.value) {

    }
  }
}

export default Mathtest;
