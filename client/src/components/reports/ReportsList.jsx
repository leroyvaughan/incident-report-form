import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Loader from '../Spinner';
import Header from '../Header';
import Footer from '../Footer';
import * as a from '../styled/StyledComponents';
import * as _ from '../../misc/helpers';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import styled from 'styled-components';
import './reportsList.css';

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

const TableWrap = styled.div`
  margin: 42px auto;
  width: 93%;
`


export default function ReportsList (props) {
  const [errMsg, setError] = useState(false);
  const [reportsList, setData] = useState(false);

  document.title = 'CFAN: Incident Reports List';

  const showLoader = () => { Loader.Show(); }
  const hideLoader = () => { Loader.Hide(); }



  const getData = async () => {
    try {
      showLoader();

      //ajax call to back end
      let response = await fetch(`/api/incidentreports`);

      if (response.ok) {
        let elReportos = await response.json();
        setData(elReportos.data);
      }
      else {
        setError("Database Error!");
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



  useEffect(() => {
    getData();
  }, []);



  // console.log(reportsList, reportsList[0]);






  return (
    <div id="report-view">

      <Loader.Spinner />

      <Header newHdrTxt="Incident Reports Master List" />

      { errMsg && (
        <center>
          <br />
          <ErrText>{errMsg}</ErrText>
        </center>
      )}


      { !errMsg && reportsList && (
        <TableWrap>

          <Table>
            <Thead>
              <Tr>
                <Th>Report ID</Th>
                <Th className="no-wrap">Date Filed</Th>
                <Th>Reported By</Th>
                <Th className="no-wrap">Incident Date</Th>
                <Th>Briefing</Th>
              </Tr>
            </Thead>
            <Tbody>
              { reportsList.map((rpt, ix) => {
                let viewUrl = `/reports/view/${rpt.reportID}`;
                let editUrl = `/reports/edit/${rpt.reportID}`;

                return (
                  <Tr key={ix}>
                    <Td>
                      <a className="view-link" href={viewUrl} title="View" alt="">{rpt.reportID}</a>
                      <div>
                        <a className="edit-link" href={editUrl} title="Edit" alt="">
                          edit
                        </a>
                      </div>
                    </Td>

                    <Td className="no-wrap">{rpt.dateToday}</Td>

                    <Td>{rpt.name}</Td>

                    <Td className="no-wrap">
                      {rpt.incidentDate}<br/>
                      {_.getFormattedTime(rpt.incidentTime)}
                    </Td>

                    <Td>{rpt.briefDescription}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>


          <a.Row>
            <ALink to="/">
              File A New Report
            </ALink>

          </a.Row>
        </TableWrap>

      )}

      <Footer />



    </div>
  )

};
