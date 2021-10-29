import React, { useContext, useState } from 'react';
import { FormDataContext } from '../../context/form-post-data';
import * as a from '../styled/StyledComponents';



export default function RecurrenceAction (props) {
  const { formData, addFormData } = useContext(FormDataContext);
  const [recurrenceAction, setAction] = useState(formData.recurrenceAction || '');
  const [curStep, setStep] = useState('');


  function backBtnClick() {
    setStep('theftOrDamage');
  }
  function nextBtnClick() {
    setStep('witnesses');
  }


  function handleSubmit(e) {
    e.preventDefault();

    let form = e.currentTarget;
    let curObj = form.elements.recurrenceAction;
    addFormData([curObj.name, curObj.value]);
    addFormData(['curStep', curStep]);
  }


  function changeHandler(e) {
    let formObj = e.currentTarget;
    let name = formObj.name, val = formObj.value;

    addFormData([name, val]);

    if(name === 'recurrenceAction') {
      setAction(val);
    }
  }


  return (
    <a.Container>
      <form onSubmit={handleSubmit}>

        <a.Row>
          <div className="u-full-width">
            <label htmlFor="recurrenceAction">
              Describe any action taken to prevent a recurrence of the incident:
            </label>

            <a.TextArea name="recurrenceAction" onChange={changeHandler} value={recurrenceAction} />
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
