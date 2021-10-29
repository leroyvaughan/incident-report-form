import React, { Component } from 'react';
import Header from '../Header';
import * as a from '../styled/StyledComponents';
import styled from 'styled-components';


const FormPartsHdr = styled.h5`
  background-color: #eee;
  border: 1px solid #999;
  border-width: 1px 0;
  color: #3F51B5;
  margin-top: 21px;
  text-align: center;
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
`

const SubmitBtn = styled.button.attrs({
  className: 'button next-btn',
  type: 'submit',
})`
  &:after {
    content: 'Submit';
  }
`

const ErrMsg = styled.div`
  color: red;
  font-weight: bold;
  text-align: center;
`

const BtnsWrap = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
`



// export default function EditReport(props) {
class FeedbackSubmit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: false,
      stdErr: "Error during form submission! Please try again.",
      formData: {}
    }
  }



  componentDidMount = async () => {
    try {
      document.title = "CFAN: IR Form Feedback"

    }
    catch (e) {
      this.setError("Error on Page Load!");
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

    const { formData, stdErr } = this.state;


    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };

    //posting...
    fetch('/api/submitfeedback', requestOptions)
      .then((response) => {
        // console.log("formData HTTPPOST response: ", response);

        if(response.ok === false) {
          this.setError(stdErr);
        }
        else {
          document.location.href = "/";
        }

      })
      .catch((err) => {
        this.setError(stdErr);
      });
  };


  //### Form Field onChange events...
  changeHandler = (e) => {
    let formObj = e.currentTarget;
    let name = formObj.name, val = formObj.value;

    this.setState({
      formData: { ...this.state.formData, [name]: val }
    });
  };


  componentDidUpdate() {
    // console.log(this.state.formData);
  }


  //### briefDescription textArea
  textAreaHandler = (e) => {
    if (e)
      e.preventDefault();

    let val = e.currentTarget.value;
    if (val.length > 1000) {
      val = val.substr(0, 1000);
      e.currentTarget.value = val;
    }

    this.setState({
      formData: { ...this.state.formData, 'msgText': val }
    });
  }


  refreshPage(e) {
    e.preventDefault();
    document.location.href = "/";
  }







  render() {
    const { formData, error } = this.state;

    return (
      <div id="App" className="feedback-submit">

      <Header newHdrTxt="Feedback Form" />


      { error && (
        <div className="container err">
          <ErrMsg>{error}</ErrMsg>

          <br />
          <br />
          <br />

          <BtnsWrap>
            <a href="/" className="back-btn button">cancel</a>
            &nbsp;&nbsp;&nbsp;
            <a href="/feedback/submit" className="button">refresh page</a>
          </BtnsWrap>
        </div>
      )}


      { !error && (
        <div className="container">
          <div className="u-pull-right">
            <span className="req-fld">*</span>
            &nbsp;<small>Indicates a required field</small>
          </div>

          <br />

          <form onSubmit={this.handleSubmit}>

            <FormParts>
              <FormPartsHdr>Got Feedback or a bug to report?</FormPartsHdr>
              <a.Row>
                <div className="six columns">
                  <label htmlFor="name"><a.ReqFld />Your Name:</label>

                  <input className="u-full-width" type="text" name="name"
                    value={formData.name || ''} onChange={this.changeHandler} required />
                </div>

                <div className="six columns">
                  <label htmlFor="msgCategory"><a.ReqFld />Select Category:</label>

                  <select className="u-full-width" name="msgCategory"
                   onChange={this.changeHandler} value={formData.msgCategory} required>
                     <option value="">select one</option>
                    <option value="feedback">Feedback</option>
                    <option value="bug">Bug/Problem</option>
                  </select>
                </div>
              </a.Row>

                <a.Row1>
                  <div className="six columns">
                    <label htmlFor="phone">Phone:</label>

                    <input className="u-full-width" type="tel" name="phone"
                      pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$"
                      placeholder="253-555-1221" value={formData.phone || ''}
                      onChange={this.changeHandler} />
                  </div>

                  <div className="six columns">
                    <label htmlFor="email">Email:</label>

                    <input className="u-full-width" type="email" name="email"
                      pattern="^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,6})$" value={formData.email || ''} onChange={this.changeHandler} />
                  </div>
                </a.Row1>

                <a.Row>
                  <label htmlFor="msgText">
                    <a.ReqFld />Your Feedback:&nbsp;
                    <a.FieldInfoText>1000 character max</a.FieldInfoText>
                  </label>

                  <a.TextArea name="msgText" value={formData.msgText}
                    onChange={this.textAreaHandler} required></a.TextArea>
                </a.Row>

             </FormParts>







            <br />
            <br />


            <a.Row>
              <BtnHdr>Submit your feedback:</BtnHdr>

              <a href="/" className="back-btn button">cancel</a>
              <SubmitBtn />
            </a.Row>


          </form>

        </div>
      )}

    </div>
    );
  }
}



export default FeedbackSubmit;