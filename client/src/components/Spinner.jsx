import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div.attrs({
  id: 'spinner-back',
})`
  align-items: center;
  background-color: #444;
  display: none;
  flex-direction: column;
  justify-content: center;
  opacity: .9;
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: 999;
`

const SpinnySpin = styled.i.attrs({
  id: "spinner",
  className: "fas fa-spinner fa-pulse"
})
`
  color: #fff;
  display: block;
  font-size: 17rem;
  position: relative;
  z-index: 1001;
`

const PosRel = styled.div`
  color: #fff;
  font-size: 3rem;
  font-weight: bold;
  padding-top: 21px;
  position: relative;
  z-index: 1000;
`


const Show = () => {
  let me = document.getElementById('spinner-back');
  let main = document.getElementById('main');
  main.setAttribute("class", "no-scroll");
  me.style.display = 'flex';
  me.style.bottom = 0;
  me.style.top = 0;
  window.scrollTo(0, 0);
};
const Hide = () => {
  let me = document.getElementById('spinner-back');
  let main = document.getElementById('main');
  main.setAttribute("class", "");
  me.style.display = 'none';
};


class Spinner extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hidden: false,
      me: false,
      main: false
    }
  }

  componentDidMount = () => {
  }


  render() {
    return (
      <Container>
        <SpinnySpin />
        <PosRel>Loading</PosRel>
      </Container>

    )
  }
};

export {
  Spinner,
  Show,
  Hide
}