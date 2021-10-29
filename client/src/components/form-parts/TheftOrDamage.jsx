import React, { useContext, useState } from 'react';
import { FormDataContext } from '../../context/form-post-data';
import * as a from '../styled/StyledComponents';



export default function TheftOrDamage (props) {
  const { formData, addFormData } = useContext(FormDataContext);
  const [theftOrDmg, setTheftDmg] = useState(formData.theftOrDamage || '');
  const [curStep, setStep] = useState('');


  function backBtnClick() {
    setStep('injuriesInvolved');
  }
  function nextBtnClick() {
    setStep('recurrenceAction');
  }



  function handleSubmit(e) {
    e.preventDefault();

    let form = e.currentTarget;
    let curObj = form.elements.theftOrDamage;
    addFormData([curObj.name, curObj.value]);
    addFormData(['curStep', curStep]);
  }


  //change handler for text area
  function changeHandler(e) {
    let formObj = e.currentTarget;
    let name = formObj.name, val = formObj.value;

    addFormData([name, val]);

    if(name === 'theftOrDamage') {
      setTheftDmg(val);
    }
  }




  return (
    <a.Container>
      <form onSubmit={handleSubmit}>

        <a.Row>
          <div className="u-full-width">
            <label htmlFor="theftOrDamage">
              Did Theft or Damage Occur?&nbsp;
              <a.FieldInfoText>if so, please describe property lost and it's value</a.FieldInfoText>
            </label>

            <a.TextArea name="theftOrDamage" onChange={changeHandler} value={theftOrDmg} />
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
