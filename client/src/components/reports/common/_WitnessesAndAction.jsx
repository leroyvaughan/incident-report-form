import React, { Fragment } from 'react';
import * as a from '../../styled/StyledComponents';

export default function WitnessesAndAction (props) {
  const formData = props.formData;



  return (
    <Fragment>
      <a.Row1>

        <a.DataWTopBrdr>
          <a.Lbl>Anti-Recurrence Action Taken?</a.Lbl>
          {formData.recurrenceAction || 'N/A'}
        </a.DataWTopBrdr>


        <a.DataWTopBrdr>
          <a.Lbl>Witnesses Present</a.Lbl>
          {formData.witnessesPresent || 'N/A'}
        </a.DataWTopBrdr>

      </a.Row1>
    </Fragment>
  )

};
