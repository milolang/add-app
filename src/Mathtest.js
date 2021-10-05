import React, { Component } from "react";
import axios from "axios";
import "./Mathtest.css";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
// import Alert from 'react-bootstrap/Alert';
// import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ReactComponent as Ok } from './ok.svg';




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
      value: "",
      // currentCount: ""

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
      var x = document.getElementById("ok");

      x.style.display = "none";

      function okFire() {

        // console.log("OK ID " + x.style.display);
        if (x.style.display === "none") {
          x.style.display = "block";
          // this.setState((state) => { 
          //   state.currentCount = -1;
          //   return { count: state.currentCount };
          // });
        } else {
          x.style.display = "none";
        }
      }

      okFire();
      setTimeout(() => {
        x.style.display = "none";


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

      }, 2000);

    }

    event.preventDefault();
  }

  render() {
    return (

      <Container className="p3">
        <Row>
          <h1 className="header">Please answer the following equation</h1>

          <form onSubmit={this.handleSubmit} name="form1" id="form1">
            <Col xs={6} md={4}>
              <label id="random">{this.state.mathtest + " = "}</label>
            </Col>
            <Col xs={6} md={4}>
              <InputGroup size="lg">
                <InputGroup.Text id="inputGroup-sizing-lg">Large</InputGroup.Text>
                <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" type="text" value={this.state.value} onChange={this.handleChange} id="answer" />
              </InputGroup>
            </Col>
            <Col xs={6} md={4}>
              <Button onClick={this.resetNumber} type="submit" id="postButton" value="Submit" variant="primary" className="mx-2">Evaluate</Button>
            </Col>
            <Col xs={6} md={4}>
              <Ok id="ok" width="200" height="200" display="none" />
            </Col>
          </form>
        </Row>
      </Container>
    );
  }

  componentDidMount() {
    console.log("Comp Did Mount");
    let origEqstr = this.state.mathtestorginal;
    origEqstr = origEqstr.replace(/\s+/g, '');

    var intervalId = setInterval(this.timer, 250);
    // store intervalId in the state so it can be accessed later:
    this.setState({ intervalId: intervalId });

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
