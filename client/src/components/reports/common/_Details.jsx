import React, { Fragment } from 'react';
import * as a from '../../styled/StyledComponents';
import * as _ from '../../../misc/helpers';

export default function Details (props) {
  const formData = props.formData;

  return (
    <Fragment>

      <a.Row1>
        <a.DataWTopBrdr>
          <div>
            <a.Lbl>Incident Occurred On</a.Lbl>
            {formData.incidentDate} @ {_.getFormattedTime(formData.incidentTime)}
          </div>

          <div>
            <a.Lbl>Incident Description</a.Lbl>
            {formData.incidentDescription}
          </div>
        </a.DataWTopBrdr>

        <a.DataWTopBrdr>
          <a.Lbl>Persons Involved</a.Lbl>
          {formData.personsInvolved}
        </a.DataWTopBrdr>
      </a.Row1>

    </Fragment>
  )
};
