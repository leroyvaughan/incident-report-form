import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ImgA from '../assets/darn-ned-flanders.jpg';
import ImgB from '../assets/frozen-door-ned-flanders.jpg';
import Header from '../components/Header';
import Footer from '../components/Footer';



//Misc helper funcs
const randomInteger = function (min, max) {
  if(!min) { min = 0; }
  if(!max) { max = 10; }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const isOdd = (num) => {
  const chk = num % 2;
  if(chk === 1) { return true; }
  return false;
};


//HTML components for page
const PageWrap = styled.div.attrs({
  className: 'container'
})`
  text-align: center;
`
const Image = styled.img`
  max-width: 500px;
  width: 79%;
`


//Functional Component start here
export default function FourOhFour () {
  const [img, setImg] = useState();


  useEffect(() => {
    let num = randomInteger();

    if(isOdd(num)) {
      setImg(ImgA);
    }
    else {
      setImg(ImgB);
    }
  }, []);



  return (
    <div>
      <Header errTxt="Bad Request!" />

      <PageWrap>

        <div className="u-full-width">
          <Image src={img} title="Bad Request!!!" />
        </div>

        <p><b>Sorry, but your page cannot be found...</b></p>

        <div>
          <a className="button" href="/">Go Back</a>
        </div>

      </PageWrap>

      <Footer />
    </div>
  )

};
