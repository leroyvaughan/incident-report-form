import React, { useContext, useState } from 'react';
import { FormDataContext } from '../../context/form-post-data';
import * as a from '../styled/StyledComponents';

import BasicInfo from './common/_BasicInfo';
import Details from './common/_Details';
import WitnessesAndAction from './common/_WitnessesAndAction';
import InjuriesAndTheftOrDmg from './common/_InjuriesAndTheftOrDmg';
import Comments from './common/_Comments';
import Attachments from './common/_Attachments';
import EmailTo from './common/_EmailTo';



export default function SummaryView () {
  const { formData, addFormData } = useContext(FormDataContext);
  const [curStep, setStep] = useState('');


  function backBtnClick() {
    setStep('emailTo');
  }
  function nextBtnClick() {
    setStep('done');
  }



  function handleSubmit(e) {
    e.preventDefault();
    addFormData(['curStep', curStep]);
  }

  return (
    <form onSubmit={handleSubmit}>
      <a.Container>
        <div className="u-full-width lit-hdr">
          Summary View
        </div>

        <br />

        <BasicInfo formData={formData} />

        <Details formData={formData} />

        { (formData.incidentInjuries || formData.theftOrDamage) && (
          <InjuriesAndTheftOrDmg formData={formData} />
        )}

        { (formData.recurrenceAction || formData.witnessesPresent) && (
          <WitnessesAndAction formData={formData} />
        )}

        { formData.comments && (
          <Comments formData={formData} />
        )}

        { formData.attachments && (
          <Attachments formData={formData} />
        )}

        { formData.emailTo && (
          <EmailTo formData={formData} flag="summaryView" />
        )}



        <a.Row id="btns-wrap">
          <a.BackBtn onClick={backBtnClick} />

          <button className="button next-btn" onClick={nextBtnClick}>Submit</button>
        </a.Row>

      </a.Container>
    </form>

  )

};
