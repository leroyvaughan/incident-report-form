import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as Loader from '../Spinner';
import Header from '../Header';
import Footer from '../Footer';
import * as a from '../styled/StyledComponents';
import styled from 'styled-components';

import BasicInfo from './common/_BasicInfo';
import Details from './common/_Details';
import WitnessesAndAction from './common/_WitnessesAndAction';
import InjuriesAndTheftOrDmg from './common/_InjuriesAndTheftOrDmg';
import Comments from './common/_Comments';
import Attachments from './common/_Attachments';
import EmailTo from './common/_EmailTo';



const ALink = styled(Link).attrs({
  className: 'button',
  id: 'new-btn'
})`
  &:hover {
    background-color: #444;
    color: #fff;
  }
`

const ErrText = styled.p.attrs({
})`
  color: red;
  font-size: 2rem;
  font-weight: bold;
`


export default function ReportView (props) {
  const [errMsg, setError] = useState(false);
  const [reportID] = useState(props.match.params.id);
  const [report, setData] = useState(false);
  const hdrTxtStr = `# ${reportID}`;
  const [showBackBtn, setBackBtnVis] = useState(false);
  const [showEditBtn, setEditBtnVis] = useState(false);

  const showLoader = () => { Loader.Show(); }
  const hideLoader = () => { Loader.Hide(); }


  useEffect(() => {

    if((document.referrer.indexOf("/reports/all") > 0) ||
        document.referrer.indexOf("/reports/edit") > 0) {
      setBackBtnVis(true);
      setEditBtnVis(true);
    }
    else {
      setBackBtnVis(false);
      setEditBtnVis(false);
    }

    const getData = async () => {

      try {
        showLoader();

        //ajax call to back end
        let response = await fetch(`/api/incidentreport/${reportID}`);
        document.title = 'CFAN: Incident Report #' + reportID;

        if(response.ok) {
          let elReporto = await response.json();
          setData(elReporto);
        }
        else {
          setError("Invalid Report ID!");
        }
      }
      catch (e) {
        console.log("err: ", e);
        setError("Error on Page Load!");
      }
      finally {
        hideLoader();
      }
    };

    getData();

  }, [reportID]);










  return (
    <div id="report-view">

      <Loader.Spinner />

      <Header hdrTxt={hdrTxtStr}/>

      { errMsg && (
        <center>
          <br />
          <ErrText>{errMsg}</ErrText>
        </center>
      )}


      { !errMsg && report && (
        <a.Container>
          <BasicInfo formData={report} />

          <Details formData={report} />

          { (report.incidentInjuries || report.theftOrDamage) && (
            <InjuriesAndTheftOrDmg formData={report} />
          )}

          { (report.recurrenceAction || report.witnessesPresent) && (
            <WitnessesAndAction formData={report} />
          )}

          { report.comments && (
            <Comments formData={report} />
          )}

          { report.attachments && (
            <Attachments formData={report} />
          )}


          { report.emailTo && (
            <EmailTo formData={report} flag='reportView' />
          )}

          <a.Row className="btn-wrap">
            <ALink to="/">
              File A New Report
            </ALink>

            &nbsp;&nbsp;

            { showBackBtn && (
              <ALink to="/reports/all" className="backBtn">
                Back to Master List
              </ALink>
            )}

            &nbsp;&nbsp;

            { showEditBtn && (
              <ALink to={`/reports/edit/${reportID}`}className="backBtn">Edit Report</ALink>
            )}

          </a.Row>
        </a.Container>
      )}

      <Footer />


    </div>
  )

};
