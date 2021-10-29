import React, { Component } from 'react';
import * as Loader from '../Spinner';
import Header from '../Header';
import Footer from '../Footer';
import * as a from '../styled/StyledComponents';
import styled from 'styled-components';
import * as _ from '../../misc/helpers';


const FormPartsHdr = styled.h5`
  background-color: #eee;
  border: 1px solid #999;
  border-width: 1px 0;
  color: #3F51B5;
  margin-top: 21px;
  text-align: center;
`

const FadeWrap = styled.div`
  color: #777;
`

const FormParts = styled.div.attrs({
  className: 'form-group'
})`
    padding: 0;
    margin: 7px 21px 21px;
`

const BtnHdr = styled.p`
  color: green;
  font-weight: bold;
  margin-top: 121px;
`

const Tabbed = styled.div`
  padding-left: 7px;
`

const SubmitBtn = styled.button.attrs({
  className: 'button next-btn',
  type: 'submit',
})`
  &:after {
    content: 'Update';
  }
`

const ErrMsg = styled.div`
  color: red;
  font-weight: bold;
  text-align: center;
`



/*
  Attachments Code
*/

const ErrTxt = styled.div.attrs({
  className: 'err-txt'
})`
  display: none;
  font-size: 2.1rem;
`
const ImgFileName = styled.div`
  color: #607D8B;
  display: none;
  font-style: italic;
  font-weight: bold;
`
const Row1 = styled.div.attrs({
  className: 'row'
})`
  margin-bottom: 42px;
`

const Label = styled.div`
  background-color: #e1e1e1;
  border: 1px solid #aba;
  border-width: 1px 0;
  font-weight: bold;
  margin: 12px 0;
  padding: 3px 0 3px 3px;
`

const InnerWrap = styled.div`
  padding-left: 7px;
`

const ImgLinks = styled.div`
  font-weight: 1.2rem;
  display: none;

  span {
    cursor: pointer;
    display: inline;
    text-decoration: underline;
    margin: 0 4px;
  }
`






// export default function EditReport(props) {
class EditReport extends Component {
  constructor(props) {
    super(props)

    this.state = {
      reportID: props.match.params.id,
      formData: { postAction: 'update' },
      error: false,
      summaryView: false,
      today: '',
      stdErr: "Error during form submission! Please try again.",
      cancelFlag: false
    }
  }

  showLoader() { Loader.Show(); }
  hideLoader() { Loader.Hide(); }


  componentDidMount = async () => {
    try {
      this.showLoader();

      //set title
      document.title = 'CFAN: Edit Incident Report'
      //set max date for datePicker
      let d = _.getDateTimeStampObj();
      this.setState({ today: d[0] });

      //ajax call to back end
      const { reportID } = this.state;
      let response = await fetch(`/api/incidentreport/${reportID}`);

      //Successful AJAX Call
      if (response.ok) {
        let elReporto = await response.json();

        //add the Incident Report to state
        this.setState({
          formData: { ...this.state.formData, ...elReporto }
        });


        //show Preview Images
        //if there are imgs in state object
        try {
          const imgsObj = this.state.formData.attachments;
          const len = Object.keys(imgsObj).length;

          if (len > 0) {

            let curObj = {};
            Object.keys(imgsObj).forEach((key) => {
              curObj = imgsObj[key];
              this.showPreviewImg(key, curObj.base64String);
              this.toggleFieldDesc(key, curObj.imgName);
              // console.log("curObj", curObj);
            });
          }
      }
      catch(e) {
        //do nothing here...no images.
      }

      }
      else {
        this.setError("Invalid Report ID!");
      }
    }
    catch (e) {
      this.setError("Error on Page Load!: " + e);
    }
    finally {
      this.hideLoader();
    }
  };


  setError(err) {
    this.setState({
      error: err
    });
    console.log("ERR: ", err);
  }



  //SUBMIT THE DATA => HTTPPOST
  handleSubmit = (e) => {
    e.preventDefault();
    this.showLoader();

    const { formData, stdErr, reportID } = this.state;
    const dataOut = JSON.stringify(formData);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: dataOut
    };

    //updating...
    fetch('/api/incidentreport', requestOptions)
      .then((response) => {
        if(response.ok === false) {
          this.setError(stdErr);
        }
        else {
          let url = '/reports/view/' + reportID;
          document.location.href = url;
        }

      })
      .catch((err) => {
        this.setError(stdErr);
      })
      .finally(() => {
        this.hideLoader();
      });
  };


  editLink = (e) => {
    let imgFld = e.currentTarget;
    const key = this.getImgKey(imgFld.id);
    this.toggleFieldDesc(key);
  }
  removeLink = (e) => {
    const key = this.getImgKey(e.currentTarget.id);
    this.elem(key).value = null;
    this.showPreviewImg(key, false);
    this.toggleFieldDesc(key);
    this.removeAttachedImage(key);

  };

  removeAttachedImage(key) {
    let curObj = this.state.formData.attachments;
    delete curObj[key];

    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        'attachments': curObj
      }
    }));
  }

  //get img key, ie: img1, img2
  getImgKey(strIn) {
    console.log("getKey()...");
    return strIn.substr(0, 4);
  }

  //img file >> base64
  getBase64(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (err) => reject('Error: ', err);
    });
  }
  //will hide errDiv or show with errMsg
  setErrorDiv(name, errMsg) {
  let divName = `${name}-err`;
  let errDiv = this.elem(divName);
  errDiv.style.display = 'none';

  if (errMsg) {
    errDiv.innerHTML = errMsg;
    errDiv.style.display = 'block';
  }
}

//not so verbose htmlElem get
elem(elem) {
  return document.getElementById(elem);
};

//if img's in state, show them
showPreviewImg(key, imgStr) {
  let imgView = this.elem(key + '-preview');

  if (imgStr) {
    let img = new Image();
    img.src = imgStr;
    img.className = 'preview-img';
    imgView.innerHTML = img.outerHTML;
    imgView.style.display = 'block';
    return;
  }

  //hide if no src img/data
  imgView.style.display = 'none';
};

//show/hide #key and #fileName
toggleFieldDesc(key, imgName) {
  let input = this.elem(key);
  let fileName = this.elem(key + '-fileName');
  let imgLinks = this.elem(key + '-links');


  if (!imgName) {
    //show input field
    input.style.display = 'block';

    //hide file name
    fileName.style.display = 'none';

    //hide links: edit/remove
    imgLinks.style.display = 'none';
  }
  else {
    //hide input
    input.style.display = 'none';

    //show file name
    fileName.style.display = 'block';
    fileName.innerHTML = imgName;

    //show links
    imgLinks.style.display = 'block';
  }
};

//check file extension
validateFile(fileName) {
  var exts_allowed = ["png", "jpeg", "jpg", "jfif"];
  var file_ext = fileName.split('.').pop();
  for (var i = 0; i <= exts_allowed.length; i++) {
    if (exts_allowed[i] === file_ext.toLowerCase()) {
      return true; // valid file extension
    }
  }

  return false;
};





  //### Form Field onChange events...
  addDataNodeToState(name, val) {
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: val
      }
    }));

    //same thing here...
    // this.setState({
    //   formData: { ...this.state.formData, [name]: val }
    // });
  }

  changeHandler = (e) => {
    let formObj = e.currentTarget;
    this.addDataNodeToState(formObj.name, formObj.value);
  };

  attachmentsChangeHandler = (e) => {
    let formObj = e.currentTarget;
    let name = formObj.name, val = formObj.files[0];
    let errMsg = false;

    //no file selected!
    if (!val) {
      this.setErrorDiv(name);
      this.removeAttachedImage(name);
      return;
    }

    //check file extension
    if (!this.validateFile(val.name)) {
      errMsg = 'Invalid file extension!';
      this.setErrorDiv(name, errMsg);
      return;
    }

    //check size! //10mb max <= 16mb max in mongodb
    if (val.size > 10485760) {
      errMsg = 'File exceeds maximum file size!';
      this.setErrorDiv(name, errMsg);
      return;
    }

    //we have file of right size...
    this.getBase64(val)
      .then((imgStr) => {

        try {
          //remove any visible field errors
          this.setErrorDiv(name);

          //show preview img
          this.showPreviewImg(name, imgStr);
          this.toggleFieldDesc(name, val.name);

          //put into state
          let curObj = this.state.formData.attachments || {};
          curObj[name] = {
            base64String: imgStr,
            imgName: val.name,
            imgSize: val.size,
            imgType: val.type
          };

          this.addDataNodeToState("attachments", curObj);
        }
        catch (e) {
          this.setErrorDiv(name, e);
        }
      })
      .catch((err) => {
        this.setErrorDiv(name, err);
      });

  }


  // componentDidUpdate() {
  //   console.log(this.state.formData);
  // }



  //### briefDescription textArea
  notesHandler = (e) => {
    if (e)
      e.preventDefault();

    let val = e.currentTarget.value;
    if (val.length > 149) {
      val = val.substr(0, 149);
      e.currentTarget.value = val;
    }

    this.setState({
      formData: { ...this.state.formData, 'briefDescription': val }
    });
  }









  render() {
    const { formData, reportID, error, summaryView, today } = this.state;

    return (
      <div id="App" className="edit-report">

        <Loader.Spinner />

        <Header newHdrTxt={`Edit Incident Report: ${reportID}`} />


        { error && (
          <div className="container err">
            <ErrMsg>{error}</ErrMsg>
          </div>
        )}


        { !summaryView && !error && (
          <div className="container">
            <div className="u-pull-right">
              <span className="req-fld">*</span>
                &nbsp;<small>Indicates a required field</small>
            </div>

            <br />

            <form onSubmit={this.handleSubmit}>

              <FormParts>
                <FormPartsHdr>Basic Info</FormPartsHdr>
                <a.Row>
                  <div className="six columns">
                    <label htmlFor="name"><a.ReqFld />Your Name:</label>

                    <input className="u-full-width" type="text" name="name"
                      value={formData.name || ''} onChange={this.changeHandler} required />
                  </div>

                  <div className="six columns">
                    <label htmlFor="relationship"><a.ReqFld />Relation to CFAN:</label>

                    <select className="u-full-width" name="relationship"
                    onChange={this.changeHandler} value={formData.relationship}>
                      <option value="security">Security</option>
                      <option value="staff">Staff</option>
                      <option value="volunteer">Volunteer</option>
                    </select>
                  </div>
                </a.Row>

                  <a.Row1>
                    <div className="six columns">
                      <label htmlFor="phone"><a.ReqFld />Phone:</label>

                      <input className="u-full-width" type="tel" name="phone"
                        pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$"
                        placeholder="253-555-1221" value={formData.phone || ''}
                        onChange={this.changeHandler}
                        required />
                    </div>

                    <div className="six columns">
                      <label htmlFor="email"><a.ReqFld />Email:</label>

                      <input className="u-full-width" type="email" name="email"
                        pattern="^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,6})$" value={formData.email || ''}
                        onChange={this.changeHandler} required />
                    </div>
                  </a.Row1>

                  <a.Row>
                    <label htmlFor="briefDescription">
                      <a.ReqFld />Brief Description:&nbsp;
                      <a.FieldInfoText>150 character max</a.FieldInfoText>
                    </label>

                    <a.TextArea name="briefDescription" value={formData.briefDescription}
                      onChange={this.notesHandler} required></a.TextArea>
                  </a.Row>

              </FormParts>{/*  END: BasicInfo  */}



              <FormParts>
                <FormPartsHdr>Incident Details</FormPartsHdr>
                <a.Row1>
                  <div className="six columns">
                    <label htmlFor="incidentDate"><a.ReqFld />Incident Date:</label>

                    <input type="date" name="incidentDate" min="2020-01-01" max={today}
                      value={formData.incidentDate || ''} onChange={this.changeHandler}
                      required />
                  </div>

                  <div className="six columns">
                    <label htmlFor="incidentTime"><a.ReqFld />Incident Time:</label>

                    <input type="time" name="incidentTime" onChange={this.changeHandler}
                      value={formData.incidentTime || ''} required />
                  </div>
                </a.Row1>

                <a.Row>
                  <div className="u-full-width">
                    <label htmlFor="incidentDescription">
                      <a.ReqFld />Incident Description:&nbsp;
                    </label>

                    <a.TextArea name="incidentDescription" onChange={this.changeHandler}
                      value={formData.incidentDescription || ''} required />
                  </div>
                </a.Row>
              </FormParts>


              <FormParts>
                <FormPartsHdr>Persons Involved</FormPartsHdr>
                <a.Row>
                  <label htmlFor="personsInvolved"><a.ReqFld />Persons Involved:</label>

                  <a.TextArea name="personsInvolved" onChange={this.changeHandler}
                    value={formData.personsInvolved || ''} required />
                </a.Row>
              </FormParts>


              <FormParts>
                <FormPartsHdr>Injuries Involved</FormPartsHdr>
                  <a.Row1>
                    <label htmlFor="injuriesInvolved">Injuries Description:</label>

                    <a.TextArea name="injuriesInvolved" onChange={this.changeHandler}
                      value={formData.injuriesInvolved || ''} />
                  </a.Row1>

                  <a.Row>
                    <label htmlFor="injuriesResponse">
                      Action taken or treatment given:</label>

                    <a.TextArea name="injuriesResponse" onChange={this.changeHandler}
                      value={formData.injuriesResponse || ''} />
                  </a.Row>
              </FormParts>


              <FormParts>
                <FormPartsHdr>Theft or Damage</FormPartsHdr>
                  <a.Row>
                    <label htmlFor="theftOrDamage">Theft or Damage:</label>

                    <a.TextArea name="theftOrDamage" onChange={this.changeHandler} value={formData.theftOrDamage || ''} />
                  </a.Row>
              </FormParts>


              <FormParts>
                <FormPartsHdr>Recurrence Action</FormPartsHdr>
                <a.Row>
                  <label htmlFor="recurrenceAction">
                    Describe any action taken to prevent a recurrence of the incident:
                  </label>

                  <a.TextArea name="recurrenceAction" onChange={this.changeHandler}
                    value={formData.recurrenceAction || ''} />
                  </a.Row>
              </FormParts>


              <FormParts>
                <FormPartsHdr>Witnesses</FormPartsHdr>
                <a.Row>
                  <label htmlFor="witnessesPresent">
                    <a.ReqFld />Were there any witnesses:</label>

                  <a.TextArea name="witnessesPresent" onChange={this.changeHandler}
                    value={formData.witnessesPresent} required />
                </a.Row>
              </FormParts>


              <FormParts>
                <FormPartsHdr>Final Comments/Summary</FormPartsHdr>
                  <a.Row>
                    <label htmlFor="comments">Your comments/final summary:</label>

                    <a.TextArea name="comments" onChange={this.changeHandler}
                      value={formData.comments} />
                  </a.Row>
              </FormParts>


              <FormParts>
                <FormPartsHdr>Attachments</FormPartsHdr>
                <a.Row>
                  <label>
                    Use the form below to add images to this report:<br />
                    <a.FieldInfoText>.jpg, .jpeg or .png files only</a.FieldInfoText>
                  </label>

                  <Row1>
                    <InnerWrap>

                      <br />
                      <Row1>
                        <Label>Image 1&nbsp;
                 <a.FieldInfoText>max file size is 10MB</a.FieldInfoText>
                        </Label>
                        <ErrTxt id="img1-err">&nbsp;</ErrTxt>
                        <input type="file" name="img1" id="img1" onChange={this.attachmentsChangeHandler} />
                        <ImgFileName id="img1-fileName" />

                        <ImgLinks id="img1-links">
                          <span id="img1-edit" onClick={this.editLink}>edit</span>
                          <span id="img1-remove" onClick={this.removeLink}>remove</span>
                        </ImgLinks>

                        <br />
                        <div id="img1-preview">&nbsp;</div>
                      </Row1>


                      <Row1>
                        <Label>Image 2&nbsp;
                 <a.FieldInfoText>max file size is 10MB</a.FieldInfoText>
                        </Label>
                        <ErrTxt id="img2-err">&nbsp;</ErrTxt>
                        <input type="file" name="img2" id="img2" onChange={this.attachmentsChangeHandler} />
                        <ImgFileName id="img2-fileName" />

                        <ImgLinks id="img2-links">
                          <span id="img2-edit" onClick={this.editLink}>edit</span>
                          <span id="img2-remove" onClick={this.removeLink}>remove</span>
                        </ImgLinks>

                        <br />
                        <div id="img2-preview">&nbsp;</div>
                      </Row1>

                    </InnerWrap>
                  </Row1>



                </a.Row>
              </FormParts>





              <FormParts>
                <FormPartsHdr>EmailTo</FormPartsHdr>
                <a.Row>
                  <FadeWrap>
                    <p>This report was originally emailed to:</p>
                    { !formData.emailTo && (
                      <Tabbed>{formData.email}</Tabbed>
                    )}

                    { formData.emailTo && (
                      <Tabbed>{formData.email}, {formData.emailTo}</Tabbed>
                    )}
                  </FadeWrap>
                </a.Row>
              </FormParts>


              <a.Row>
                <BtnHdr>Submit the updated report:</BtnHdr>

                <a href="/reports/all" className="back-btn button">cancel</a>
                <SubmitBtn />
              </a.Row>


            </form>

          </div>
        )}

        <Footer />

      </div>
    );
  }
}



export default EditReport;