import React, { Fragment, useEffect, useState } from 'react';
import * as a from '../../styled/StyledComponents';
import styled from 'styled-components';


const ImgFileName = styled.div`
  color: #607D8B;
  display: none;
  font-style: italic;
  font-weight: bold;
`

const IMG = styled.div`
  img {
    display: block;
    margin-bottom: 42px;
    max-width: 200px;
  }
`

const InnerWrap = styled.div.attrs({
  className: "u-full-width"
})`
  display: table;
  margin: 12px 0 21px;
  padding-left: 7px;
`


export default function Attachments (props) {
  const formData = props.formData;
  const [err, setErr] = useState(false);


  useEffect(() =>  {
    let _d = formData.attachments;

    if(formData.attachments.err) {
      setErr(true);
    }
    else {
      Object.keys(formData.attachments).forEach((key) => {
        if(key !== "err") {
          // console.log("test");
          _showPreviewImg(key, _d[key]);
        }
      });
    }

  }, []);


  //get html element
  const _getElem = (id) => {
    return document.getElementById(id);
  }

  //if img's in state, show them
  const _showPreviewImg = (key, curObj) => {
    let imgView = _getElem(key + '-preview');
    let fileNameLbl = _getElem(key + '-fileName');

    if (curObj) {
      let img = new Image();
      img.src = curObj.base64String;
      img.className = 'preview-img';

      imgView.innerHTML = img.outerHTML;
      imgView.style.display = 'block';

      fileNameLbl.innerHTML = curObj.imgName;
      fileNameLbl.style.display = 'block';

      return;
    }

    //hide if no src img/data
    imgView.style.display = 'none';
    fileNameLbl.style.display = 'none';
  };



  return (
    <Fragment>

        <a.Row1>
          <div className="u-full-width top-border">
            <a.Lbl>Image Attachments</a.Lbl>

            { !err && (
              <InnerWrap>
                <a.SixCols>
                  <ImgFileName id="img1-fileName" />
                  <IMG id="img1-preview">&nbsp;</IMG>
                </a.SixCols>

                <a.SixCols>
                  <ImgFileName id="img2-fileName" />
                  <IMG id="img2-preview">&nbsp;</IMG>
                </a.SixCols>
              </InnerWrap>
            )}


            { err && (
              <InnerWrap>
                <div className="err-txt">
                  { formData.attachments.err }
                </div>
              </InnerWrap>
            )}

          </div>
        </a.Row1>

    </Fragment>
  )

};
