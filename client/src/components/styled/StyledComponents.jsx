import styled from 'styled-components';


const Container = styled.div.attrs({
  className: 'container',
})`
`

const FieldInfoText = styled.small.attrs({
  className: 'fldInfoText'
})`
  font-style: italic;

  &:before {
    content: '(';
  }
  &:after {
    content: ')';
  }
`

const FormGroup = styled.div.attrs({
  className: 'form-group'
})``


const Lbl = styled.div.attrs({
})`
  color: #347a9c;
  display: inline-block;
  font-weight: bold;
  margin-right: 4px;

  &:after {
    content: ':';
  }
  `

const NextBtn = styled.button.attrs({
  className: 'button next-btn',
  type: 'submit',
  name: 'nextBtn'
})`
  &:after {
    content: 'Next';
  }
`

const BackBtn = styled.button.attrs({
  className: 'button back-btn',
  type: 'submit',
  name: 'backBtn'
})`
  &:after {
    content: 'Back';
  }
`

const ReqFld = styled.span.attrs({
  className: 'req-fld'
})`
&:after {
  content: '*';
}
`

const Row = styled.div.attrs({
  className: 'row'
})``

const Row1 = styled.div.attrs({
  className: 'row'
})`
  margin-bottom: 21px;
`

// Form Filing Process
const SixCols = styled.div.attrs({
  className: "six columns"
})``


// Report & Summary Views
const DataWTopBrdr = styled.div.attrs({
  className: "six columns top-border"
})`
  margin-bottom: 21px;
`

const TextArea = styled.textarea.attrs({
  className: 'u-full-width fld',
  placeholder: 'type in here...'
})`
  height: 150px;
`


export {
  Container,
  FieldInfoText,
  FormGroup,
  Lbl,
  NextBtn,
  BackBtn,
  ReqFld,
  Row,
  Row1,
  SixCols,
  DataWTopBrdr,
  TextArea
}