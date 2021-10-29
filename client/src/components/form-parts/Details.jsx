import React, { useContext, useState } from 'react';
import { FormDataContext } from '../../context/form-post-data';
import * as a from '../styled/StyledComponents';




//COMPONENT OBJECT/ FUNCTIONAL COMPONENT
export default function Details(props) {
  //add context here
  const { formData, addFormData } = useContext(FormDataContext);
  const today = formData.dateToday;

  const [incidentDate, setDate] = useState(formData.incidentDate || '');
  const [incidentTime, setTime] = useState(formData.incidentTime || '');
  const [incidentDescription, setDesc] = useState(formData.incidentDescription || '');

  const [curStep, setStep] = useState('');


  function backBtnClick() {
    setStep('basicInfo');
  }
  function nextBtnClick() {
    setStep('peopleInvolved');
  }

  function handleSubmit(e) {
    e.preventDefault();
    let form = e.currentTarget, curObj;

    for (let x = 0; x < form.elements.length; x++) {
      curObj = form[x];

      if (curObj.className.indexOf('fld') > -1) {
        if (curObj.value) {
          addFormData([curObj.name, curObj.value]);
        }
      }
    }

    addFormData(['curStep', curStep]);
  }


  function changeHandler(e) {
    let formObj = e.currentTarget;
    let name = formObj.name, val = formObj.value;

    addFormData([name, val]);

    switch(name) {
      case 'incidentDate':
        setDate(val);
        break;

      case 'incidentTime':
        setTime(val);
        break;

      case 'incidentDescription':
        setDesc(val);
        break;

      default:
    }

  }


  return (
    <a.Container>
      <form onSubmit={handleSubmit}>

        <a.Row1>
          <div className="six columns">
            <label htmlFor="incidentDate">
              <a.ReqFld />What is the Date of Incident?
            </label>

            <input className="fld" type="date"
              name="incidentDate" min="2020-01-01" max={today}
              onChange={changeHandler} value={incidentDate} required />
          </div>

          <div className="six columns">
            <label htmlFor="incidentTime">
              <a.ReqFld />What time did the incident occur?
            </label>

            <input className="fld" type="time" name="incidentTime"
              onChange={changeHandler} value={incidentTime} required />
          </div>
        </a.Row1>

        <a.Row>
          <div className="u-full-width">
            <label htmlFor="incidentDescription"><a.ReqFld />Describe the incident that occurred:&nbsp;
              <a.FieldInfoText>use as much detail as possible, please</a.FieldInfoText>:
            </label>

            <a.TextArea name="incidentDescription"
              onChange={changeHandler} value={incidentDescription} required />
          </div>
        </a.Row>

        <a.Row id="btns-wrap">
          <a.BackBtn onClick={backBtnClick} />

          <a.NextBtn onClick={nextBtnClick} />
        </a.Row>

      </form>
    </a.Container>
  )



}