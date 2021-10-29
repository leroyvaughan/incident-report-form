import React, { Fragment } from 'react';
import * as a from '../../styled/StyledComponents';
import * as _ from '../../../misc/helpers';


export default function BasicInfo (props) {
  const formData = props.formData;

  return (
    <Fragment>

      <a.Row>
        <div>
          <a.Lbl>Your relationship to CFAN</a.Lbl>
          {_.toProper(formData.relationship)}
        </div>
      </a.Row>

      <a.Row>
        <a.SixCols>
          <div>
            <a.Lbl>Your Name</a.Lbl>
            {formData.name}
          </div>

          <div>
            <a.Lbl>Report filed on</a.Lbl>
            {formData.dateToday}
          </div>
        </a.SixCols>


        <a.SixCols>
          <div>
            <a.Lbl>Phone</a.Lbl>
            {formData.phone}
          </div>

          {formData.email && (
            <div>
              <a.Lbl>Email</a.Lbl>
              { formData.email}
            </div>
          )}
        </a.SixCols>
      </a.Row>

      <a.Row1>
        <a.Lbl>Brief Description of Report</a.Lbl>
        {formData.briefDescription}
      </a.Row1>


    </Fragment>
  )
};
