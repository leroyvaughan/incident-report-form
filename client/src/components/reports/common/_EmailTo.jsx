import React, { Fragment, useState, useEffect } from 'react';
import * as a from '../../styled/StyledComponents';


export default function EmailTo (props) {
  const formData = props.formData;
  const flag = props.flag;
  const [verb, setVerbTense] = useState('will');


  useEffect(() => {

    if(flag === 'summaryView') {
      setVerbTense('will also be');
    }
    else {
      setVerbTense('was also');
    }

  }, [flag])

  return (
    <Fragment>

      <a.Row1>
        <a.Lbl>This Incident Report {verb} emailed to</a.Lbl>
        {formData.emailTo}
      </a.Row1>

    </Fragment>
  )
};
