import React, { useContext, useEffect, useState } from 'react';
import * as Loader from './components/Spinner';
import Header from './components/Header';
import Footer from './components/Footer';
import { FormDataContext } from './context/form-post-data';
import * as Form from './components/form-parts/index';
import styled from 'styled-components';
import Spinner from './components/Spinner';




const SmallTxt = styled.p.attrs({
})`
  color: #ccc;
  font-weight: .9rem;
`


const refreshPage = (e) => {
  if (e) {
    e.preventDefault();
  }
  window.location.reload();
};




export default function App() {

  //GLOBAL STATE
  const { formData, addFormData } = useContext(FormDataContext);

  //LOCAL STATE
  const [basicInfo, setBasicInfo] = useState(false);
  const [details, setDetails] = useState(false);
  const [peopleInvolved, setPeopleInvolved] = useState(false);
  const [injuriesInvolved, setInjuriesInvolved] = useState(false);
  const [theftOrDamage, setTheftOrDamage] = useState(false);
  const [recurrenceAction, setRecurrenceAction] = useState(false);
  const [witnesses, setWitnesses] = useState(false);
  const [comments, setComments] = useState(false);
  const [emailTo, setEmailTo] = useState(false);
  const [attachments, setAttachments] = useState(false);
  const [summaryView, setSummaryView] = useState(false);
  const [isComplete, setCompleted] = useState(false);
  const [error, setError] = useState('');

  const showLoader = () => { Loader.Show(); }
  const hideLoader = () => { Loader.Hide(); }


  const reset = () => {
    setBasicInfo(false);
    setDetails(false);
    setPeopleInvolved(false);
    setInjuriesInvolved(false);
    setTheftOrDamage(false);
    setRecurrenceAction(false);
    setWitnesses(false);
    setComments(false);
    setEmailTo(false);
    setAttachments(false);
    setSummaryView(false);
  };


  const actualizar = () => {
    let curStep = formData.curStep;

    reset();

    switch (curStep) {
      case 'basicInfo':
        setBasicInfo(true);
        break;

      case 'details':
        setDetails(true);
        break;

      case 'peopleInvolved':
        setPeopleInvolved(true);
        break;

      case 'injuriesInvolved':
        setInjuriesInvolved(true);
        break;

      case 'theftOrDamage':
        setTheftOrDamage(true);
        break;

      case 'recurrenceAction':
        setRecurrenceAction(true);
        break;

      case 'witnesses':
        setWitnesses(true);
        break;

      case 'comments':
        setComments(true);
        break;

      case 'attachments':
        setAttachments(true);
        break;

      case 'emailTo':
        setEmailTo(true);
        break;

      case 'summaryView':
        setSummaryView(true);
        break;

      case 'done':
        submitForm();
        break;

      case 'error':
        // showError();
        //this logic handled in html code
        break;

      default:
        setBasicInfo(true);
    }
  }


  //SUBMIT THE DATA => HTTPPOST
  const submitForm = () => {

    if(!isComplete) {

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      };

      //set flag for double loading of component on state change
      setCompleted(true);

      showLoader();

      fetch('/api/incidentreport', requestOptions)
        .then((response) => {


          if(response.ok === false) {
            addFormData(['curStep', 'error']);
            setError("Form Submission Error! Please try again");
          }
          else {
            //refresh page in 7 seconds
            setTimeout(function() {
              refreshPage();
            }, 7000);
          }

        })
        .catch((err) => {
          addFormData(['curStep', 'error']);
          setError("Error during form submission!  Please try again.");
        })
        .finally(() => {
          hideLoader();
        });

    }
    else {
      // console.log("COMPLETE!!!!!!!!!!!!!!!!!!!!!!!")
    }
  };




  //runs on component render
  useEffect(() => {
    actualizar();
  });

  document.title = 'CFAN: Incident Report Form';



  return (
    <div id="App">

      <Loader.Spinner />

      <Header hdrTxt="Form" />

      { !isComplete && !error && !summaryView && (
        <div className="container">
          <div className="u-pull-right">
            <span className="req-fld">*</span>
              &nbsp;<small>Indicates a required field</small>
          </div>
        </div>
      )}


      <br />


      { basicInfo && <Form.BasicInfo/>}

      { details && <Form.Details /> }

      { peopleInvolved && <Form.PeopleInvolved /> }

      { injuriesInvolved && <Form.InjuriesInvolved /> }

      { theftOrDamage && <Form.TheftOrDamage /> }

      { recurrenceAction && <Form.RecurrenceAction /> }

      { witnesses && <Form.Witnesses /> }

      { comments && <Form.Comments /> }

      { attachments && <Form.Attachments /> }

      { emailTo && <Form.EmailTo /> }

      { summaryView && <Form.SummaryView /> }


      { isComplete && (
        <div className="container">

          { !error && (
            <p>Your Incident Report has been filed!  Thanks!</p>
          )}

          { error && (
            <p className="err-txt">{error}</p>
          )}

          <center>
            <p>
              <button onClick={refreshPage}>refresh page</button>
            </p>
          </center>

          { !error && (
            <center>
              <SmallTxt>page will reload shortly...</SmallTxt>
            </center>
          )}

        </div>
      )}

      <Footer />

    </div>
  );
}
