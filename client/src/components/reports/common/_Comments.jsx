import React, { Fragment } from 'react';
import * as a from '../../styled/StyledComponents';


export default function Comments (props) {
  const formData = props.formData;

  return (
    <Fragment>

      <a.Row1 className="top-border">
        <a.Lbl>Comments</a.Lbl>
        {formData.comments}
      </a.Row1>

      <br/>

    </Fragment>
  )
};
