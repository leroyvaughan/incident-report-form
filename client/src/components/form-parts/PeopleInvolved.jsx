import React, { useContext, useState } from 'react';
import { FormDataContext } from '../../context/form-post-data';
import * as a from '../styled/StyledComponents';



export default function PeopleInvolved (props) {
  const { formData, addFormData } = useContext(FormDataContext);
  const [personsInvolved, setPersonsInvolved] = useState(formData.personsInvolved || '');
  const [curStep, setStep] = useState('');



  function backBtnClick() {
    setStep('details');
  }
  function nextBtnClick() {
    setStep('injuriesInvolved');
  }



  function handleSubmit(e) {
    e.preventDefault();

    let form = e.currentTarget;
    let curObj = form.elements.personsInvolved;
    addFormData([curObj.name, curObj.value]);
    addFormData(['curStep', curStep]);
  }


  function changeHandler(e) {
    let formObj = e.currentTarget;
    let name = formObj.name, val = formObj.val;

    addFormData([name, val]);

    if(name === 'personsInvolved') {
      setPersonsInvolved(val);
    }
  }





  return (
    <a.Container>
      <form onSubmit={handleSubmit}>

        <a.Row>
          <div className="u-full-width">
            <label htmlFor="personsInvolved">
              <a.ReqFld />Persons Involved&nbsp;
              <a.FieldInfoText>please include any contact/pertinent information of those involved</a.FieldInfoText>:
            </label>

            <a.Container>
              <a.FieldInfoText>
                First &amp; Last Name, Age, Gender<br />
                Address, City, State, Phone <br />
                Estimated Height &amp; Weight <br />
                Hair Color, Ethnicity <br />
                Vehicle Make/Model/Year/Plate #
              </a.FieldInfoText>
            </a.Container>

            <br />

            <a.TextArea name="personsInvolved" onChange={changeHandler}
              value={personsInvolved} required />

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
