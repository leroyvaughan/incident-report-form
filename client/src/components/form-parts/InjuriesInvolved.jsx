import React, { useContext, useState } from 'react';
import { FormDataContext } from '../../context/form-post-data';
import * as a from '../styled/StyledComponents';



export default function InjuriesInvolved (props) {
  const { formData, addFormData } = useContext(FormDataContext);

  const [injuriesInvolved, setInjuries] = useState(formData.injuriesInvolved || '');
  const [injuriesResponse, setResponse] = useState(formData.injuriesResponse || '');

  const [curStep, setStep] = useState('');


  function backBtnClick() {
    setStep('peopleInvolved');
  }
  function nextBtnClick() {
    setStep('theftOrDamage');
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

    switch (name) {
      case 'injuriesInvolved':
        setInjuries(val);
        break;

      case 'injuriesResponse':
        setResponse(val);
        break;

      default:
    }
  }



  return (
    <a.Container>
      <form onSubmit={handleSubmit}>

        <a.Row1>
          <div className="u-full-width">
            <label htmlFor="injuriesInvolved">
              Was anyone injured?&nbsp;
              <a.FieldInfoText>if so, please describe</a.FieldInfoText>:
            </label>

            <a.TextArea name="injuriesInvolved" onChange={changeHandler}
              value={injuriesInvolved} />
          </div>
        </a.Row1>

        <a.Row>
          <div className="u-full-width">
            <label htmlFor="injuriesResponse">
              If injuries occurred, please describe action taken or treatment given&nbsp;
              <a.FieldInfoText>First Aid, 911 Call, Hospital Visit, etc.</a.FieldInfoText>:
            </label>

            <a.TextArea name="injuriesResponse" onChange={changeHandler}
              value={injuriesResponse} />
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
