import styled from 'styled-components';

const Hdr = styled.header.attrs({
  className: 'app-hdr'
})`
  margin-bottom: 12px;
`

const ErrTxt = styled.h1`
  color: red;
  font-size: 3rem;
  text-align: center;
`

export default function Header(props) {

  return (
    <div>
      <Hdr className="app-hdr">
         <div className="logoTxt">
          <span id="cTxt_hdr">
      CHURCH
          </span>
          <span>
      FOR ALL NATIONS
          </span>
         </div>
      </Hdr>

      { !props.errTxt && (
        <div className="sub-hdr">
          { !props.newHdrTxt && (
            <h4>Incident Report {props.hdrTxt}</h4>
          )}

          { props.newHdrTxt && (
            <h4>{props.newHdrTxt}</h4>
          )}
        </div>
      )}

      { props.errTxt && (
        <ErrTxt>{props.errTxt}</ErrTxt>
      )}


    </div>

  )
}