import React, { useContext, useState } from 'react';
import { FormDataContext } from '../../context/form-post-data'
import * as _ from '../../misc/helpers';
import * as a from '../styled/StyledComponents';


export default function BasicInfo(props) {
  //add context here
  const { addFormData, formData } = useContext(FormDataContext);
  const [name, setName] = useState(formData.name || '');
  const [relationship, setRelationship] = useState(formData.relationship || '');
  const [phone, setPhone] = useState(formData.phone || '');
  const [email, setEmail] = useState(formData.email || '');
  const [briefDescription, setNotes] = useState(formData.briefDescription || '');

  //form submit handler
  function handleSubmit(e) {
    e.preventDefault();

    let form = e.currentTarget, curObj, formVal;

    for (let x = 0; x < form.elements.length; x++) {
      curObj = form[x];

      if(curObj.className.indexOf('fld') > -1) {
        if(curObj.value) {
          let key = curObj.name;
          formVal = curObj.value;
          addFormData([key, formVal]);
        }
      }
    }

    //now add today's date
    if(!formData.dateToday) {
      let d = _.getDateTimeStampObj();
      addFormData(['dateToday', d[0]]);
      addFormData(['dateObj', d]);
      // console.log("###\t adding dateToday...");
    }

    //for backend
    if(!formData.postAction)
      addFormData(['postAction', 'save']);

    addFormData(['curStep', 'details']);
  };

  //briefDescription text area
  function notesHandler(e) {
    if(e)
      e.preventDefault();

    let val = e.currentTarget.value;
    if(val.length > 149) {
      val = val.substr(0, 149);
      e.currentTarget.value = val;
    }

    addFormData(['briefDescription', val]);
    setNotes(val);
  }


  function changeHandler(e) {
    let formObj = e.currentTarget;
    let name = formObj.name, val = formObj.value;

    addFormData([name, val]);

    switch(name) {
      case 'name':
        setName(val)
        break;

      case 'relationship':
        setRelationship(val);
        break;

      case 'phone':
        setPhone(val);
        break;

      case 'email':
        setEmail(val);
        break;

      default:
    }
  }


  return (
    <a.Container>
      <form onSubmit={handleSubmit}>

        <a.Row>
          <div className="six columns">
            <label htmlFor="name"><a.ReqFld />Your Name:</label>

            <input className="u-full-width fld" type="text" name="name"
              placeholder="Your name here..."
              value={name} onChange={changeHandler} required />
          </div>

          <div className="six columns">
            <label htmlFor="relationship">
              <a.ReqFld />Relation to CFAN:&nbsp;
              <a.FieldInfoText>choose an option</a.FieldInfoText>
            </label>

            <select className="u-full-width fld" name="relationship" onChange={changeHandler}
              value={relationship}>
              <option value="security">Security</option>
              <option value="staff">Staff</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>
        </a.Row>

        <a.FormGroup>
          <center className="form-group-hdr">
              Your Contact Information:
          </center>

          <a.Row1>
            <div className="six columns">
              <label htmlFor="phone">
                <a.ReqFld />Phone&nbsp;
                <a.FieldInfoText>type 'none' if you don't have one</a.FieldInfoText>
                :</label>

              <input className="u-full-width fld" type="tel" name="phone"
                pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$"
                placeholder="253-555-1221" value={phone} onChange={changeHandler}
                required />
            </div>

            <div className="six columns">
              <label htmlFor="email"><a.ReqFld />Email:</label>

              <input className="u-full-width fld" type="email" name="email"
                pattern="^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,6})$"
                placeholder="you@yourdomain.com" value={email} onChange={changeHandler} required />
            </div>
          </a.Row1>

          <a.Row>
            <label htmlFor="briefDescription">
              <a.ReqFld />Brief Description:&nbsp;
              <a.FieldInfoText>150 character max</a.FieldInfoText>
            </label>
            <a.TextArea name="briefDescription" onChange={notesHandler} value={briefDescription}
              required></a.TextArea>
          </a.Row>

          <a.Row>
            <a.NextBtn />
          </a.Row>
        </a.FormGroup>

      </form>
    </a.Container>

  )
}