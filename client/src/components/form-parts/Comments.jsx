import React, { useContext, useState } from 'react';
import { FormDataContext } from '../../context/form-post-data';
import * as a from '../styled/StyledComponents';



export default function Comments () {
  const { formData, addFormData } = useContext(FormDataContext);
  const [comments, setComments] = useState(formData.comments || '');
  const [curStep, setStep] = useState('');


  function backBtnClick() {
    setStep('witnesses');
  }
  function nextBtnClick() {
    setStep('attachments');
  }


  function handleSubmit(e) {
    e.preventDefault();

    let form = e.currentTarget;
    let curObj = form.elements.comments;
    addFormData([curObj.name, curObj.value]);
    addFormData(['curStep', curStep]);
  }

  //change handler for text area
  function changeHandler(e) {
    let formObj = e.currentTarget;
    let name = formObj.name, val = formObj.value;

    addFormData([name, val]);

    if (name === 'comments') {
      setComments(val);
    }
  }


  return (
    <a.Container>
      <form onSubmit={handleSubmit}>

        <a.Row>
          <div className="u-full-width">
            <label htmlFor="comments">
              Your comments/final summary:
            </label>

            <a.TextArea name="comments" onChange={changeHandler} value={comments} />

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
