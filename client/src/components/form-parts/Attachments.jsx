import React, { useContext, useEffect, useState } from 'react';
import { FormDataContext } from '../../context/form-post-data';
import styled from 'styled-components';
import * as a from '../styled/StyledComponents';


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



export default function Attachments () {
  const { formData, addFormData } = useContext(FormDataContext);
  const [imgsObj, setImgs] = useState(formData.attachments || {});
  const [curStep, setStep] = useState('');
  // console.log("PAGE LOAD/RENDER?");



  function backBtnClick() {
    setStep('comments');
  }
  function nextBtnClick() {
    setStep('emailTo');
  }
  function editLink(e) {
    const key = _getKey(e.currentTarget.id);
    _toggleFieldDesc(key);
  }
  function removeLink(e) {
    const key = _getKey(e.currentTarget.id);
    _elem(key).value = null;
    _showPreviewImg(key, false);
    _toggleFieldDesc(key);

    let curObj = imgsObj;
    delete curObj[key];
    setImgs(curObj);
  }


  //get img key, ie: img1, img2
  const _getKey = function(strIn) {
    return strIn.substr(0, 4);
  }

  //img file >> base64
  const _getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (err) => reject('Error: ', err);
    });
  }
  //will hide errDiv or show with errMsg
  function _setErrorDiv(name, errMsg) {
    let divName = `${name}-err`;
    let errDiv = _elem(divName);
    errDiv.style.display = 'none';

    if (errMsg) {
      errDiv.innerHTML = errMsg;
      errDiv.style.display = 'block';
    }
  }

  //not so verbose htmlElem get
  const _elem = (elem) => {
    return document.getElementById(elem);
  };

  //if img's in state, show them
  const _showPreviewImg = (key, imgStr) => {
    let imgView = _elem(key+'-preview');

    if(imgStr) {
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
  const _toggleFieldDesc = (key, imgName) => {
    let input = _elem(key);
    let fileName = _elem(key+'-fileName');
    let imgLinks = _elem(key+'-links');


    if(!imgName) {
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
  const _validateFile = (fileName) => {
    var exts_allowed = ["png", "jpeg", "jpg", "jfif"];
    var file_ext = fileName.split('.').pop();
    for (var i = 0; i <= exts_allowed.length; i++) {
      if (exts_allowed[i] === file_ext.toLowerCase()) {
        return true; // valid file extension
      }
    }

    return false;
  };




  useEffect(() => {
    const pageInit = () => {
      const len = Object.keys(imgsObj).length;

      //if imgs in state object
      if(len > 0) {

        let curObj = {};
        Object.keys(imgsObj).forEach((key) => {
          curObj = imgsObj[key];
          _showPreviewImg(key, curObj.base64String);
          _toggleFieldDesc(key, curObj.imgName);
        });
      }
    };

    pageInit();
  }, []);



  function handleSubmit(e) {
    e.preventDefault();

    if(Object.keys(imgsObj).length > 0) {
      addFormData(['attachments', imgsObj]);
    }
    else {
      addFormData(['attachments', null]);
    }

    addFormData(['curStep', curStep]);
  }


  //##  Change handler for file fields
  function changeHandler(e) {
    let formObj = e.currentTarget;
    let name = formObj.name, val = formObj.files[0];
    let errMsg = false;

    //no file selected!
    if(!val) {
      _setErrorDiv(name);
      let curObj = imgsObj;
      delete curObj[name];
      setImgs(curObj);
      return;
    }

    //check file extension
    if(!_validateFile(val.name)) {
      errMsg = 'Invalid file extension!';
      _setErrorDiv(name, errMsg);
      return;
    }

    //check size! //10mb max <= 16mb max in mongodb
    if (val.size > 10485760) {
      errMsg = 'File exceeds maximum file size!';
      _setErrorDiv(name, errMsg);
      return;
    }

    //we have file of right size...
    _getBase64(val)
      .then((imgStr) => {

        try {
          // const imgStr = `data:${val.type};base64, ${resp}`;
          // var testFile = dataURLtoFile(imgStr, val.name);

          //remove any visible field errors
          _setErrorDiv(name);

          //show preview img
          _showPreviewImg(name, imgStr);
          _toggleFieldDesc(name, val.name);

          //put into state
          let curObj = imgsObj;
          curObj[name] = {
            base64String: imgStr,
            imgName: val.name,
            imgSize: val.size,
            imgType: val.type
          };
          setImgs(curObj);
        }
        catch(e) {
          _setErrorDiv(name, e);
        }
      })
      .catch((err) => {
        _setErrorDiv(name, err);
      });
  }




  //base64 >> img file
  // function _dataURLtoFile(dataurl, filename) {
  //   var arr = dataurl.split(','),
  //     mime = arr[0].match(/:(.*?);/)[1],
  //     bstr = atob(arr[1]),
  //     n = bstr.length,
  //     u8arr = new Uint8Array(n);

  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }

  //   return new File([u8arr], filename, { type: mime });
  // }






  return (
    <a.Container>
      <form onSubmit={handleSubmit}>
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
              <input type="file" name="img1" id="img1" onChange={changeHandler} />
              <ImgFileName id="img1-fileName" />

              <ImgLinks id="img1-links">
                <span id="img1-edit" onClick={editLink}>edit</span>
                <span id="img1-remove" onClick={removeLink}>remove</span>
              </ImgLinks>

              <br />
              <div id="img1-preview">&nbsp;</div>
            </Row1>


            <Row1>
              <Label>Image 2&nbsp;
                 <a.FieldInfoText>max file size is 10MB</a.FieldInfoText>
              </Label>
              <ErrTxt id="img2-err">&nbsp;</ErrTxt>
              <input type="file" name="img2" id="img2" onChange={changeHandler} />
              <ImgFileName id="img2-fileName" />

              <ImgLinks id="img2-links">
                <span id="img2-edit" onClick={editLink}>edit</span>
                <span id="img2-remove" onClick={removeLink}>remove</span>
              </ImgLinks>

              <br />
              <div id="img2-preview">&nbsp;</div>
            </Row1>

          </InnerWrap>
        </Row1>


        <a.Row id="btns-wrap">
          <a.BackBtn onClick={backBtnClick} />

          <a.NextBtn onClick={nextBtnClick} />
        </a.Row>

      </form>
    </a.Container>

  )

};
