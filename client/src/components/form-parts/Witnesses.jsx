import React, { useContext, useState } from 'react';
import { FormDataContext } from '../../context/form-post-data';
import * as a from '../styled/StyledComponents';



export default function Witnesses (props) {
  const { formData, addFormData } = useContext(FormDataContext);
  const [witnessesPresent, setWitnesses] = useState(formData.witnessesPresent || '');
  const [curStep, setStep] = useState('');


  function backBtnClick() {
    setStep('recurrenceAction');
  }
  function nextBtnClick() {
    setStep('comments');
  }

  function handleSubmit(e) {
    e.preventDefault();

    let form = e.currentTarget;
    let curObj = form.elements.witnessesPresent;
    addFormData([curObj.name, curObj.value]);
    addFormData(['curStep', curStep]);
  }

  //change handler for text area
  function changeHandler(e) {
    let formObj = e.currentTarget;
    let name = formObj.name, val = formObj.value;

    addFormData([name, val]);

    if (name === 'witnessesPresent') {
      setWitnesses(val);
    }
  }



  return (
    <a.Container>
      <form onSubmit={handleSubmit}>

        <a.Row>
          <div className="u-full-width">
            <label htmlFor="witnessesPresent">
              <a.ReqFld />Were there any witnesses?&nbsp;
              <a.FieldInfoText>if so, please include any pertinent/contact information regarding them</a.FieldInfoText>:
            </label>

            <a.Container>
              <small className="fldInfoText">
                First &amp; Last Name, Age, Gender<br />
                Address, City, State, Phone <br />
                Estimated Height &amp; Weight <br />
                Hair Color, Ethnicity <br />
                Vehicle (make/model/year/plate #)
              </small>
            </a.Container>

            <a.TextArea name="witnessesPresent" onChange={changeHandler}
              value={witnessesPresent} required />

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
