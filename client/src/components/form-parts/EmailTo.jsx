import React, { useContext, useState } from 'react';
import { FormDataContext } from '../../context/form-post-data';
import * as a from '../styled/StyledComponents';
import styled from 'styled-components';

const FieldNote = styled.div.attrs({
})`
  font-size: 1.2rem;
  color: #777;
`

const Tabbed = styled.span.attrs({
})`
  display: block;
  margin: 0 0 0 7px;
`



export default function EmailTo () {
  const { formData, addFormData } = useContext(FormDataContext);
  const [emailTo, setEmailTo] = useState(formData.emailTo || '');
  const [curStep, setStep] = useState('');
  const baseClass = 'u-full-width fld';
  const green = `${baseClass} green`;
  const red = `${baseClass} red`;
  const [cssClass, setClassName] = useState(baseClass);
  const [alertVis, setAlertVis] = useState('hidden');


  function backBtnClick() {
    setStep('attachments');
  }
  function nextBtnClick() {
    setStep('summaryView');
  }


  function handleSubmit(e) {
    e.preventDefault();
    setAlertVis('');

    let form = e.currentTarget;
    let curObj = form.elements.emailTo;
    let val = curObj.value;
    let canSubmit = ((isValidEmailTo(val)) || val === '');

    if(canSubmit) {
      addFormData([curObj.name, val]);
      addFormData(['curStep', curStep]);
      setAlertVis('hidden');
    }
  }


  //change handler for text field
  function changeHandler(e) {
    let formObj = e.currentTarget;
    let name = formObj.name, val = formObj.value;

    if (name === 'emailTo') {
      setEmailTo(val);

      setTxtFieldClass(val);
    }
  }


  function isValidEmailTo(str) {
    let regex = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/g;
    return regex.test(str);
  }
  function setTxtFieldClass(strIn) {
    let val = strIn || formData.emailTo;

    //only add email to form data if string is formatted correct!
    if (isValidEmailTo(val)) {
      setClassName(green);
    }
    else {
      setClassName(red);
    }
  }


  return (
    <a.Container>
      <div id="alert" className={alertVis}>
        <h2>Alert!</h2>
        <div>The email addresses are not formatted properly and may cause an error in delivery of this report. *When the text field turns green, the string is properly formatted.</div>
      </div>

      <form onSubmit={handleSubmit}>

        <a.Row>
          <div className="u-full-width">

            <label htmlFor="emailTo">
              This report will be sent to '<b>{formData.email}</b>'.<br />
              Using the field below, add any <u>other</u> email addresses you want this report sent to:
            </label>

            <FieldNote>*Please separate email addresses with commas:
              <Tabbed>me@me.com, you@you.com, them@them.com</Tabbed>
            </FieldNote>

            <input className={cssClass} type="text" name="emailTo"
              onChange={changeHandler} value={emailTo} />

          </div>
        </a.Row>

        <a.Row id="btns-wrap">
          <a.BackBtn onClick={backBtnClick} />

          <a.NextBtn onClick={nextBtnClick} />
        </a.Row>

      </form>
    </a.Container>

  )

};
