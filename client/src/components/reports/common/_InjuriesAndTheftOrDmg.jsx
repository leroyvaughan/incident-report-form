import React, { Fragment } from 'react';
import * as a from '../../styled/StyledComponents';


export default function InjuriesAndTheftOrDmg (props) {
  const formData = props.formData;

  return (
    <Fragment>
      <a.Row1>

        <a.DataWTopBrdr>

          <div>
            <a.Lbl>Injuries Involved?</a.Lbl>
            {formData.injuriesInvolved || 'N/A'}
          </div>

          <br />

          <div>
            <a.Lbl>Injuries Response</a.Lbl>
            {formData.injuriesResponse || 'N/A'}
          </div>

        </a.DataWTopBrdr>


        <a.DataWTopBrdr>
          <a.Lbl>Theft or Damage?</a.Lbl>
          {formData.theftOrDamage || 'N/A'}
        </a.DataWTopBrdr>

      </a.Row1>
    </Fragment>
  )

};
